import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface PricingProps {
  scrollToUpload: () => void;
}

export default function Pricing({ scrollToUpload }: PricingProps) {
  return (
    <section id="pricing" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Simple Pricing</h2>
          <p className="text-lg text-slate-600">Pay only when you need a scan. No subscriptions.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Basic Scan</h3>
            <div className="text-4xl font-bold text-slate-900 mb-4">Free</div>
            <p className="text-slate-500 mb-6 text-sm">Check your ATS score instantly.</p>
            <button onClick={scrollToUpload} className="w-full py-3 px-4 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition mb-8">Scan Now</button>
            <ul className="space-y-3 text-sm text-slate-600">
              {['Instant Resume Score', 'Basic Error Check', '3 Keyword Tips'].map((item, i) => (
                <li key={i} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> {item}</li>
              ))}
            </ul>
          </div>

          {/* Report Tier */}
          <div className="bg-white p-8 rounded-2xl border-2 border-blue-600 shadow-xl relative transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">Best Value</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Full Report</h3>
            <div className="text-4xl font-bold text-slate-900 mb-4">$9.95</div>
            <p className="text-slate-500 mb-6 text-sm">One-time detailed analysis.</p>
            <button className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition mb-8 shadow-lg shadow-blue-500/30">Get Report</button>
            <ul className="space-y-3 text-sm text-slate-600">
              {['Deep Keyword Analysis', 'Detailed Optimization Plan', 'Specific Formatting Fixes', 'No Account Needed'].map((item, i) => (
                <li key={i} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-600" /> {item}</li>
              ))}
            </ul>
          </div>

          {/* Bundle Tier */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Career Pack</h3>
            <div className="text-4xl font-bold text-slate-900 mb-4">$29</div>
            <p className="text-slate-500 mb-6 text-sm">Complete application overhaul.</p>
            <button className="w-full py-3 px-4 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition mb-8">Buy Bundle</button>
            <ul className="space-y-3 text-sm text-slate-600">
              {['2 Full Report Credits', 'Cover Letter Generator', 'LinkedIn Profile Audit'].map((item, i) => (
                <li key={i} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
