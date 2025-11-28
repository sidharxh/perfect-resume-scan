export interface Improvement {
  type: string;
  section: string;
  original: string;
  optimized: string;
}

export interface ResumeAnalysis {
  score: number;
  scoreLabel: string;
  summary: string;
  missingKeywords: string[];
  improvements: Improvement[];
}

export interface ScanResponse {
  ok: boolean;
  output: ResumeAnalysis;
  analytics?: {
    status: string;
    file_type: string;
    processing_time: number;
    tokens?: {
      input: number;
      output: number;
      total: number;
    };
    missing_keywords_count?: number;
    improvements_count?: number;
    improvement_types?: string;
  };
  error?: string;
}
