import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // For now, return a mock response to allow front-end development
  const mockResponse = {
    overall_score: 75,
    ats_score: 88,
    total_issues: 5,
    sections: [
      {
        title: "Content",
        score: 70,
        items: [
          {
            name: "Spelling & Grammar",
            score: 95,
            status: "pass",
            comment: "Impressive. You didn't butcher the English language. Yet.",
            suggestion: "",
          },
          {
            name: "Impact Quantification",
            score: 50,
            status: "fail",
            comment:
              "Did you 'do stuff' or did you actually achieve anything? Show us the numbers, amateur.",
            suggestion:
              "Replace vague verbs with measurable results (e.g., 'increased X by Y%').",
          },
        ],
      },
      {
        title: "ATS Compliance",
        score: 88,
        items: [
          {
            name: "Section Headings",
            score: 90,
            status: "pass",
            comment: "Your headings are readable by robots. Humans are optional.",
            suggestion: "",
          },
        ],
      },
    ],
  };

  return NextResponse.json(mockResponse);
}
