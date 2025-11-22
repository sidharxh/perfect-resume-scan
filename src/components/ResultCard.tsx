'use client';

import React, { useState } from 'react';
import { Key, Wand2, Copy, AlertTriangle, ChevronDown, ChevronUp, TrendingUp, Users, Target } from 'lucide-react';
import { ScanResponse } from '@/types';

interface ResultCardProps {
  result: ScanResponse['output'];
  resetScan: () => void;
}

export default function ResultCard({ result, resetScan }: ResultCardProps) {
  if (!result) return null;

  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupName)) {
        newSet.delete(groupName);
      } else {
        newSet.add(groupName);
      }
      return newSet;
    });
  };

  const copyToClipboard = (text: string, btnId: string) => {
    navigator.clipboard.writeText(text.replace(/"/g, "")).then(() => {
      const btn = document.getElementById(btnId);
      if (btn) {
        const originalContent = btn.innerHTML;
        btn.innerHTML = '<span class="flex items-center gap-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied</span>';
        btn.classList.add('text-green-700', 'bg-green-100', 'border-green-300');
        setTimeout(() => {
          btn.innerHTML = originalContent;
          btn.classList.remove('text-green-700', 'bg-green-100', 'border-green-300');
        }, 2000);
      }
    });
  };

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

  const groupedImprovements = result.improvements?.reduce((acc, improvement) => {
    const section = improvement.section || 'General';
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(improvement);
    return acc;
  }, {} as Record<string, typeof result.improvements>) || {};

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl md:rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Top Accent Bar */}
      <div className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400"></div>

      {/* Hero Score Section */}
      <div className="bg-slate-50 p-4 md:p-8 text-center border-b border-slate-200">
        <div className="max-w-2xl mx-auto">
          {/* Score Circle */}
          <div className={`inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full border-4 md:border-8 ${getScoreColor(result.score)} mb-3 md:mb-4 relative shadow-md`}>
            <div className="text-center">
              <span className="text-3xl md:text-5xl font-extrabold text-slate-900 block leading-none">{result.score}</span>
              <span className="text-xs uppercase font-bold text-slate-500 tracking-wide">Score</span>
            </div>
            {result.score < 80 && (
              <div className={`absolute -top-1 -right-1 md:-top-2 md:-right-2 ${getScoreBadgeColor(result.score)} w-8 h-8 md:w-10 md:h-10 rounded-full border-2 md:border-4 border-white flex items-center justify-center shadow-lg`}>
                <AlertTriangle className="text-white" size={16} />
              </div>
            )}
          </div>

          {/* Status Text */}
          <h3 className="text-lg md:text-2xl font-bold text-slate-900 mb-1 md:mb-2">{result.scoreLabel}</h3>
          <p className="text-sm md:text-base text-slate-600 mb-4 md:mb-6 px-4">{result.summary}</p>

          {/* Social Proof Stats */}
          <div className="grid grid-cols-3 gap-2 md:gap-4 max-w-xl mx-auto mt-4 md:mt-8">
            <div className="bg-white p-2 md:p-4 rounded-lg border border-slate-200 shadow-sm">
              <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 mb-1">
                <Users className="text-blue-600" size={14} />
                <span className="text-lg md:text-2xl font-bold text-slate-900">13K+</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Scanned</p>
            </div>
            <div className="bg-white p-2 md:p-4 rounded-lg border border-slate-200 shadow-sm">
              <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 mb-1">
                <TrendingUp className="text-green-600" size={14} />
                <span className="text-lg md:text-2xl font-bold text-slate-900">8.3%</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Interview</p>
            </div>
            <div className="bg-white p-2 md:p-4 rounded-lg border border-slate-200 shadow-sm">
              <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 mb-1">
                <Target className="text-purple-600" size={14} />
                <span className="text-lg md:text-2xl font-bold text-slate-900">80%+</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Target</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="p-4 md:p-6 space-y-4 md:space-y-6 bg-slate-50">
        
        {/* Missing Keywords */}
        {result.missingKeywords && result.missingKeywords.length > 0 && (
          <div className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h4 className="text-xs md:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Key className="text-blue-600" size={14} />
                </div>
                <span className="hidden sm:inline">Missing Keywords</span>
                <span className="sm:hidden">Keywords</span>
              </h4>
              <span className="bg-red-100 text-red-700 text-xs px-2 md:px-3 py-1 rounded-full font-bold">
                {result.missingKeywords.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {result.missingKeywords.map((keyword, idx) => (
                <span key={idx} className="px-2 md:px-3 py-1 md:py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs md:text-sm font-semibold border border-slate-200">
                  {keyword}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-500 bg-blue-50 p-2 md:p-3 rounded-lg border border-blue-100">
              <strong>Tip:</strong> Add these to your Skills section
            </p>
          </div>
        )}

        {/* Improvements */}
        {Object.keys(groupedImprovements).length > 0 && (
          <div className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h4 className="text-xs md:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Wand2 className="text-purple-600" size={14} />
                </div>
                <span className="hidden sm:inline">Improvements</span>
                <span className="sm:hidden">Fixes</span>
              </h4>
              <span className="text-xs text-slate-500 font-medium">
                {Object.values(groupedImprovements).flat().length}
              </span>
            </div>
            
            <div className="space-y-2">
              {Object.entries(groupedImprovements).map(([section, improvements]) => {
                const isExpanded = expandedGroups.has(section);
                
                return (
                  <div key={section} className="border border-slate-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleGroup(section)}
                      className="w-full flex items-center justify-between p-3 md:p-4 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-2 md:gap-3">
                        <span className="text-xs md:text-sm font-bold text-slate-900">{section}</span>
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 md:py-1 rounded-full font-medium">
                          {improvements.length}
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="text-slate-400" size={18} />
                      ) : (
                        <ChevronDown className="text-slate-400" size={18} />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="border-t border-slate-200 p-3 md:p-4 space-y-3 bg-slate-50">
                        {improvements.map((improvement, idx) => (
                          <div key={idx} className="bg-white border border-slate-200 rounded-lg p-3 md:p-4 shadow-sm">
                            <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide inline-block mb-3 ${getImprovementTypeColor(improvement.type)}`}>
                              {improvement.type}
                            </span>
                            
                            <div className="space-y-3">
                              <div>
                                <p className="text-xs text-slate-400 uppercase mb-1 font-semibold">Before</p>
                                <div className="text-xs md:text-sm text-slate-600 bg-red-50 p-2 md:p-3 rounded-lg border border-red-100 line-through">
                                  {improvement.original}
                                </div>
                              </div>
                              
                              <div>
                                <p className="text-xs text-green-700 uppercase mb-1 font-semibold">After</p>
                                <div className="flex flex-col sm:flex-row items-start gap-2">
                                  <p className="text-xs md:text-sm text-slate-900 font-medium bg-green-50 p-2 md:p-3 rounded-lg border border-green-200 flex-1 w-full">
                                    {improvement.optimized}
                                  </p>
                                  <button 
                                    id={`btn-copy-${section}-${idx}`}
                                    onClick={() => copyToClipboard(improvement.optimized, `btn-copy-${section}-${idx}`)}
                                    className="text-blue-600 hover:text-blue-700 bg-white hover:bg-blue-50 border border-blue-200 px-3 py-2 rounded-lg transition flex items-center gap-2 text-xs font-bold whitespace-nowrap w-full sm:w-auto justify-center"
                                  >
                                    <Copy size={14} /> Copy
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Did You Know - Mobile Optimized */}
        <div className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-600 to-blue-300 rounded-lg flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Did You Know?</h5>
              <p className="text-sm md:text-base text-slate-900 font-medium leading-relaxed mb-3">
                Only <span className="text-red-600 font-bold">25%</span> of resumes pass ATS, but optimized ones get 
                <span className="text-blue-600 font-bold"> 3× more</span> interviews
              </p>
              
              <div className="grid grid-cols-2 gap-2 md:gap-3 mb-3">
                <div className="bg-red-50 p-2 md:p-3 rounded-lg border border-red-200">
                  <p className="text-base md:text-lg font-bold text-red-600">4%</p>
                  <p className="text-xs text-slate-500">Unoptimized</p>
                </div>
                <div className="bg-green-50 p-2 md:p-3 rounded-lg border border-green-200">
                  <p className="text-base md:text-lg font-bold text-green-600">12%+</p>
                  <p className="text-xs text-slate-500">Optimized</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-3 border-t border-slate-200">
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 flex-1">
                  <span className="text-xs text-slate-600 font-medium">Your:</span>
                  <span className={`text-sm font-bold ${result.score >= 80 ? 'text-green-600' : result.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {result.score}%
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg border border-green-200 flex-1">
                  <span className="text-xs text-slate-600 font-medium">Target:</span>
                  <span className="text-sm font-bold text-green-600">80%+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 md:p-6 bg-slate-100 border-t border-slate-200 space-y-3">
        <button 
          onClick={resetScan}
          className="bg-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold hover:bg-blue-700 transition-all w-full shadow-md text-sm md:text-base"
        >
          Scan Another Resume
        </button>
        <p className="text-xs text-center text-slate-500">
          Join 13,000+ job seekers improving their resumes
        </p>
      </div>
    </div>
  );
}
