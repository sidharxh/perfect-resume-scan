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

      const data: ScanResult = await res.json();
      setResult(data);
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
