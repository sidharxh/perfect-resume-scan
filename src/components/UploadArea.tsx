'use client';

import React, { useState } from 'react';
import { UploadCloud } from 'lucide-react';
import ResultCard from './ResultCard';
import { ScanResponse } from '@/types';

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

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await fetch('/api/scan', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
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
      console.error('Scan error:', err);
      setError(err.message || 'An error occurred while scanning your resume');
      setStatus('idle');
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
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 p-1 relative overflow-hidden group transition-all duration-500 min-h-[400px]" id={id}>
      {/* Colored Line Top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 z-10"></div>

      {status === 'idle' && (
        <div 
          className={`h-full flex flex-col justify-center p-8 border-2 border-dashed m-2 rounded-xl text-center transition-all cursor-pointer ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-500 hover:bg-blue-50'}`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <UploadCloud size={32} />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Upload your resume</h3>
          <p className="text-slate-500 mb-6">Drag & drop your PDF or DOCX here</p>
          <label className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-md hover:shadow-lg mx-auto cursor-pointer inline-block">
            Select File
            <input 
              type="file" 
              className="hidden" 
              accept=".pdf,.docx"
              onChange={handleFileSelect}
            />
          </label>
          {error && (
            <p className="text-sm text-red-600 mt-4 bg-red-50 p-3 rounded-lg border border-red-200">{error}</p>
          )}
          <p className="text-xs text-slate-400 mt-4">We respect your privacy. Files are processed securely.</p>
        </div>
      )}

      {status === 'processing' && (
        <div className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-md space-y-4 text-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <h3 className="text-xl font-bold text-slate-800">Scanning your resume...</h3>
            <p className="text-slate-500">Analyzing keywords, formatting, and ATS compatibility.</p>
            <div className="w-full bg-slate-100 rounded-full h-2.5 mt-4 overflow-hidden">
              <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-75" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      )}

      {status === 'result' && scanResult?.output && (
        <ResultCard result={scanResult.output} resetScan={() => setStatus('idle')} />
      )}
    </div>
  );
}
