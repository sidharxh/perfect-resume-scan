import Link from "next/link";

interface HeroSectionProps {
  title: string;
  description: string;
  ctaText: string;
}

export function HeroSection({ title, description, ctaText }: HeroSectionProps) {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            {title}
          </h1>
          <p className="text-lg text-gray-600">{description}</p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0 mt-4">
            <Link
              href="/scan"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-sky-600 hover:bg-sky-700 text-white font-semibold shadow"
            >
              {ctaText}
            </Link>

            <Link href="/" className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-gray-200 text-gray-700">
              Learn how it works
            </Link>
          </div>
        </div>

        <aside className="relative">
          <div className="rounded-xl bg-linear-to-br from-white to-gray-50 p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Quick preview</div>
                <div className="text-2xl font-bold mt-1 text-gray-900">Resume Score: <span className="text-sky-600">75</span></div>
              </div>
              <div className="text-sm text-gray-500">ATS: 88</div>
            </div>

            <div className="mt-4 grid gap-3">
              <div className="flex items-center justify-between text-sm text-gray-700">
                <span>Spelling & Grammar</span>
                <span className="font-semibold text-green-600">Pass</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-700">
                <span>Impact Quantification</span>
                <span className="font-semibold text-red-600">Fix</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-700">
                <span>ATS Compliance</span>
                <span className="font-semibold text-sky-600">Good</span>
              </div>
            </div>

            <div className="mt-5 text-sm text-gray-500">Instant, private, and brutally honest feedback. No signups.</div>
          </div>
        </aside>
      </div>
    </section>
  );
}
