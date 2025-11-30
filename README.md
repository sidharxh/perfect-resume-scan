# PerfectResumeScan

**Turn your static resume into a stunning, shareable portfolio website in seconds.**

PerfectResumeScan is an AI-powered application that parses standard PDF or DOCX resumes and instantly generates a dynamic, professional portfolio website. It features deep ATS analysis, an integrated resume viewer, and a downloadable "Scan-to-View" QR code card for easy networking.



## 🚀 Key Features

-   **📄 Static to Dynamic:** Instantly converts PDF/DOCX resumes into a hosted, interactive portfolio website.
-   **🤖 AI-Powered Parsing:** Utilizes **Anthropic Claude** to intelligently extract skills, experience, and projects from unstructured documents.
-   **👁️ Document Preview:** Built-in resume viewer allows visitors to see (and download) the original uploaded document directly from the portfolio.
-   **📱 QR Code Networking:** Generates a downloadable "Scan-to-View" card with a unique QR code, perfect for sharing your portfolio at networking events.
-   **📊 Resume Analysis:** Provides ATS optimization scores and improvement suggestions (powered by AI).
-   **🔒 Secure Storage:** Uses **Supabase Storage** to securely host original resume files.

## 🛠️ Tech Stack

-   **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS & Lucide React
-   **Database & Auth:** [Supabase](https://supabase.com/) (SSR & Auth)
-   **AI Model:** [Anthropic Claude](https://www.anthropic.com/) (via `@anthropic-ai/sdk`)
-   **File Parsing:** `pdf-parse` (PDF) & `mammoth` (DOCX)

## 🏁 Getting Started

### Prerequisites

-   Node.js 18+ installed
-   A Supabase account (for Database & Storage)
-   An Anthropic API Key (for AI parsing)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/perfect-resume-scan.git
cd perfect-resume-scan
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory and add your credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# AI Configuration
ANTHROPIC_API_KEY=your_anthropic_api_key

# App URL (for OG images and QR codes)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run the Development Server

```bash
npm run dev
```

Open (http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```bash
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # Reusable UI components (Navbar, Footer, etc.)
│   ├── utils/            # Utility functions (Supabase clients, formatters)
│   ├── types/            # TypeScript interfaces (PortfolioData, ResumeAnalysis)
│   └── lib/              # Core logic (AI parsing, file handling)
├── public/               # Static assets
└── next.config.js        # Next.js configuration
```

## 💡 Usage Flow

1.  **Upload:** User uploads their existing resume (PDF/DOCX) on the home page.
2.  **Analyze:** The system uses `pdf-parse` to read the text and sends it to Claude AI to structure the data.
3.  **Generate:** A unique slug is created, and a portfolio page is generated with sections for "Experience", "Projects", and "Skills".
4.  **Share:**
    *   **Web:** Share the unique URL (e.g., `perfectresumescan.com/portfolio/john-doe`).
    *   **Physical:** Click the **QR Code** button to download a branded image card to print or show on your phone.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
