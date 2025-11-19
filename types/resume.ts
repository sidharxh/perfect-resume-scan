export type IssueStatus = "pass" | "fail" | "warn";

export interface IssueItem {
  name: string;
  score: number;
  status: IssueStatus;
  comment: string;
  suggestion?: string;
}

export interface Section {
  title: string;
  score: number;
  items: IssueItem[];
}

export interface ScanResult {
  overall_score: number;
  ats_score: number;
  total_issues: number;
  sections: Section[];
}
