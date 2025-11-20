Perfect Resume Scan is a lightweight web product that analyzes uploaded resumes and returns a concise, actionable scorecard.

Key features:

- Fast, blunt feedback: the system returns an overall score, ATS compatibility score, and categorized checks (Content, ATS Compliance, Skills & Sections, Style & Design).
- Actionable suggestions: each failing check includes a short, practical suggestion to improve the resume.
- Privacy-first processing: files are uploaded and processed server-side; only the analysis result is returned.
- Live demo: try the product at https://perfectresumescan.com

How it works (high level):

- Users upload a PDF resume via the Scan page.
- The server extracts text from the PDF and runs a structured analysis using a generative AI model and a guided prompt.
- The API returns a structured JSON scorecard that the UI renders as an easy-to-read report.

If you are a developer exploring this repository, the code that handles uploads and analysis is in `src/app/api/scan/route.ts` and the prompt that instructs the model is in `src/data/prompt.md`.

For any questions or to report issues, open an issue in this repository or contact the maintainer.

