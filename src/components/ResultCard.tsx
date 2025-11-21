'use client';

import React from 'react';
import { Key, Wand2, Copy, AlertTriangle } from 'lucide-react';
import { ScanResult } from '@/types';

interface ResultCardProps {
  result: ScanResult;
  resetScan: () => void;
}

export default function ResultCard({ result, resetScan }: ResultCardProps) {
  const copyToClipboard = (text: string, btnId: string) => {
    // Using execCommand for iFrame compatibility
    const tempInput = document.createElement('textarea');
    tempInput.value = text.replace(/"/g, "");
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // Visual feedback
    const btn = document.getElementById(btnId);
    if (btn) {
      const originalContent = btn.innerHTML;
      btn.innerHTML = '<span class="flex items-center gap-2"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!</span>';
      btn.classList.add('text-green-700', 'bg-green-100', 'border-green-300');
      setTimeout(() => {
        btn.innerHTML = originalContent;
        btn.classList.remove('text-green-700', 'bg-green-100', 'border-green-300');
      }, 2000);
    }
  };

  // Determine score color and alert level
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'border-green-400 bg-green-50';
    if (score >= 60) return 'border-yellow-400 bg-yellow-50';
    return 'border-red-400 bg-red-50';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getImprovementTypeColor = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('weak') || lowerType.includes('critical')) return 'text-red-600 bg-red-50';
    if (lowerType.includes('vague') || lowerType.includes('moderate')) return 'text-orange-600 bg-orange-50';
    return 'text-blue-600 bg-blue-50';
  };

  return (
    <div className="w-full bg-slate-50 rounded-xl overflow-hidden animate-fade-in relative z-30">
      {/* Header / Score */}
      <div className="bg-white p-8 border-b border-slate-200 text-center">
        <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full border-8 ${getScoreColor(result.score)} mb-4 relative`}>
          <div className="text-center">
            <span className="text-4xl font-extrabold text-slate-800 block leading-none">{result.score}</span>
            <span className="text-xs text-slate-500 uppercase font-bold">Score</span>
          </div>
          {result.score < 80 && (
            <div className={`absolute top-0 right-0 ${getScoreBadgeColor(result.score)} w-8 h-8 rounded-full border-2 border-white flex items-center justify-center`} title="Issues Found">
              <AlertTriangle className="text-white" size={16} />
            </div>
          )}
        </div>
        <h3 className="text-2xl font-bold text-slate-900">{result.scoreLabel}</h3>
        <p className="text-slate-500 mt-2">{result.summary}</p>
      </div>

      {/* Critical Issues */}
      <div className="p-6 space-y-8 text-left">
        
        {/* Section 1: Keywords */}
        {result.missingKeywords && result.missingKeywords.length > 0 && (
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
              <Key className="text-blue-500" size={16} /> Missing Keywords
              <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full ml-auto">Critical</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {result.missingKeywords.map((keyword, idx) => (
                <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium border border-slate-200">
                  {keyword}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-3">Add these exact terms to your Skills or Experience section.</p>
          </div>
        )}

        {/* Section 2: Copyable Improvements */}
        {result.improvements && result.improvements.length > 0 && (
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
              <Wand2 className="text-blue-500" size={16} /> Recommended Improvements
            </h4>
            
            {result.improvements.map((improvement, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm mb-4 transition hover:border-blue-300">
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wide ${getImprovementTypeColor(improvement.type)}`}>
                    {improvement.type}
                  </span>
                </div>
                <div className="mb-3">
                  <p className="text-xs text-slate-400 uppercase mb-1">Original</p>
                  <div className="text-slate-500 text-sm line-through bg-slate-50 p-2 rounded">{improvement.original}</div>
                </div>
                <div>
                  <p className="text-xs text-blue-600 uppercase mb-1 font-bold">Better (Optimized)</p>
                  <div className="flex items-center justify-between gap-3 bg-green-50 p-3 rounded border border-green-100">
                    <p className="text-green-900 text-sm font-medium flex-1">{improvement.optimized}</p>
                    <button 
                      id={`btn-copy-${idx}`}
                      onClick={() => copyToClipboard(improvement.optimized, `btn-copy-${idx}`)}
                      className="text-green-600 hover:text-green-700 bg-white hover:bg-green-100 border border-green-200 px-3 py-2 rounded-md transition flex items-center gap-2 text-xs font-bold whitespace-nowrap"
                    >
                      <Copy size={14} /> Copy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="p-6 bg-slate-100 border-t border-slate-200 text-center space-y-3">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition w-full shadow-lg shadow-blue-500/20">
          Download Full PDF Report
        </button>
        <button onClick={resetScan} className="text-slate-500 hover:text-slate-700 text-sm font-medium underline decoration-slate-300 underline-offset-4">
          Scan Another Resume
        </button>
      </div>
    </div>
  );
}
