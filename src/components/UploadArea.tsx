'use client';

import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle } from 'lucide-react';

interface UploadAreaProps {
  id: string;
  onScanComplete?: (result: any) => void;
}

export default function UploadArea({ id, onScanComplete }: UploadAreaProps) {
  const [status, setStatus] = useState<'idle' | 'processing' | 'result'>('idle');
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    const startTime = Date.now();
    setStatus('processing');
    setProgress(0);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    let progressInterval: NodeJS.Timeout | null = null;

    try {
      // Simulate progress (Slowed down slightly for parsing/upload)
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            if (progressInterval) clearInterval(progressInterval);
            return 90;
          }
          return prev + 4; 
        });
      }, 300);

      // Add timeout for fetch (60s)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      // 1. CALL NEW ENDPOINT
      const response = await fetch('/api/create-portfolio', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      if (progressInterval) clearInterval(progressInterval);
      setProgress(100);

      const data: any = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Failed to generate portfolio');
      }

      // --- CRITICAL CHANGE START ---

      // 2. Save to localStorage (New Key for Portfolio)
      // We save the full data so we can access slug/meta later if needed
      try {
        localStorage.setItem("portfolioData", JSON.stringify(data));
      } catch (e) {
        console.error("Failed to save to local storage", e);
      }

      // 3. Notify Parent (Optional, if you have parent logic)
      if (onScanComplete) { onScanComplete(data); }

      // 4. Redirect to the new Portfolio Page
      // window.location.href = `/portfolio/${data.slug}`;

      setStatus('idle');
      setProgress(0);
      setIsDragging(false);

      // --- CRITICAL CHANGE END ---

    } catch (err: any) {
      if (progressInterval) clearInterval(progressInterval);
      console.error('Processing error:', err);

      if (err.name === 'AbortError') {
        setError('Request timed out. Please try again.');
      } else {
        setError(err.message || 'An error occurred while processing your resume');
      }

      setStatus('idle');
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      handleFileUpload(file);
    } else {
      setError('Please upload a PDF or DOCX file');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
    e.target.value = '';
  };

  return (
    <div className="w-full max-w-3xl mx-auto" id={id}>
      {status === 'idle' && (
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400"></div>

          <div className="p-8 text-center border-b border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Turn Your Resume into a Website</h3>
            <p className="text-slate-500 text-sm">AI-powered portfolio generator in seconds</p>
          </div>

          <div
            className={`relative p-12 transition-all ${isDragging ? 'bg-blue-50' : 'bg-slate-50'}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <div className={`border-2 border-dashed rounded-xl p-10 transition-all ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-white hover:border-blue-500 hover:bg-blue-50'}`}>
              <div className="flex flex-col items-center text-center">
                <div className={`w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 transition-all ${isDragging ? 'scale-110' : 'scale-100'}`}>
                  <UploadCloud className="text-blue-600" size={40} />
                </div>

                <h4 className="text-xl font-bold text-slate-900 mb-2">
                  {isDragging ? 'Drop your file here' : 'Upload your resume'}
                </h4>
                <p className="text-slate-500 mb-6 max-w-md">
                  Drag and drop your PDF or DOCX file here, or click the button below
                </p>

                <label className="relative inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl cursor-pointer">
                  <FileText size={20} />
                  <span>Choose File</span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.docx"
                    onChange={handleFileSelect}
                  />
                </label>

                <p className="text-xs text-slate-400 mt-6 flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-500" />
                  Supports PDF and DOCX formats
                </p>
              </div>
            </div>

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                <span className="text-red-500 font-bold">⚠</span>
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="bg-slate-100 px-6 py-4 text-center border-t border-slate-200">
            <p className="text-xs text-slate-400 flex items-center justify-center gap-2">
              We respect your privacy. Files are processed securely.
            </p>
          </div>
        </div>
      )}

      {status === 'processing' && (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600"></div>

          <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 bg-gradient-to-b from-white to-slate-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">Building Your Portfolio</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Writing content & designing layout...</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg self-start sm:self-auto">
                <svg className="w-4 h-4 text-blue-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="text-xs sm:text-sm font-medium text-blue-700">{progress}% Complete</span>
              </div>
            </div>
          </div>

          <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 bg-slate-50">
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm mb-1">
                  <span className="font-medium text-slate-700">Overall Progress</span>
                  <span className="font-semibold text-slate-900 tabular-nums">{progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden shadow-inner">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {/* Updated Labels for Portfolio Context */}
                {[
                  { label: 'Upload', sub: 'Receiving file', thresh: 15 },
                  { label: 'Parse', sub: 'Reading structure', thresh: 30 },
                  { label: 'Extract', sub: 'Getting details', thresh: 45 },
                  { label: 'AI Write', sub: 'Drafting content', thresh: 60 },
                  { label: 'Design', sub: 'Building layout', thresh: 75 },
                  { label: 'Launch', sub: 'Finalizing site', thresh: 90 }
                ].map((stage, i) => (
                  <div key={i} className={`relative overflow-hidden rounded-xl border-2 transition-all duration-500 ${progress > stage.thresh ? 'border-blue-300 shadow-md' : 'border-slate-200'}`}>
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 to-blue-400 transition-all duration-700 ease-out"
                      style={{
                        height: progress > stage.thresh ? (progress > stage.thresh + 15 ? '100%' : '60%') : '0%',
                        opacity: progress > stage.thresh ? 0.15 : 0
                      }}
                    ></div>
                    <div className="relative p-3 sm:p-4 flex flex-col items-center text-center gap-1 sm:gap-2">
                       {/* You can keep the same icons or simplify them */}
                       <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all duration-500 ${progress > stage.thresh ? 'bg-blue-600 shadow-lg' : 'bg-slate-300'}`}>
                         <CheckCircle className={`w-4 h-4 sm:w-5 sm:h-5 text-white`} />
                       </div>
                       <div>
                        <h4 className={`text-xs sm:text-sm font-bold mb-0.5 transition-colors ${progress > stage.thresh ? 'text-blue-900' : 'text-slate-500'}`}>{stage.label}</h4>
                        <p className="text-[10px] sm:text-xs text-slate-600 leading-snug">{stage.sub}</p>
                       </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 pt-2">
                <p className="text-[10px] sm:text-xs text-slate-500">
                  Secure processing • No permanent storage
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
