export interface ScanResult {
  score: number;
  scoreLabel: string;
  summary: string;
  missingKeywords: string[];
  improvements: Improvement[];
}

export interface Improvement {
  type: string;
  section: string;  // e.g., "Experience", "Education", "Skills", "Summary"
  original: string;
  optimized: string;
}

export interface ScanResponse {
  ok: boolean;
  output?: ScanResult;
  error?: string;
}