import React, { useState } from 'react';
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
  const [activeIndex, setActiveIndex] = useState(0);
  const active = faqs[activeIndex];

  return (
    <section id="faq" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            ATS Resume Questions, Answered
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
            Hover or click a question to see how it affects your ATS score.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 items-center">
          {/* Laptop side */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Laptop frame */}
              <div className="rounded-3xl border border-slate-200 bg-slate-900 text-slate-50 shadow-2xl overflow-hidden">
                {/* Top bar */}
                <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Monitor size={14} />
                    <span>PerfectResumeScan · ATS Preview</span>
                  </div>
                </div>

                {/* Screen content (active Q & A) */}
                <div className="px-5 py-5 space-y-3 text-sm md:text-[13px] leading-relaxed">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-blue-300/80">
                    Live Question
                  </div>
                  <div className="flex items-start gap-2">
                    <HelpCircle size={16} className="mt-0.5 text-blue-300" />
                    <p className="font-semibold text-slate-50">
                      {active.q}
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-800/70 border border-slate-700 px-4 py-3">
                    <p className="text-slate-200">
                      {active.a}
                    </p>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Tip: Run a free scan to see how this applies to your resume.
                  </div>
                </div>
              </div>

              {/* Laptop base */}
              <div className="mx-auto h-4 w-[110%] -mt-1 rounded-b-[2rem] bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 shadow-lg" />
            </div>
          </div>

          {/* Questions list side */}
          <div>
            <div className="grid gap-3">
              {faqs.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`w-full text-left rounded-2xl border px-4 py-3.5 transition duration-200 ${
                      isActive
                        ? 'border-blue-600 bg-white shadow-md shadow-blue-500/10'
                        : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 h-6 w-6 flex items-center justify-center rounded-full text-[11px] font-semibold ${
                          isActive
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div>
                        <p
                          className={`text-sm font-semibold ${
                            isActive ? 'text-slate-900' : 'text-slate-800'
                          }`}
                        >
                          {item.q}
                        </p>
                        <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="mt-6 text-xs text-slate-500">
              These are the same things hiring teams and ATS tools check. Add your resume to see your score in under 30 seconds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
