'use client';

import React, { useState } from 'react';
import ResultCard from './ResultCard';
import { ScanResponse } from '@/types';
import { UploadCloud, FileText, CheckCircle } from 'lucide-react';


interface UploadAreaProps {
  id: string;
}

export default function UploadArea({ id }: UploadAreaProps) {
  const [status, setStatus] = useState<'idle' | 'processing' | 'result'>('idle');
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setStatus('processing');
    setProgress(0);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    let progressInterval: NodeJS.Timeout | null = null;

    try {
      // Simulate progress
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            if (progressInterval) clearInterval(progressInterval);
            return 90;
          }
          return prev + 5;
        });
      }, 250);

      // Add timeout for fetch
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

      const response = await fetch('/api/scan', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      if (progressInterval) clearInterval(progressInterval);
      setProgress(100);

      const data: ScanResponse = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Failed to scan resume');
      }

      setScanResult(data);
      setTimeout(() => {
        setStatus('result');
      }, 500);
    } catch (err: any) {
      if (progressInterval) clearInterval(progressInterval);
      console.error('Scan error:', err);

      // Handle abort error specifically
      if (err.name === 'AbortError') {
        setError('Request timed out. Please try again.');
      } else {
        setError(err.message || 'An error occurred while scanning your resume');
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
    // Reset input to allow same file to be uploaded again
    e.target.value = '';
  };

  const resetScan = () => {
    setStatus('idle');
    setScanResult(null);
    setError(null);
    setProgress(0);
    setIsDragging(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-3xl mx-auto" id={id}>
      {status === 'idle' && (
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Top Accent Bar - Matching Original */}
          <div className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400"></div>

          {/* Header */}
          <div className="p-8 text-center border-b border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Resume ATS Scanner</h3>
            <p className="text-slate-500 text-sm">AI-powered analysis in seconds</p>
          </div>

          {/* Upload Area */}
          <div
            className={`relative p-12 transition-all ${isDragging ? 'bg-blue-50' : 'bg-slate-50'}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            {/* Dashed Border Container */}
            <div className={`border-2 border-dashed rounded-xl p-10 transition-all ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-white hover:border-blue-500 hover:bg-blue-50'}`}>
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className={`w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 transition-all ${isDragging ? 'scale-110' : 'scale-100'}`}>
                  <UploadCloud className="text-blue-600" size={40} />
                </div>

                {/* Text */}
                <h4 className="text-xl font-bold text-slate-900 mb-2">
                  {isDragging ? 'Drop your file here' : 'Upload your resume'}
                </h4>
                <p className="text-slate-500 mb-6 max-w-md">
                  Drag and drop your PDF or DOCX file here, or click the button below
                </p>

                {/* Upload Button - Matching Original Blue */}
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

                {/* Supported Formats */}
                <p className="text-xs text-slate-400 mt-6 flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-500" />
                  Supports PDF and DOCX formats
                </p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                <span className="text-red-500 font-bold">⚠</span>
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-slate-100 px-6 py-4 text-center border-t border-slate-200">
            <p className="text-xs text-slate-400 flex items-center justify-center gap-2">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              We respect your privacy. Files are processed securely.
            </p>
          </div>
        </div>
      )}

      {status === 'processing' && (
  <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
    {/* Top Accent Bar */}
    <div className="h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600"></div>

    {/* Processing Header */}
    <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 bg-gradient-to-b from-white to-slate-50">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">Processing Your Resume</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Typically takes 15-30 seconds</p>
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

    {/* Processing Content */}
    <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 bg-slate-50">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Progress Bar */}
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

        {/* Processing Stages - 2 Per Row with Fluid Fill */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          
          {/* Stage 1 - Upload */}
          <div className={`relative overflow-hidden rounded-xl border-2 transition-all duration-500 ${
            progress > 15 ? 'border-blue-300 shadow-md' : 'border-slate-200'
          }`}>
            {/* Fluid Fill Effect */}
            <div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 to-blue-400 transition-all duration-700 ease-out"
              style={{ 
                height: progress > 15 ? (progress > 30 ? '100%' : '60%') : '0%',
                opacity: progress > 15 ? 0.15 : 0
              }}
            ></div>
            
            {/* Content */}
            <div className="relative p-3 sm:p-4 flex flex-col items-center text-center gap-2 sm:gap-3">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-all duration-500 ${
                progress > 15 ? 'bg-blue-600 shadow-lg' : 'bg-slate-300'
              }`}>
                {progress > 30 ? (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                )}
              </div>
              <div>
                <h4 className={`text-xs sm:text-sm font-bold mb-1 transition-colors ${
                  progress > 15 ? 'text-blue-900' : 'text-slate-500'
                }`}>
                  Upload
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-600 leading-snug">
                  Receiving & validating file
                </p>
              </div>
            </div>
          </div>

          {/* Stage 2 - Parse */}
          <div className={`relative overflow-hidden rounded-xl border-2 transition-all duration-500 ${
            progress > 30 ? 'border-blue-300 shadow-md' : 'border-slate-200'
          }`}>
            <div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 to-blue-400 transition-all duration-700 ease-out"
              style={{ 
                height: progress > 30 ? (progress > 45 ? '100%' : '60%') : '0%',
                opacity: progress > 30 ? 0.15 : 0
              }}
            ></div>
            
            <div className="relative p-3 sm:p-4 flex flex-col items-center text-center gap-2 sm:gap-3">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-all duration-500 ${
                progress > 30 ? 'bg-blue-600 shadow-lg' : 'bg-slate-300'
              }`}>
                {progress > 45 ? (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )}
              </div>
              <div>
                <h4 className={`text-xs sm:text-sm font-bold mb-1 transition-colors ${
                  progress > 30 ? 'text-blue-900' : 'text-slate-500'
                }`}>
                  Parse
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-600 leading-snug">
                  Analyzing structure
                </p>
              </div>
            </div>
          </div>

          {/* Stage 3 - Extract */}
          <div className={`relative overflow-hidden rounded-xl border-2 transition-all duration-500 ${
            progress > 45 ? 'border-blue-300 shadow-md' : 'border-slate-200'
          }`}>
            <div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 to-blue-400 transition-all duration-700 ease-out"
              style={{ 
                height: progress > 45 ? (progress > 60 ? '100%' : '60%') : '0%',
                opacity: progress > 45 ? 0.15 : 0
              }}
            ></div>
            
            <div className="relative p-3 sm:p-4 flex flex-col items-center text-center gap-2 sm:gap-3">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-all duration-500 ${
                progress > 45 ? 'bg-blue-600 shadow-lg' : 'bg-slate-300'
              }`}>
                {progress > 60 ? (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                )}
              </div>
              <div>
                <h4 className={`text-xs sm:text-sm font-bold mb-1 transition-colors ${
                  progress > 45 ? 'text-blue-900' : 'text-slate-500'
                }`}>
                  Extract
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-600 leading-snug">
                  Extracting content data
                </p>
              </div>
            </div>
          </div>

          {/* Stage 4 - Analyze */}
          <div className={`relative overflow-hidden rounded-xl border-2 transition-all duration-500 ${
            progress > 60 ? 'border-blue-300 shadow-md' : 'border-slate-200'
          }`}>
            <div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 to-blue-400 transition-all duration-700 ease-out"
              style={{ 
                height: progress > 60 ? (progress > 75 ? '100%' : '60%') : '0%',
                opacity: progress > 60 ? 0.15 : 0
              }}
            ></div>
            
            <div className="relative p-3 sm:p-4 flex flex-col items-center text-center gap-2 sm:gap-3">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-all duration-500 ${
                progress > 60 ? 'bg-blue-600 shadow-lg' : 'bg-slate-300'
              }`}>
                {progress > 75 ? (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )}
              </div>
              <div>
                <h4 className={`text-xs sm:text-sm font-bold mb-1 transition-colors ${
                  progress > 60 ? 'text-blue-900' : 'text-slate-500'
                }`}>
                  AI Analysis
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-600 leading-snug">
                  Running AI evaluation
                </p>
              </div>
            </div>
          </div>

          {/* Stage 5 - Score */}
          <div className={`relative overflow-hidden rounded-xl border-2 transition-all duration-500 ${
            progress > 75 ? 'border-blue-300 shadow-md' : 'border-slate-200'
          }`}>
            <div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 to-blue-400 transition-all duration-700 ease-out"
              style={{ 
                height: progress > 75 ? (progress > 90 ? '100%' : '60%') : '0%',
                opacity: progress > 75 ? 0.15 : 0
              }}
            ></div>
            
            <div className="relative p-3 sm:p-4 flex flex-col items-center text-center gap-2 sm:gap-3">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-all duration-500 ${
                progress > 75 ? 'bg-blue-600 shadow-lg' : 'bg-slate-300'
              }`}>
                {progress > 90 ? (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )}
              </div>
              <div>
                <h4 className={`text-xs sm:text-sm font-bold mb-1 transition-colors ${
                  progress > 75 ? 'text-blue-900' : 'text-slate-500'
                }`}>
                  ATS Score
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-600 leading-snug">
                  Calculating compatibility
                </p>
              </div>
            </div>
          </div>

          {/* Stage 6 - Complete */}
          <div className={`relative overflow-hidden rounded-xl border-2 transition-all duration-500 ${
            progress > 90 ? 'border-blue-300 shadow-md' : 'border-slate-200'
          }`}>
            <div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 to-blue-400 transition-all duration-700 ease-out"
              style={{ 
                height: progress > 90 ? '100%' : '0%',
                opacity: progress > 90 ? 0.15 : 0
              }}
            ></div>
            
            <div className="relative p-3 sm:p-4 flex flex-col items-center text-center gap-2 sm:gap-3">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-all duration-500 ${
                progress > 90 ? 'bg-blue-600 shadow-lg' : 'bg-slate-300'
              }`}>
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className={`text-xs sm:text-sm font-bold mb-1 transition-colors ${
                  progress > 90 ? 'text-blue-900' : 'text-slate-500'
                }`}>
                  Finalize
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-600 leading-snug">
                  Generating full report
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Security Notice */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <p className="text-[10px] sm:text-xs text-slate-500">
            Secure processing • No permanent storage
          </p>
        </div>

      </div>
    </div>
  </div>
)}


      {status === 'result' && scanResult?.output && (
        <ResultCard result={scanResult.output} resetScan={resetScan} />
      )}
    </div>
  );
}
