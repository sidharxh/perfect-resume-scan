# PerfectResumeScan - ATS Resume Scanner & Optimizer

A production-ready Resume Scanning application built with Next.js 14+, React, Tailwind CSS, and Anthropic's Claude API. Upload your resume and get instant ATS score, keyword analysis, and actionable feedback.

## Features

- 🎯 **ATS Score Analysis** - Get an instant 0-100 score on your resume's ATS compatibility
- 🔍 **Keyword Detection** - Identify critical missing keywords for your industry
- ✨ **Smart Suggestions** - Receive optimized alternatives for weak action verbs and vague achievements
- 📄 **PDF & DOCX Support** - Upload resumes in PDF or Word format
- 🎨 **Beautiful UI** - Modern, responsive design with smooth animations
- 🤖 **AI-Powered** - Uses Anthropic's Claude AI for intelligent resume analysis

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), React 18, Tailwind CSS
- **Backend**: Next.js API Routes (Route Handlers)
- **AI**: @anthropic-ai/sdk (Anthropic Claude SDK with structured output)
- **File Parsing**: pdf-parse (PDFs) and mammoth (DOCX)
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Prerequisites

- Node.js 18+ installed
- An Anthropic API key ([Get one here](https://console.anthropic.com/))

## Installation

1. **Clone the repository** (or use the existing project):

```bash
cd perfect-resume-scan
```

2. **Install dependencies**:

```bash
npm install
```

3. **Set up environment variables**:

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Then edit `.env.local` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

4. **Run the development server**:

```bash
npm run dev
```

5. **Open your browser**:

Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
perfect-resume-scan/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── scan/
│   │   │       └── route.ts        # Backend API endpoint for resume scanning
│   │   ├── globals.css             # Global styles and Tailwind directives
│   │   ├── layout.tsx              # Root layout with metadata
│   │   └── page.tsx                # Main landing page
│   ├── components/
│   │   ├── Navbar.tsx              # Navigation bar with mobile menu
│   │   ├── Hero.tsx                # Hero section with CTA
│   │   ├── UploadArea.tsx          # File upload component
│   │   ├── ResultCard.tsx          # Scan results display
│   │   ├── HowItWorks.tsx          # How it works section
│   │   ├── Features.tsx            # Features showcase
│   │   ├── Pricing.tsx             # Pricing tiers
│   │   └── Footer.tsx              # Footer with links
│   └── types/
│       └── index.ts                # TypeScript type definitions
├── public/                          # Static assets
├── .env.example                     # Environment variables template
├── next.config.js                   # Next.js configuration
├── tailwind.config.ts               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
└── package.json                     # Dependencies and scripts
```

## How It Works

### Frontend Flow

1. User uploads PDF/DOCX resume via `UploadArea` component
2. File is sent to `/api/scan` endpoint
3. Progress indicator shows while processing
4. Results are displayed in `ResultCard` with:
   - ATS Score (0-100)
   - Score label (Excellent/Good/Needs Improvement)
   - Missing keywords
   - Improvement suggestions with copy-to-clipboard functionality

### Backend Flow (API Route)

1. Receives uploaded file via FormData
2. Extracts text using `pdf-parse` (PDF) or `mammoth` (DOCX)
3. Sends extracted text to Google Gemini AI with structured schema
4. AI analyzes resume against industry standards
5. Returns JSON with score, keywords, and improvements
6. Frontend displays formatted results

### AI Schema Enforcement

The backend uses Anthropic's Claude SDK with tool-based schema validation to ensure structured JSON output:

```typescript
const resumeSchema = {
  type: "object",
  properties: {
    score: { type: "number" },
    scoreLabel: { type: "string" },
    summary: { type: "string" },
    missingKeywords: { type: "array", items: { type: "string" } },
    improvements: { type: "array", items: { ... } }
  },
  required: ["score", "scoreLabel", "summary", "missingKeywords", "improvements"]
}
```

## API Endpoint

### POST `/api/scan`

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `file` (PDF or DOCX)

**Response:**
```json
{
  "ok": true,
  "output": {
    "score": 72,
    "scoreLabel": "Needs Improvement",
    "summary": "Your resume might be filtered out by 40% of ATS bots.",
    "missingKeywords": ["Strategic Planning", "Data Analysis", "Python"],
    "improvements": [
      {
        "type": "Weak Action Verb",
        "original": "Helped with project management tasks",
        "optimized": "Spearheaded cross-functional project management initiatives"
      }
    ]
  }
}
```

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | Your Anthropic Claude API key | Yes |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project to Vercel
3. Add `ANTHROPIC_API_KEY` to environment variables
4. Deploy

### Other Platforms

Ensure your hosting platform:
- Supports Next.js 14+ (App Router)
- Allows environment variables
- Has Node.js 18+ runtime

## Customization

### Changing AI Model

Edit `src/app/api/scan/route.ts`:

```typescript
model: "claude-3-5-sonnet-20241022" // or "claude-3-opus-20240229", etc.
```

### Adjusting UI Colors

Edit `tailwind.config.ts` to change the blue/purple brand colors.

### Modifying Analysis Criteria

Update the prompt in `src/app/api/scan/route.ts` to change what the AI analyzes.

## Troubleshooting

**"Cannot find module" errors during build:**
- Run `npm install` to ensure all dependencies are installed

**API returns 500 error:**
- Check that `ANTHROPIC_API_KEY` is set correctly in `.env.local`
- Verify your API key is valid and has credits remaining

**File parsing fails:**
- Ensure the resume contains readable text (not scanned images)
- Try a different file format (PDF vs DOCX)

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments in the source files
3. Verify your environment variables are set correctly

---

Built with ❤️ using Next.js, React, and Anthropic Claude AI
