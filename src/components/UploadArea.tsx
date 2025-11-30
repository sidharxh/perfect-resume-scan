'use client';

import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, Terminal, Cpu } from 'lucide-react';

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
    // 1. VALIDATE FILE SIZE (1MB Limit)
    if (file.size > 1024 * 1024) {
      setError('File size exceeds 1MB limit. Please optimize your PDF.');
      return;
    }

    const startTime = Date.now();
    setStatus('processing');
    setProgress(0);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    let progressInterval: NodeJS.Timeout | null = null;

    try {
      // 2. UPDATED PROGRESS LOGIC
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          // Phase 1: Fast parsing (0-80)
          if (prev < 80) {
             return prev + 5; // Faster increments
          }
          // Phase 2: "Finalizing" (90-99) - Slow crawl
          if (prev < 99) {
             return prev + 1; // Very slow increments
          }
          // Cap at 99 until real response comes back
          return 99;
        });
      }, 300); // 300ms ticks

      // Add timeout for fetch (60s)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      // Call API
      const response = await fetch('/api/create-portfolio', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      if (progressInterval) clearInterval(progressInterval);
      setProgress(100); // Jump to 100 on success

      const data: any = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Failed to generate portfolio');
      }

      // Save to localStorage
      try {
        localStorage.setItem("portfolioData", JSON.stringify(data));
      } catch (e) {
        console.error("Failed to save to local storage", e);
      }

      // Notify Parent
      if (onScanComplete) { onScanComplete(data); }

      setStatus('idle');
      setProgress(0);
      setIsDragging(false);

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
        // IDLE STATE - Dark Minimal Card
        <div className="bg-[#1a1a1a] rounded-xl shadow-2xl border border-white/10 overflow-hidden relative group">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

          <div className="p-8 text-center border-b border-white/5">
            <div className="inline-flex items-center gap-2 mb-3 opacity-70">
               <Terminal size={16} className="text-purple-400" />
               <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">System Input</span>
            </div>
            <h3 className="text-xl md:text-2xl font-mono font-bold text-white mb-2">Initialize Website Build</h3>
            <p className="text-gray-500 text-sm font-mono">Upload source file [PDF/DOCX] to begin compilation</p>
          </div>

          <div
            className={`relative p-12 transition-all duration-300 ${isDragging ? 'bg-white/5' : 'bg-[#1a1a1a]'}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <div className={`border border-dashed rounded-lg p-10 transition-all duration-300 ${isDragging ? 'border-purple-500 bg-purple-500/10' : 'border-white/20 hover:border-purple-500/50 hover:bg-white/5'}`}>
              <div className="flex flex-col items-center text-center">
                
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${isDragging ? 'bg-purple-500/20 scale-110' : 'bg-white/5'}`}>
                  <UploadCloud className={`transition-colors ${isDragging ? 'text-purple-400' : 'text-gray-400'}`} size={32} />
                </div>

                <h4 className="text-lg font-mono font-bold text-white mb-2">
                  {isDragging ? 'DROP_FILE_HERE' : 'UPLOAD_SOURCE_CODE'}
                </h4>
                <p className="text-gray-500 mb-8 max-w-md text-sm font-mono">
                  Drag & drop resume file or execute manual selection
                </p>

                <label className="relative inline-flex items-center gap-3 bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-full font-mono text-sm font-bold transition-all cursor-pointer group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  <FileText size={16} />
                  <span>SELECT_FILE</span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.docx"
                    onChange={handleFileSelect}
                  />
                </label>

                <div className="mt-8 flex flex-col items-center gap-1">
                   <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest flex items-center gap-2">
                     <CheckCircle size={12} className="text-green-500/80" />
                     System Compatible: PDF, DOCX
                   </p>
                   <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">
                     Max Size: 1MB
                   </p>
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-6 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-md text-sm font-mono flex items-start gap-3">
                <span className="font-bold">ERROR:</span>
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {status === 'processing' && (
        // PROCESSING STATE - Dark Tech Interface
        <div className="bg-[#1a1a1a] rounded-xl shadow-2xl border border-white/10 overflow-hidden">
          <div className="h-[2px] w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient-x"></div>

          <div className="px-6 py-5 border-b border-white/5 bg-[#1f1f1f]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-ping absolute opacity-75"></div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full relative"></div>
                </div>
                <div>
                  <h3 className="text-base font-mono font-bold text-white">SYSTEM_COMPILING...</h3>
                  <p className="text-xs font-mono text-gray-500 mt-1">Processing input data stream</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded font-mono">
                <Cpu className="w-4 h-4 text-purple-400 animate-pulse" />
                <span className="text-xs text-purple-300">{progress}% COMPLETE</span>
              </div>
            </div>
          </div>

          <div className="px-6 py-8 bg-[#1a1a1a]">
            <div className="max-w-5xl mx-auto space-y-8">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-gray-400">EXECUTION_PROGRESS</span>
                  <span className="text-white font-bold">{progress}%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: 'UPLOAD', sub: 'Input Stream', thresh: 15 },
                  { label: 'PARSE', sub: 'Reading Data', thresh: 35 },
                  { label: 'EXTRACT', sub: 'Mining Info', thresh: 55 },
                  { label: 'AI_GEN', sub: 'Writing Code', thresh: 75 },
                  { label: 'LAYOUT', sub: 'UI Assembly', thresh: 85 },
                  { label: 'DEPLOY', sub: 'Finalizing', thresh: 98 }
                ].map((stage, i) => (
                  <div 
                    key={i} 
                    className={`relative overflow-hidden rounded border p-3 transition-all duration-500 ${
                      progress > stage.thresh 
                        ? 'border-purple-500/30 bg-purple-500/5' 
                        : 'border-white/5 bg-transparent opacity-50'
                    }`}
                  >
                    <div className="flex flex-col gap-2">
                       <div className="flex items-center justify-between">
                         <span className={`text-[10px] font-mono uppercase tracking-wider ${progress > stage.thresh ? 'text-purple-400' : 'text-gray-600'}`}>
                           Step_0{i+1}
                         </span>
                         {progress > stage.thresh && <CheckCircle className="w-3 h-3 text-green-400" />}
                       </div>
                       <div>
                        <h4 className={`text-xs sm:text-sm font-mono font-bold ${progress > stage.thresh ? 'text-white' : 'text-gray-500'}`}>
                          {stage.label}
                        </h4>
                        <p className="text-[10px] text-gray-600 font-mono mt-0.5">{stage.sub}</p>
                       </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-4">
                <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                  Encryption: Active • Storage: Temporary
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
