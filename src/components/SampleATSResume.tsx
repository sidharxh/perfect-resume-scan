import { CheckCircle2, AlertTriangle } from 'lucide-react';

export default function SampleATSResume() {
  return (
    <section id="sample-resume" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            See The Difference An ATS-Optimized Resume Makes
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A few smart changes to structure, keywords, and bullets can move you from “lost in the pile”
            to “shortlisted”.
          </p>
        </div>

        {/* Before / After Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {/* Before Card */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-900">
                Before: Non‑Optimized Resume
              </h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-[11px] font-medium text-rose-600">
                <AlertTriangle size={12} className="text-rose-500" />
                <span>ATS 48 / 100</span>
              </span>
            </div>

            <div className="space-y-3 text-sm text-slate-600">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="text-[11px] font-mono uppercase tracking-wide text-slate-400 mb-1.5">
                  Professional Summary
                </div>
                <p>
                  Experienced software engineer seeking a challenging role. Hard‑working and
                  passionate about technology. Looking for an opportunity to grow.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="text-[11px] font-mono uppercase tracking-wide text-slate-400 mb-1.5">
                  Experience (Excerpt)
                </div>
                <p className="mb-1 font-semibold text-slate-800">
                  Software Engineer – ABC Solutions
                </p>
                <p className="text-[13px] text-slate-500 mb-1.5">
                  2021 – Present
                </p>
                <ul className="list-disc pl-5 space-y-0.5">
                  <li>Worked on various projects with the team.</li>
                  <li>Responsible for bug fixing and improvements.</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="text-[11px] font-mono uppercase tracking-wide text-slate-400 mb-1.5">
                  Common Issues
                </div>
                <ul className="space-y-0.5">
                  <li>• Generic summary, no target role or keywords.</li>
                  <li>• Tasks, not measurable achievements.</li>
                  <li>• Skills not grouped or easy to scan.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* After Card */}
          <div className="bg-white p-8 rounded-2xl border-2 border-blue-600 shadow-xl relative transform md:-translate-y-2">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
              Optimized Example
            </div>

            <div className="flex items-center justify-between mb-4 mt-2">
              <h3 className="text-xl font-bold text-slate-900">
                After: ATS‑Optimized Resume
              </h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                <CheckCircle2 size={12} className="text-emerald-600" />
                <span>ATS 92 / 100</span>
              </span>
            </div>

            <div className="space-y-3 text-sm text-slate-600">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="text-[11px] font-mono uppercase tracking-wide text-blue-600 mb-1.5">
                  Targeted Summary
                </div>
                <p>
                  Backend Software Engineer with 3+ years building scalable APIs on Node.js, Python,
                  and AWS. Improves performance, reliability, and developer velocity for B2B SaaS teams.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="text-[11px] font-mono uppercase tracking-wide text-blue-600 mb-1.5">
                  Experience (Optimized Excerpt)
                </div>
                <p className="mb-1 font-semibold text-slate-800">
                  Software Engineer – ABC Solutions
                </p>
                <p className="text-[13px] text-slate-500 mb-1.5">
                  2021 – Present
                </p>
                <ul className="list-disc pl-5 space-y-0.5">
                  <li>Designed REST APIs for 50k+ users, cutting latency by 35%.</li>
                  <li>Set up CI/CD and monitoring, reducing incidents by 25%.</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="text-[11px] font-mono uppercase tracking-wide text-blue-600 mb-1.5">
                  Clear Skills Section
                </div>
                <p className="mb-1">
                  <span className="font-semibold">Skills: </span>
                  Node.js, Python, TypeScript, AWS, PostgreSQL, MongoDB, Docker, CI/CD, REST APIs
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Block */}
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-semibold text-slate-900 mb-3">
            Want to See Your Own “Before vs After”?
          </h3>
          <p className="text-slate-600 mb-6">
            Upload your resume and a target job description to get a free ATS score and a focused list
            of changes to move closer to the optimized version above.
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
          >
            Upload Resume &amp; Get Free Scan
          </a>
        </div>
      </div>
    </section>
  );
}
