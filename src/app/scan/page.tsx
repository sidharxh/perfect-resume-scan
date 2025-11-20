"use client";

import * as React from "react";
import { Dropzone } from "@/components/UI/Dropzone";
import ScoreCard from "@/components/Scan/ScoreCard";
import type { ScanResult } from "@/types/resume";

export default function ScanPage() {
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<ScanResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleFile = (f: File) => {
    setFile(f);
    setResult(null);
    setError(null);
  };

  const submit = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/scan", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Server error");
      }

      const raw = await res.json();

      // The API may return several shapes depending on the provider/SDK.
      // Common possibilities handled here:
      // - { overall_score, sections, ... }  (already a ScanResult)
      // - { ok: true, output: string } where output is JSON text
      // - { ok: true, providerResponse: {...} }
      let parsed: any = raw;

      if (raw && raw.ok && typeof raw.output === "string") {
        // The provider may wrap JSON inside markdown code fences (```json ... ```)
        // or return extra text. Try to extract the JSON payload robustly.
        let out = raw.output;

        // If there's a fenced block, capture its contents.
        const fenceMatch = out.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
        if (fenceMatch && fenceMatch[1]) {
          out = fenceMatch[1];
        } else {
          // Strip any leading/trailing triple backticks or whitespace
          out = out.replace(/```/g, "").trim();
        }

        // As a last resort, try to find the first '{' and last '}' and parse that substring
        const tryParse = (s: string) => {
          try {
            return JSON.parse(s);
          } catch (e) {
            return null;
          }
        };

        let maybe = tryParse(out);
        if (!maybe) {
          const first = out.indexOf("{");
          const last = out.lastIndexOf("}");
          if (first !== -1 && last !== -1 && last > first) {
            const sub = out.slice(first, last + 1);
            maybe = tryParse(sub);
          }
        }

        if (!maybe) {
          throw new Error("Provider returned non-JSON output (preview): " + out.slice(0, 300));
        }

        parsed = maybe;
      } else if (raw && raw.ok && raw.providerResponse) {
        // try to use providerResponse directly
        parsed = raw.providerResponse;
      }

      // Validate parsed has the expected structure
      if (!parsed || !Array.isArray(parsed.sections)) {
        throw new Error("API did not return a valid ScanResult (missing sections)");
      }

      setResult(parsed as ScanResult);
    } catch (e: any) {
      setError(e?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Scan Your Resume</h1>

      <Dropzone onFile={handleFile} />

      <div className="mt-4 flex items-center space-x-4">
        <button
          onClick={submit}
          disabled={!file || loading}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? "Processing... (You're being judged)" : "Scan Resume"}
        </button>
        {file && <span className="text-gray-700">{file.name}</span>}
      </div>

      {error && <div className="mt-4 text-red-600">{error}</div>}

      {result && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Results</h2>
          <ScoreCard result={result} />
        </div>
      )}
    </div>
  );
}
