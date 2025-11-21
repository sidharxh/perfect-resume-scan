import { Monitor, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'What is an ATS resume scan?',
    a: 'An ATS resume scan checks how well your resume can be read by Applicant Tracking Systems and how closely it matches a specific job description.',
  },
  {
    q: 'What is a good ATS score?',
    a: 'Many recruiters consider 75+ a strong ATS score, but higher is better. The closer your resume matches the job keywords and structure, the better your chances.',
  },
  {
    q: 'How do I add the right keywords?',
    a: 'Pull skills, tools, and responsibilities directly from the job description and weave them naturally into your summary, experience bullets, and skills section.',
  },
  {
    q: 'Does resume format really matter?',
    a: 'Yes. Clean headings, simple fonts, and no tables or graphics help ATS parse your resume correctly so your skills are not lost.',
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            ATS Resume Questions, Answered
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
            These are the same things hiring teams and ATS tools check before your resume reaches a recruiter.
          </p>
        </div>

        {/* Desktop window card, full width */}
        <div className="rounded-2xl border border-slate-200 bg-slate-900 text-slate-50 shadow-2xl overflow-hidden">
          {/* Desktop title bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <Monitor size={14} />
              <span>PerfectResumeScan · ATS FAQ</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-slate-500">
              <span className="h-4 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                FAQ
              </span>
            </div>
          </div>

          {/* Content area */}
          <div className="px-6 py-6 md:px-8 md:py-8">
            <div className="mb-4 text-[11px] uppercase tracking-[0.18em] text-blue-300/80">
              Common ATS Questions
            </div>

            <div className="grid gap-4 md:gap-5 md:grid-cols-2">
              {faqs.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-slate-800/70 border border-slate-700 px-4 py-3.5 space-y-1"
                >
                  <div className="flex items-start gap-2">
                    <HelpCircle size={16} className="mt-0.5 text-blue-300" />
                    <p className="font-semibold text-slate-50 text-sm">
                      {item.q}
                    </p>
                  </div>
                  <p className="text-slate-200 text-[13px] leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-5 text-[11px] text-slate-500">
              Tip: Add your resume to see how these points affect your actual ATS score in under 30 seconds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
