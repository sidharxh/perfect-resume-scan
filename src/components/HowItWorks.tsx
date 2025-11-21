import React from 'react';
import { FileUp, Cpu, Wand2 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    { 
      icon: <FileUp size={40} />, 
      title: "Upload Resume", 
      desc: "Upload your existing resume and the job description you're targeting." 
    },
    { 
      icon: <Cpu size={40} />, 
      title: "AI Analysis", 
      desc: "Our engine checks for ATS formatting errors, keyword gaps, and weak action verbs." 
    },
    { 
      icon: <Wand2 size={40} />, 
      title: "Optimize & Export", 
      desc: "Follow our suggestions to fix issues instantly and download your interview-ready resume." 
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How PerfectResumeScan Works</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Three simple steps to go from "Application Received" to "When can you interview?"</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, idx) => (
            <div key={idx} className="relative p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition duration-300">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg shadow-lg">
                {idx + 1}
              </div>
              <div className="mb-6 text-blue-500">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
