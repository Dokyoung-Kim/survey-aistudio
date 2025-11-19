import React, { useState, useRef } from 'react';
import { Icons } from './Icons';

interface InputSectionProps {
  onAnalyze: (data: string) => void;
  isAnalyzing: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, isAnalyzing }) => {
  const [textInput, setTextInput] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setTextInput(content);
    };
    reader.readAsText(file);
  };

  const handleAnalyzeClick = () => {
    if (!textInput.trim()) return;
    onAnalyze(textInput);
  };

  const clearFile = () => {
    setFileName(null);
    setTextInput('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">설문 데이터 업로드</h2>
        <p className="text-slate-500">설문 응답 내용을 붙여넣거나 CSV 파일을 업로드하여 분석을 시작하세요.</p>
      </div>

      <div className="space-y-6">
        {/* File Upload Area */}
        <div 
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            fileName ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'
          }`}
          onClick={() => !fileName && fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept=".csv,.txt" 
            onChange={handleFileChange} 
          />
          
          {fileName ? (
            <div className="flex items-center justify-center space-x-3">
              <Icons.FileText className="w-8 h-8 text-indigo-600" />
              <span className="font-medium text-indigo-900">{fileName}</span>
              <button 
                onClick={(e) => { e.stopPropagation(); clearFile(); }}
                className="p-1 hover:bg-indigo-200 rounded-full text-indigo-600"
              >
                <Icons.Close className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="cursor-pointer">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icons.Upload className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">CSV 파일 업로드</h3>
              <p className="text-sm text-slate-500 mt-1">또는 아래 텍스트 영역에 직접 입력</p>
            </div>
          )}
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="여기에 설문 데이터를 직접 붙여넣으세요..."
            className="w-full h-48 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none text-slate-700 text-sm"
          />
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={handleAnalyzeClick}
            disabled={isAnalyzing || !textInput.trim()}
            className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold text-white transition-all ${
              isAnalyzing || !textInput.trim()
                ? 'bg-slate-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5'
            }`}
          >
            {isAnalyzing ? (
              <>
                <Icons.Spinner className="w-5 h-5 animate-spin" />
                <span>데이터 분석 중...</span>
              </>
            ) : (
              <>
                <Icons.Brain className="w-5 h-5" />
                <span>인사이트 생성하기</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};