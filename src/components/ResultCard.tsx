'use client';

import React, { useState } from 'react';
import { Key, Wand2, Copy, ChevronDown, CheckCircle2, XCircle, AlertCircle, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { ScanResponse } from '@/types';

interface ResultCardProps {
  // Map 'scanResult' from parent to 'result' used internally, or just use 'result' directly if passed that way.
  // Based on Hero.tsx passing "scanResult={scanResult}", we'll accept that prop name for consistency,
  // or you can alias it here. I will use 'scanResult' to match Hero.
  scanResult: ScanResponse; 
  onReset: () => void;
}

export default function ResultCard({ scanResult, onReset }: ResultCardProps) {
  // Extract the actual output data
  const result = scanResult.output;

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
        btn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
        btn.classList.add('bg-emerald-600', 'text-white', 'border-emerald-600');
        setTimeout(() => {
          btn.innerHTML = originalContent;
          btn.classList.remove('bg-emerald-600', 'text-white', 'border-emerald-600');
        }, 1500);
      }
    });
  };

  // Score thresholds: 85+ excellent, 70+ good, below 70 needs work
  const getScoreStatus = (score: number) => {
    if (score >= 85) return { color: 'emerald', label: 'Excellent', icon: CheckCircle2 };
    if (score >= 70) return { color: 'amber', label: 'Good', icon: AlertCircle };
    return { color: 'rose', label: 'Needs Improvement', icon: XCircle };
  };

  const status = getScoreStatus(result.score);

  const groupedImprovements = result.improvements?.reduce((acc, improvement) => {
    const section = improvement.section || 'General';
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(improvement);
    return acc;
  }, {} as Record<string, typeof result.improvements>) || {};

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-lg border border-slate-200/80 overflow-hidden">
      {/* Subtle Top Accent */}
      <div className={`h-1 bg-gradient-to-r ${status.color === 'emerald' ? 'from-emerald-500 to-teal-500' :
        status.color === 'amber' ? 'from-amber-500 to-orange-500' : 'from-rose-500 to-red-500'
        }`}></div>

      {/* Header Section - Refined Professional Layout */}
      <div className="bg-gradient-to-br from-slate-50/50 via-white to-slate-50/30 border-b border-slate-200/60">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            {/* Score Section */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Refined Score Circle */}
              <div className="relative flex-shrink-0">
                <svg className="w-20 h-20 sm:w-24 sm:h-24" viewBox="0 0 96 96">
                  {/* Background Circle */}
                  <circle
                    cx="48"
                    cy="48"
                    r="42"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    className="text-slate-100"
                  />
                  {/* Progress Circle */}
                  <circle
                    cx="48"
                    cy="48"
                    r="42"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${(result.score / 100) * 264} 264`}
                    className={`transition-all duration-1000 ${status.color === 'emerald' ? 'text-emerald-500' :
                      status.color === 'amber' ? 'text-amber-500' : 'text-rose-500'
                      }`}
                    strokeLinecap="round"
                    transform="rotate(-90 48 48)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-slate-800">{result.score}</div>
                    <div className="text-[10px] sm:text-xs text-slate-400 font-medium tracking-wide">/ 100</div>
                  </div>
                </div>
              </div>

              {/* Score Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
                    {result.scoreLabel}
                  </h3>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${status.color === 'emerald' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    status.color === 'amber' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                    {status.label}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {result.summary}
                </p>
              </div>
            </div>

            {/* Key Metrics - Clean Stats */}
            <div className="grid grid-cols-3 gap-3 lg:gap-4 lg:min-w-[300px]">
              <div className="bg-white rounded-lg border border-slate-200/60 p-3 text-center">
                <div className="text-lg sm:text-xl font-bold text-slate-800 mb-0.5">
                  {result.missingKeywords?.length || 0}
                </div>
                <div className="text-xs text-slate-500 font-medium">Missing</div>
              </div>
              <div className="bg-white rounded-lg border border-slate-200/60 p-3 text-center">
                <div className="text-lg sm:text-xl font-bold text-slate-800 mb-0.5">
                  {Object.values(groupedImprovements).flat().length}
                </div>
                <div className="text-xs text-slate-500 font-medium">To Fix</div>
              </div>
              <div className="bg-emerald-50/50 rounded-lg border border-emerald-200/60 p-3 text-center">
                <div className="text-lg sm:text-xl font-bold text-emerald-600 mb-0.5">85+</div>
                <div className="text-xs text-emerald-700 font-medium">Target</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6 bg-slate-50/30">

        {/* Missing Keywords Section */}
        {result.missingKeywords && result.missingKeywords.length > 0 && (
          <div className="bg-white rounded-lg border border-slate-200/60 overflow-hidden shadow-sm">
            <div className="px-4 sm:px-6 py-4 bg-gradient-to-r from-slate-50/50 to-white border-b border-slate-200/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center border border-indigo-100">
                    <Key className="text-indigo-600" size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">Missing Keywords</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Critical terms to add for ATS optimization</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-rose-50 text-rose-700 text-xs font-semibold rounded-md border border-rose-200">
                  {result.missingKeywords.length}
                </span>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="flex flex-wrap gap-2">
                {result.missingKeywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-slate-50 text-slate-700 rounded-md text-sm font-medium border border-slate-200/80 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all cursor-default"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Improvements Section */}
        {Object.keys(groupedImprovements).length > 0 && (
          <div className="bg-white rounded-lg border border-slate-200/60 overflow-hidden shadow-sm">
            <div className="px-4 sm:px-6 py-4 bg-gradient-to-r from-slate-50/50 to-white border-b border-slate-200/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-violet-50 rounded-lg flex items-center justify-center border border-violet-100">
                    <Wand2 className="text-violet-600" size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">Recommended Improvements</h4>
                    <p className="text-xs text-slate-500 mt-0.5">AI-powered optimization suggestions</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-violet-50 text-violet-700 text-xs font-semibold rounded-md border border-violet-200">
                  {Object.values(groupedImprovements).flat().length}
                </span>
              </div>
            </div>

            <div className="divide-y divide-slate-200/60">
              {Object.entries(groupedImprovements).map(([section, improvements]) => {
                const isExpanded = expandedGroups.has(section);

                return (
                  <div key={section}>
                    <button
                      onClick={() => toggleGroup(section)}
                      className="w-full flex items-center justify-between px-4 sm:px-6 py-4 hover:bg-slate-50/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isExpanded ? 'bg-indigo-600' : 'bg-slate-300'
                          }`}></div>
                        <span className="text-sm font-semibold text-slate-800">{section}</span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded border border-slate-200">
                          {improvements.length}
                        </span>
                      </div>
                      <ChevronDown
                        className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        size={18}
                      />
                    </button>

                    {isExpanded && (
                      <div className="px-4 sm:px-6 py-4 bg-slate-50/30 space-y-4">
                        {improvements.map((improvement, idx) => (
                          <div key={idx} className="bg-white rounded-lg border border-slate-200/60 overflow-hidden shadow-sm">
                            <div className="p-4 space-y-3">
                              {/* Type Badge */}
                              <div className="flex items-center justify-between">
                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${improvement.type.toLowerCase().includes('weak') || improvement.type.toLowerCase().includes('critical')
                                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                                  : improvement.type.toLowerCase().includes('vague')
                                    ? 'bg-orange-50 text-orange-700 border-orange-200'
                                    : 'bg-blue-50 text-blue-700 border-blue-200'
                                  }`}>
                                  {improvement.type}
                                </span>
                              </div>

                              {/* Before */}
                              <div>
                                <div className="flex items-center gap-2 mb-1.5">
                                  <XCircle className="text-rose-500" size={14} />
                                  <span className="text-xs font-semibold text-slate-700">Current</span>
                                </div>
                                <div className="text-sm text-slate-600 bg-rose-50/50 border border-rose-100 rounded-lg p-3 line-through">
                                  {improvement.original}
                                </div>
                              </div>

                              {/* After */}
                              <div>
                                <div className="flex items-center gap-2 mb-1.5">
                                  <CheckCircle2 className="text-emerald-500" size={14} />
                                  <span className="text-xs font-semibold text-slate-700">Suggested</span>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2">
                                  <div className="text-sm text-slate-800 bg-emerald-50/50 border border-emerald-200 rounded-lg p-3 flex-1 font-medium">
                                    {improvement.optimized}
                                  </div>
                                  <button
                                    id={`btn-copy-${section}-${idx}`}
                                    onClick={() => copyToClipboard(improvement.optimized, `btn-copy-${section}-${idx}`)}
                                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-indigo-600 hover:text-white text-slate-700 border border-slate-200 rounded-lg transition-all text-sm font-medium whitespace-nowrap"
                                  >
                                    <Copy size={14} />
                                    <span className="hidden sm:inline">Copy</span>
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

        {/* Performance Benchmark - Diagnostic Gap Analysis */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden font-sans">

          {/* Header: Diagnostic Context */}
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${result.score < 85 ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">ATS Diagnostic Report</h4>
            </div>
            <div className="text-xs font-medium text-slate-400 hidden sm:block">
              ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </div>
          </div>

          <div className="p-6 md:p-8">

            {/* Headline: The Reality Check */}
            <div className="mb-8">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                {result.score < 85 ? (
                  <span>Your resume is operating at <span className="text-amber-600 border-b-2 border-amber-100">{result.score}% capacity</span></span>
                ) : (
                  <span>Your resume is fully optimized for performance</span>
                )}
              </h3>
              <p className="text-slate-600 text-sm md:text-base max-w-2xl leading-relaxed">
                {result.score < 85
                  ? `Our audit detected ${Object.values(groupedImprovements).flat().length} critical improvement areas and ${result.missingKeywords?.length || 0} missing keywords that are likely causing ATS rejection.`
                  : "You are in the top tier of candidates. Minor tweaks could push you to 100%."
                }
              </p>
            </div>

            {/* The Gap Visualization: "What You Are Missing" */}
            <div className="mb-10">
              <div className="flex justify-between text-sm font-semibold mb-3">
                <span className="text-slate-700">Current Impact</span>
                <span className="text-slate-400">Unclaimed Potential</span>
              </div>

              <div className="h-12 sm:h-14 w-full bg-slate-100 rounded-lg border border-slate-200 relative flex overflow-hidden">

                {/* Part A: Current Score (Solid) */}
                <div
                  style={{ width: `${result.score}%` }}
                  className={`h-full flex items-center justify-end px-2 sm:px-4 transition-all duration-1000 ${result.score < 75 ? 'bg-slate-800' : 'bg-emerald-600'
                    }`}
                >
                  <span className="text-white font-bold text-sm sm:text-lg whitespace-nowrap">{result.score}</span>
                </div>

                {/* Part B: The GAP (Striped) - Visualizes the loss */}
                <div className="flex-1 relative bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.05)_25%,rgba(0,0,0,0.05)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.05)_75%,rgba(0,0,0,0.05)_100%)] bg-[length:10px_10px]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Desktop/Tablet Badge: Centered inside */}
                    {(85 - result.score) > 0 && (
                      <div className="hidden sm:flex bg-white/90 border border-slate-200 shadow-sm px-3 py-1 rounded-md text-xs font-bold text-amber-600 items-center gap-1 whitespace-nowrap z-10">
                        <AlertTriangle size={12} />
                        <span>MISSING {85 - result.score} POINTS</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Target Marker */}
                <div className="absolute top-0 bottom-0 w-0.5 bg-emerald-500 z-10 hidden sm:block" style={{ left: '85%' }}></div>
              </div>

              {/* Mobile-Only Badge: Displayed below bar to avoid overlap */}
              {(85 - result.score) > 0 && (
                <div className="flex sm:hidden items-center gap-1.5 mt-2 text-xs font-bold text-amber-600">
                  <AlertTriangle size={12} />
                  <span>MISSING {85 - result.score} POINTS FROM TARGET</span>
                </div>
              )}

              {/* X-Axis Labels */}
              <div className="flex justify-between mt-2 text-xs text-slate-400 font-mono">
                <span>0</span>
                <span className="text-emerald-600 font-bold">TARGET: 85+</span>
              </div>
            </div>

            {/* Metrics Grid: Professional "Executive Dashboard" Style */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              {/* 1. PAIN: Market Competitiveness (Red Accent) */}
              <div className={`bg-white p-5 rounded-r-lg border-y border-r border-slate-200 border-l-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[110px] ${result.score < 85 ? 'border-l-rose-500' : 'border-l-emerald-500'
                }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Competitiveness</span>
                  {result.score < 85 && <ArrowUpRight className="text-rose-500 rotate-180" size={16} />}
                </div>

                <div>
                  <div className="text-2xl font-bold text-slate-800 tabular-nums">
                    {result.score < 70 ? 'Low' : result.score < 85 ? 'Average' : 'High'}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 font-medium">
                    {result.score < 85
                      ? `Ranking in bottom ${100 - result.score}%`
                      : 'Top tier application'}
                  </div>
                </div>
              </div>

              {/* 2. CAUSE: ATS Parse Status (Amber Accent) */}
              <div className={`bg-white p-5 rounded-r-lg border-y border-r border-slate-200 border-l-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[110px] ${(result.missingKeywords?.length || 0) > 0 ? 'border-l-amber-500' : 'border-l-blue-500'
                }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">ATS Parse Status</span>
                  {(result.missingKeywords?.length || 0) > 0 && <AlertTriangle className="text-amber-500" size={16} />}
                </div>

                <div>
                  <div className="text-2xl font-bold text-slate-800 tabular-nums">
                    {(result.missingKeywords?.length || 0) > 0 ? 'Blocking Issues' : 'System Ready'}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 font-medium">
                    {(result.missingKeywords?.length || 0) > 0
                      ? `${result.missingKeywords?.length} critical keywords missing`
                      : 'All keywords detected'}
                  </div>
                </div>
              </div>

              {/* 3. SOLUTION: ROI Opportunity (Indigo Accent) */}
              <div className="bg-white p-5 rounded-r-lg border-y border-r border-slate-200 border-l-4 border-l-indigo-600 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[110px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Optimization Value</span>
                  <CheckCircle2 className="text-indigo-600" size={16} />
                </div>

                <div>
                  <div className="text-2xl font-bold text-indigo-700 tabular-nums">
                    +{85 - result.score > 0 ? 85 - result.score : 0} Points
                  </div>
                  <div className="text-xs text-slate-500 mt-1 font-medium">
                    Recoverable via {Object.values(groupedImprovements).flat().length} fixes
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Footer Actions */}
      <div className="px-4 sm:px-6 lg:px-8 py-5 bg-white border-t border-slate-200/60">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={onReset}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all text-sm shadow-sm hover:shadow"
          >
            Scan Another Resume
          </button>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 sm:flex-none">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Secure • Private • No Storage</span>
          </div>
        </div>
      </div>
    </div>
  );
}
