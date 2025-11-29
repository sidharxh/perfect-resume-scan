import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import Anthropic from "@anthropic-ai/sdk";
import { createAdminClient } from "@/utils/supabase/server";
import { PortfolioData } from "@/types";

// --- Helper: Text Cleaner ---
function cleanText(text: string | undefined): string {
  if (!text) return "";
  if (text.includes("UNKNOWN")) return "";
  return text
    .replace(/^[\s\d\.\-\*•]+/, "")
    .replace(/[\r\n]+/g, ". ")
    .replace(/\.\./g, ".")
    .replace(/[\*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// --- Helper: Slug Generator ---
function generateReadableSlug(name: string, title: string): string {
  const sanitize = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") 
      .replace(/[\s_-]+/g, "-") 
      .replace(/^-+|-+$/g, ""); 

  const cleanName = sanitize(name);
  const cleanTitle = sanitize(title);

  const base = cleanName && cleanTitle 
    ? `${cleanName}-${cleanTitle}` 
    : cleanName || "portfolio";

  const shortId = Math.random().toString(36).substring(2, 7);
  return `${base}-${shortId}`;
}

function normalizePortfolioData(raw: any, resumeUrl: string): PortfolioData {
  return {
    personalInfo: {
      fullName: cleanText(raw.personalInfo?.fullName) || "Candidate",
      title: cleanText(raw.personalInfo?.title) || "Professional",
      bio: cleanText(raw.personalInfo?.bio) || "",
      location: cleanText(raw.personalInfo?.location) || "",
      email: cleanText(raw.personalInfo?.email) || "",
      socialLinks: (Array.isArray(raw.personalInfo?.socialLinks) ? raw.personalInfo.socialLinks : [])
        .filter((l: any) => l.url && !l.url.includes("UNKNOWN") && !l.platform.includes("UNKNOWN"))
        .map((l: any) => ({
          platform: cleanText(l.platform),
          url: l.url.trim()
        }))
    },
    experience: (Array.isArray(raw.experience) ? raw.experience : []).map((job: any) => ({
      title: cleanText(job.title),
      company: cleanText(job.company),
      period: cleanText(job.period),
      description: cleanText(job.description)
    })),
    projects: (Array.isArray(raw.projects) ? raw.projects : []).map((proj: any) => ({
      title: cleanText(proj.title),
      description: cleanText(proj.description),
      link: proj.link?.includes("UNKNOWN") ? "" : (proj.link || ""),
      techStack: (Array.isArray(proj.techStack) ? proj.techStack : [])
        .map((t: string) => cleanText(t))
    })),
    skills: (Array.isArray(raw.skills) ? raw.skills : [])
      .map((s: string) => cleanText(s)),
    
    meta: {
      originalResumeUrl: resumeUrl,
      createdAt: new Date().toISOString(),
    }
  };
}

const PORTFOLIO_SCHEMA = {
  type: "object",
  properties: {
    personalInfo: {
      type: "object",
      properties: {
        fullName: { type: "string" },
        title: { type: "string" },
        bio: { type: "string" },
        location: { type: "string" },
        email: { type: "string" },
        socialLinks: {
          type: "array",
          items: {
            type: "object",
            properties: { platform: { type: "string" }, url: { type: "string" } },
          },
        },
      },
      required: ["fullName", "title", "bio"],
    },
    experience: { type: "array", items: { type: "object", properties: { title: { type: "string" }, company: { type: "string" }, period: { type: "string" }, description: { type: "string" } } } },
    projects: { type: "array", items: { type: "object", properties: { title: { type: "string" }, description: { type: "string" }, techStack: { type: "array", items: { type: "string" } }, link: { type: "string" } } } },
    skills: { type: "array", items: { type: "string" } },
  },
  required: ["personalInfo"],
};

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("file") as Blob | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const originalName = (file as File).name.toLowerCase();
    const fileType = (file as File).type || "application/octet-stream";
    const extension = originalName.endsWith(".docx") ? "docx" : "pdf";

    // 1. Extract Text
    let resumeText = "";
    if (extension === "pdf") {
      const data = await pdfParse(buffer);
      resumeText = data.text;
    } else {
      const result = await mammoth.extractRawText({ buffer });
      resumeText = result.value;
    }

    // 2. Analyze with Claude
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error("Missing Anthropic API Key");

    const anthropic = new Anthropic({ apiKey });

    const msg = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 4096,
      temperature: 0.5,
      tools: [{
          name: "generate_portfolio_website",
          description: "Generate professional portfolio content.",
          input_schema: PORTFOLIO_SCHEMA as any,
      }],
      tool_choice: { type: "tool", name: "generate_portfolio_website" },
      messages: [{
          role: "user",
          content: `You are an expert Personal Branding Copywriter. 
          TRANSFORM this resume into a high-impact portfolio.
          RESUME TEXT: "${resumeText}"
          INSTRUCTIONS: Extract Name, Title, Experience, etc.`
      }],
    });

    const toolBlock = msg.content.find((b) => b.type === "tool_use");
    if (!toolBlock) throw new Error("Claude failed to generate portfolio data.");
    const rawData = toolBlock.input as any;

    // 3. Generate Slug & Filenames
    const readableSlug = generateReadableSlug(
      rawData.personalInfo?.fullName || "",
      rawData.personalInfo?.title || ""
    );

    const jsonFileName = `${readableSlug}.json`;
    const resumeFileName = `${readableSlug}-resume.${extension}`;
    
    // --- CRITICAL FIX: CORRECT BUCKET NAME ---
    const BUCKET_NAME = "portfolio_perfectresumescan"; 

    // 4. Upload Resume
    const supabase = createAdminClient();
    
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(resumeFileName, buffer, { contentType: fileType, upsert: false });

    if (uploadError) {
      console.error("Upload Error:", uploadError);
      throw new Error("Failed to upload resume file.");
    }

    // --- CRITICAL FIX: CORRECT URL GENERATION ---
    const resumeUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${resumeFileName}`;
    const jsonUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${jsonFileName}`;

    // 5. Sanitize & Upload JSON (With Status: Draft)
    const finalJson = normalizePortfolioData(rawData, resumeUrl);
    const jsonWithStatus = { ...finalJson, status: "draft" };

    const { error: jsonUploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(jsonFileName, JSON.stringify(jsonWithStatus), { contentType: "application/json" });

    if (jsonUploadError) {
      throw new Error("Failed to save portfolio data.");
    }

    // 7. INSERT INTO SQL DATABASE
    const { error: dbError } = await supabase
      .from('users_perfectresumescan')
      .insert({
        full_name: finalJson.personalInfo.fullName,
        job_title: finalJson.personalInfo.title,
        email: finalJson.personalInfo.email,
        location: finalJson.personalInfo.location,
        slug: readableSlug,
        resume_url: resumeUrl,
        json_url: jsonUrl, // <--- CRITICAL FIX: Saving the JSON URL
        status: 'draft' 
      });

    if (dbError) {
      console.error("Database Insert Error:", dbError);
    }

    // 8. Return Data
    return NextResponse.json({
      ok: true,
      slug: readableSlug,
      ...jsonWithStatus 
    });

  } catch (error: any) {
    console.error("Portfolio Creation Error:", error);
    return NextResponse.json(
      { ok: false, error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
