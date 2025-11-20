import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import { readFile } from "fs/promises";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("file") as Blob | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const pdfData = await pdfParse(buffer as Buffer);
    const resumeText = (pdfData && (pdfData as any).text) || "";

    const promptPath = new URL("../../../data/prompt.md", import.meta.url);
    const promptTemplate = await readFile(promptPath, "utf8");

    const combinedPrompt = `${promptTemplate}\n\nResume:\n${resumeText}`;

    const geminiKey = process.env.GEMINI_API_KEY;

    if (!geminiKey) {
      return NextResponse.json(
        { error: "Gemini API key not configured (set GEMINI_API_KEY)" },
        { status: 500 }
      );
    }

    // Dynamically import the GenAI SDK at runtime to avoid bundler static analysis
    const genaiModule = await import("@google/genai");
    const GoogleGenAI = (genaiModule as any).GoogleGenAI || (genaiModule as any).default || (genaiModule as any);
    const SchemaType = (genaiModule as any).SchemaType || (genaiModule as any).schemaType || undefined;
    if (!GoogleGenAI) {
      return NextResponse.json({ error: "GenAI SDK not available" }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: geminiKey });

    let response: any;
    if (SchemaType) {
      // If SchemaType is available, build and pass the schema to enforce structured JSON
      const scorecardSchema = {
        type: SchemaType.OBJECT,
        properties: {
          overall_score: { type: SchemaType.NUMBER },
          ats_score: { type: SchemaType.NUMBER },
          total_issues: { type: SchemaType.NUMBER },
          sections: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                title: { type: SchemaType.STRING },
                score: { type: SchemaType.NUMBER },
                items: {
                  type: SchemaType.ARRAY,
                  items: {
                    type: SchemaType.OBJECT,
                    properties: {
                      name: { type: SchemaType.STRING },
                      score: { type: SchemaType.NUMBER },
                      status: { type: SchemaType.STRING },
                      comment: { type: SchemaType.STRING },
                      suggestion: { type: SchemaType.STRING },
                    },
                  },
                },
              },
            },
          },
        },
        required: ["overall_score", "sections"],
      };

      response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [{ text: combinedPrompt }],
          },
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: scorecardSchema,
        },
      });
    } else {
      // Fallback: request JSON mime type and parse the output later
      response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [{ text: combinedPrompt }],
          },
        ],
        config: {
          responseMimeType: "application/json",
        },
      });
    }

    const outText = (response as any).text || "";
    let parsed: any = {};
    try {
      parsed = JSON.parse(outText);
    } catch (e) {
      // As a fallback: try to extract JSON block from text
      const fenceMatch = outText.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
      const candidate = fenceMatch && fenceMatch[1] ? fenceMatch[1] : outText;
      const first = candidate.indexOf("{");
      const last = candidate.lastIndexOf("}");
      if (first !== -1 && last !== -1 && last > first) {
        try {
          parsed = JSON.parse(candidate.slice(first, last + 1));
        } catch (err) {
          return NextResponse.json({ error: "Failed to parse provider JSON output" }, { status: 502 });
        }
      } else {
        return NextResponse.json({ error: "Provider returned non-JSON output" }, { status: 502 });
      }
    }

    // Basic validation: ensure sections is an array
    if (!parsed || !Array.isArray(parsed.sections)) {
      return NextResponse.json({ error: "Parsed response missing sections array" }, { status: 502 });
    }

    // Return the scorecard JSON directly so the client can render it as ScanResult
    return NextResponse.json(parsed);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
