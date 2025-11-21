import UploadArea from './UploadArea';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100">
      {/* Soft radial gradient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-32 w-96 h-96 rounded-full bg-blue-200/60 blur-3xl" />
        <div className="absolute -bottom-40 -right-32 w-96 h-96 rounded-full bg-purple-200/60 blur-3xl" />
      </div>

      {/* Subtle grid / pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div className="h-full w-full bg-[linear-gradient(to_right,_rgba(148,163,184,0.5)_1px,_transparent_1px),linear-gradient(to_bottom,_rgba(148,163,184,0.35)_1px,_transparent_1px)] bg-[size:38px_38px]" />
      </div>

      {/* Light vignette */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white via-white/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-100 via-slate-100/70 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-6 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Over 500+ resumes scanned this week
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            Is your resume{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              ATS-Proof?
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
            Stop getting rejected by bots. Get an instant score, keyword analysis, and actionable
            feedback to land more interviews.
          </p>
        </div>

        {/* Give UploadArea an id so links can scroll here */}
        <div id="upload">
          <UploadArea id="upload-area"/>
        </div>

        {/* Social proof (unchanged) */}
        <div className="mt-16 pt-8 border-t border-slate-200/80">
          <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Results other job seekers are seeing
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-6">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-extrabold text-slate-900">
                5,200+
              </p>
              <p className="text-xs md:text-sm text-slate-500">
                Resumes scanned
              </p>
            </div>

            <div className="h-10 w-px bg-slate-200 hidden md:block" />

            <div className="text-center">
              <p className="text-2xl md:text-3xl font-extrabold text-slate-900">
                24%
              </p>
              <p className="text-xs md:text-sm text-slate-500">
                Avg. score improvement
              </p>
            </div>

            <div className="h-10 w-px bg-slate-200 hidden md:block" />

            <div className="text-center">
              <p className="text-2xl md:text-3xl font-extrabold text-slate-900">
                40+
              </p>
              <p className="text-xs md:text-sm text-slate-500">
                Countries using PerfectResumeScan
              </p>
            </div>
          </div>

          <p className="text-center text-[11px] md:text-xs font-semibold text-slate-500 uppercase tracking-[0.2em] mb-4">
            Used by candidates interviewing at
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            <span className="flex items-center font-bold text-lg md:text-xl text-slate-700">
              <span className="text-blue-500">G</span>oogle
            </span>
            <span className="flex items-center font-bold text-lg md:text-xl text-slate-700">
              <span className="text-orange-500">A</span>mazon
            </span>
            <span className="flex items-center font-bold text-lg md:text-xl text-slate-700">
              <span className="text-cyan-500">M</span>icrosoft
            </span>
            <span className="flex items-center font-bold text-lg md:text-xl text-slate-700">
              <span className="text-green-500">S</span>potify
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
