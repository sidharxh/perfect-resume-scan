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
          return prev + 6;
        });
      }, 200);

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
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Top Accent Bar */}
          <div className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400"></div>

          {/* Processing Header */}
          <div className="p-6 text-center border-b border-slate-100">
            <div className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <h3 className="text-xl font-bold text-slate-800">Analyzing Resume...</h3>
            </div>
          </div>

          {/* Processing Content */}
          <div className="p-12 bg-slate-50">
            <div className="max-w-xl mx-auto space-y-8">
              {/* Central Icon */}
              <div className="flex justify-center">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 bg-blue-100 rounded-2xl animate-pulse"></div>
                  <div className="absolute inset-1 bg-white rounded-xl flex items-center justify-center">
                    <FileText className="text-blue-600" size={36} />
                  </div>
                </div>
              </div>

              {/* Progress Bar - Matching Original Blue */}
              <div className="space-y-3">
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 font-medium">Processing</span>
                  <span className="text-slate-900 font-bold">{progress}%</span>
                </div>
              </div>

              {/* Processing Steps Grid - 6 Steps */}
              <div className="grid grid-cols-3 gap-3">
                {/* Step 1 - Upload */}
                <div className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all duration-500 ${progress > 15 ? 'bg-blue-50 border-blue-200 scale-100' : 'bg-white border-slate-200 scale-95 opacity-40'}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-500 ${progress > 15 ? 'bg-blue-600' : 'bg-slate-300'}`}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <span className={`text-xs font-semibold transition-colors ${progress > 15 ? 'text-blue-600' : 'text-slate-400'}`}>
                    Uploading
                  </span>
                </div>

                {/* Step 2 - Parse */}
                <div className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all duration-500 ${progress > 30 ? 'bg-blue-50 border-blue-200 scale-100' : 'bg-white border-slate-200 scale-95 opacity-40'}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-500 ${progress > 30 ? 'bg-blue-600' : 'bg-slate-300'}`}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className={`text-xs font-semibold transition-colors ${progress > 30 ? 'text-blue-600' : 'text-slate-400'}`}>
                    Parsing
                  </span>
                </div>

                {/* Step 3 - Extract */}
                <div className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all duration-500 ${progress > 45 ? 'bg-blue-50 border-blue-200 scale-100' : 'bg-white border-slate-200 scale-95 opacity-40'}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-500 ${progress > 45 ? 'bg-blue-600' : 'bg-slate-300'}`}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                    </svg>
                  </div>
                  <span className={`text-xs font-semibold transition-colors ${progress > 45 ? 'text-blue-600' : 'text-slate-400'}`}>
                    Extracting
                  </span>
                </div>

                {/* Step 4 - Analyze */}
                <div className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all duration-500 ${progress > 60 ? 'bg-blue-50 border-blue-200 scale-100' : 'bg-white border-slate-200 scale-95 opacity-40'}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-500 ${progress > 60 ? 'bg-blue-600' : 'bg-slate-300'}`}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <span className={`text-xs font-semibold transition-colors ${progress > 60 ? 'text-blue-600' : 'text-slate-400'}`}>
                    Analyzing
                  </span>
                </div>

                {/* Step 5 - Score */}
                <div className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all duration-500 ${progress > 75 ? 'bg-blue-50 border-blue-200 scale-100' : 'bg-white border-slate-200 scale-95 opacity-40'}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-500 ${progress > 75 ? 'bg-blue-600' : 'bg-slate-300'}`}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span className={`text-xs font-semibold transition-colors ${progress > 75 ? 'text-blue-600' : 'text-slate-400'}`}>
                    Scoring
                  </span>
                </div>

                {/* Step 6 - Optimize */}
                <div className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all duration-500 ${progress > 90 ? 'bg-blue-50 border-blue-200 scale-100' : 'bg-white border-slate-200 scale-95 opacity-40'}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-500 ${progress > 90 ? 'bg-blue-600' : 'bg-slate-300'}`}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <span className={`text-xs font-semibold transition-colors ${progress > 90 ? 'text-blue-600' : 'text-slate-400'}`}>
                    Optimizing
                  </span>
                </div>
              </div>

              {/* Current Status Text */}
              <div className="text-center">
                <p className="text-sm text-slate-600">
                  {progress <= 15 && "Uploading your resume..."}
                  {progress > 15 && progress <= 30 && "Parsing document structure..."}
                  {progress > 30 && progress <= 45 && "Extracting text and data..."}
                  {progress > 45 && progress <= 60 && "Running AI analysis..."}
                  {progress > 60 && progress <= 75 && "Calculating ATS score..."}
                  {progress > 75 && progress <= 90 && "Generating insights..."}
                  {progress > 90 && "Finalizing results..."}
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
