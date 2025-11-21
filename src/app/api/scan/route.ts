import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("file") as Blob | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 1. Extract text from PDF or DOCX
    let resumeText = "";
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = (file as File).name.toLowerCase();

    if (fileName.endsWith('.pdf')) {
      const pdfData = await pdfParse(buffer);
      resumeText = pdfData.text;
    } else if (fileName.endsWith('.docx')) {
      const result = await mammoth.extractRawText({ buffer });
      resumeText = result.value;
    } else {
      return NextResponse.json(
        { error: "Unsupported file format. Please upload a PDF or DOCX file." },
        { status: 400 }
      );
    }

    if (!resumeText || resumeText.trim().length < 50) {
      return NextResponse.json(
        { error: "Could not extract sufficient text. Please ensure your resume contains readable text." },
        { status: 400 }
      );
    }

    // 2. Initialize Anthropic (Claude)
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API configuration error. Please contact support." },
        { status: 500 }
      );
    }

    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    // 3. Define Schema (Standard JSON Schema format for Claude)
    // Note: Claude uses lowercase types ("string", "number") unlike Gemini's "STRING"
    const resumeSchema = {
      type: "object",
      properties: {
        score: { 
          type: "number", 
          description: "ATS score from 0 to 100" 
        },
        scoreLabel: { 
          type: "string", 
          description: "e.g., 'Needs Improvement', 'Good', 'Excellent'" 
        },
        summary: { 
          type: "string", 
          description: "A 1-sentence summary of the resume status" 
        },
        missingKeywords: {
          type: "array",
          items: { type: "string" },
          description: "List of 4-6 critical missing keywords based on generic industry standards"
        },
        improvements: {
          type: "array",
          items: {
            type: "object",
            properties: {
              type: { 
                type: "string", 
                description: "e.g. 'Weak Action Verb', 'Formatting', 'Vague Achievement'" 
              },
              original: { 
                type: "string", 
                description: "The original text from the resume" 
              },
              optimized: { 
                type: "string", 
                description: "The optimized version" 
              }
            },
            required: ["type", "original", "optimized"]
          }
        }
      },
      required: ["score", "scoreLabel", "summary", "missingKeywords", "improvements"],
    } as const;

    // 4. Generate content with Tool Use (Structured Output)
    // We force Claude to use the tool to ensure the JSON matches the schema
    const msg = await anthropic.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 4096,
      temperature: 0,
      tools: [
        {
          name: "submit_resume_analysis",
          description: "Submit the structured analysis of the candidate's resume.",
          input_schema: resumeSchema,
        }
      ],
      tool_choice: { type: "tool", name: "submit_resume_analysis" },
      messages: [
        {
          role: "user",
          content: `You are an expert ATS (Applicant Tracking System) scanner and resume optimization specialist. 

Analyze the following resume against general industry standards. Evaluate:
1. ATS compatibility
2. Action verb strength
3. Achievement specificity
4. Missing critical keywords
5. Overall professional presentation

Resume text:
${resumeText}

Perform the analysis and submit the findings using the defined tool structure.`
        }
      ],
    });

    // 5. Extract and Validate JSON
    // In forced tool use, the content block type is 'tool_use'
    const toolUseBlock = msg.content.find((block) => block.type === "tool_use");

    if (!toolUseBlock || toolUseBlock.type !== "tool_use") {
      throw new Error("Claude did not return a structured response.");
    }

    const jsonOutput = toolUseBlock.input;

    return NextResponse.json({ ok: true, output: jsonOutput });

  } catch (err: any) {
    console.error("Scan error:", err);
    return NextResponse.json(
      { 
        ok: false,
        error: err?.message || "An error occurred while analyzing your resume." 
      }, 
      { status: 500 }
    );
  }
}
