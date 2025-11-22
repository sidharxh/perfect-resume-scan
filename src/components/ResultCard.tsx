'use client';

import React, { useState } from 'react';
import { Key, Wand2, Copy, ChevronDown, ChevronUp, TrendingUp, CheckCircle2, XCircle, AlertCircle, BarChart3 } from 'lucide-react';
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

        {/* Performance Benchmark - Minimal Professional Design */}
        <div className="bg-white rounded-lg border border-slate-200/60 overflow-hidden shadow-sm">
          <div className="px-4 sm:px-6 py-4 bg-gradient-to-r from-slate-50/50 to-white border-b border-slate-200/60">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-slate-100 to-slate-50 rounded-lg flex items-center justify-center border border-slate-200/60">
                <BarChart3 className="text-slate-600" size={16} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-800">Performance Benchmark</h4>
                <p className="text-xs text-slate-500 mt-0.5">Score analysis against industry standards</p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Score Display */}
            <div className="max-w-3xl mx-auto mb-8">
              <div className="flex items-baseline justify-between mb-6">
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Your Score</div>
                  <div className={`text-5xl sm:text-6xl font-bold tabular-nums bg-gradient-to-br ${result.score >= 85
                    ? 'from-emerald-600 to-teal-600'
                    : result.score >= 70
                      ? 'from-amber-600 to-orange-600'
                      : 'from-slate-600 to-slate-500'
                    } bg-clip-text text-transparent`}>
                    {result.score}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Target</div>
                  <div className="text-3xl sm:text-4xl font-bold text-slate-400 tabular-nums">85</div>
                </div>
              </div>

              {/* Progress Scale: Clean Target vs Actual Design */}
              <div className="relative">
                {/* Main visualization container */}
                <div className="space-y-4">

                  {/* Score Comparison */}
                  <div className="flex items-center gap-4">
                    {/* Labels */}
                    <div className="w-24 flex-shrink-0">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Score</div>
                    </div>

                    {/* Bar Container */}
                    <div className="flex-1 relative">
                      {/* Target bar (background) - Full width to 100 */}
                      <div className="h-12 bg-slate-100 rounded-lg border border-slate-200/60 relative overflow-hidden">
                        {/* Zone shading */}
                        <div className="absolute inset-0 flex">
                          <div style={{ width: '70%' }} className="bg-slate-200/30"></div>
                          <div style={{ width: '15%' }} className="bg-amber-100/40"></div>
                          <div style={{ width: '15%' }} className="bg-emerald-100/40"></div>
                        </div>

                        {/* Target marker at 85 */}
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-emerald-600 z-20"
                          style={{ left: '85%' }}
                        ></div>

                        {/* Target label */}
                        <div
                          className="absolute -top-6 flex items-center gap-1"
                          style={{ left: '85%', transform: 'translateX(-50%)' }}
                        >
                          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">Target</span>
                        </div>

                        {/* Your score bar (foreground) */}
                        <div
                          className={`absolute inset-y-0 left-0 m-1 rounded-md shadow-sm transition-all duration-1000 flex items-center justify-end px-3 ${result.score >= 85
                            ? 'bg-gradient-to-r from-emerald-600 to-emerald-500'
                            : result.score >= 70
                              ? 'bg-gradient-to-r from-amber-600 to-amber-500'
                              : 'bg-gradient-to-r from-slate-600 to-slate-500'
                            }`}
                          style={{ width: `${Math.min(result.score, 100)}%` }}
                        >
                          <span className="text-white text-sm font-bold tabular-nums">{result.score}</span>
                        </div>
                      </div>

                      {/* Scale numbers below */}
                      <div className="relative h-4 mt-1">
                        <span className="absolute text-[10px] font-medium text-slate-400" style={{ left: '0%', transform: 'translateX(-50%)' }}>0</span>
                        <span className="absolute text-[10px] font-medium text-slate-500" style={{ left: '70%', transform: 'translateX(-50%)' }}>70</span>
                        <span className="absolute text-[10px] font-bold text-emerald-600" style={{ left: '85%', transform: 'translateX(-50%)' }}>85</span>
                        <span className="absolute text-[10px] font-medium text-slate-400" style={{ left: '100%', transform: 'translateX(-50%)' }}>100</span>
                      </div>
                    </div>

                    {/* Status badge */}
                    <div className="w-20 flex-shrink-0 text-right">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${result.score >= 85
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : result.score >= 70
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}>
                        {result.score >= 85 ? (
                          <>
                            <CheckCircle2 size={12} />
                            <span className="hidden sm:inline">Hit</span>
                          </>
                        ) : (
                          <span>{85 - result.score}</span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Performance zones legend */}
                  <div className="flex items-center gap-4 text-xs">
                    <div className="w-24 flex-shrink-0"></div>
                    <div className="flex-1 flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm bg-slate-200/60"></div>
                        <span className="text-slate-500 font-medium">0-70: Below Standard</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm bg-amber-100/60"></div>
                        <span className="text-slate-600 font-medium">70-85: Good</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm bg-emerald-100/60"></div>
                        <span className="text-emerald-600 font-semibold">85+: Target</span>
                      </div>
                    </div>
                  </div>

                  {/* Gap analysis */}
                  {result.score < 85 ? (
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50/50 border border-blue-200/60">
                      <div className="w-8 h-8 rounded-lg bg-white border border-blue-200 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="text-blue-600" size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-sm font-semibold text-slate-800 mb-1">
                          {85 - result.score} points to target
                        </h5>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {result.score >= 70
                            ? 'You\'re in the good range. Implement the suggestions below to reach excellence.'
                            : 'Focus on the recommended improvements to significantly boost your ATS score.'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-emerald-50/50 border border-emerald-200/60">
                      <div className="w-8 h-8 rounded-lg bg-white border border-emerald-200 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="text-emerald-600" size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-sm font-semibold text-emerald-900 mb-1">Target achieved</h5>
                        <p className="text-xs text-emerald-700 leading-relaxed">
                          Your resume meets industry benchmarks and is well-optimized for ATS systems.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Key Metrics - Modern Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-200/40 max-w-3xl mx-auto">

              {/* Interview Rate Impact - Clean Minimal Card */}
              <div className="bg-white rounded-lg p-5 border border-slate-200/60 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center border border-emerald-100">
                    <TrendingUp className="text-emerald-600" size={14} />
                  </div>
                  <h5 className="text-sm font-semibold text-slate-700">Interview Callback Rate</h5>
                </div>

                {/* Simple Before/After */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-500">Before optimization</span>
                    <span className="text-lg font-bold text-slate-600 tabular-nums">4%</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-700 font-medium">After optimization</span>
                    <span className="text-lg font-bold text-emerald-600 tabular-nums">52%</span>
                  </div>
                </div>

                {/* Simple Divider */}
                <div className="h-px bg-slate-200/60 mb-3"></div>

                {/* Single Insight */}
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span className="text-xs font-semibold text-slate-700">+48 points</span>
                  <span className="text-xs text-slate-500">improvement</span>
                </div>
              </div>


              {/* Community Trust - Single Metric Card */}
              <div className="bg-gradient-to-br from-white to-slate-50/30 rounded-lg p-5 border border-slate-200/60 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                      Resumes Optimized
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold bg-gradient-to-br from-slate-700 to-slate-600 bg-clip-text text-transparent tabular-nums">
                        13,000+
                      </span>
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center border border-blue-200/50">
                    <CheckCircle2 className="text-blue-600" size={16} />
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Join thousands of professionals who have successfully optimized their resumes and landed more interviews.
                </p>

                {/* Trust indicators */}
                <div className="flex items-center gap-4 pt-3 border-t border-slate-200/60">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <span className="text-xs font-medium text-slate-600">AI-Powered</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <span className="text-xs font-medium text-slate-600">Industry Tested</span>
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
            onClick={resetScan}
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
