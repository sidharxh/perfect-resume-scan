import type { ScanResult } from "@/types/resume";
import ScoreSection from "./ScoreSection";

export function ScoreCard({ result }: { result: ScanResult }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold">Overall Score: {result.overall_score}</h2>
          <div className="text-sm text-gray-600">ATS Score: {result.ats_score} • Issues: {result.total_issues}</div>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {result.sections.map((section, idx) => (
          <ScoreSection key={idx} section={section} />
        ))}
      </div>
    </div>
  );
}

export default ScoreCard;
