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

export interface SocialLink {
  platform: string; // e.g. "LinkedIn", "GitHub"
  url: string;
}

export interface Job {
  title: string;
  company: string;
  period: string; // e.g. "2020 - Present"
  description: string; // 2-3 bullet points converted to paragraph
}

export interface Project {
  title: string;
  description: string;
  techStack: string[]; // e.g. ["React", "AWS"]
  link?: string; // Optional demo link
}

export interface PortfolioData {
  personalInfo: {
    fullName: string;
    title: string; // e.g. "Full Stack Engineer"
    bio: string;
    location: string;
    email: string;
    socialLinks: SocialLink[];
  };
  experience: Job[];
  projects: Project[];
  skills: string[];
  meta?: {
    originalResumeUrl?: string; // <--- The new field for the download button
    createdAt?: string;
  };
}
