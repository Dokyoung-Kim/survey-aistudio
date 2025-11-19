import React from 'react';
import { Icons } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-200">
             <Icons.Brain className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">InsightFlow</h1>
            <span className="text-xs font-medium text-slate-500 block -mt-1">AI 설문 분석 솔루션</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-1 text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
             <Icons.Globe className="w-3.5 h-3.5 text-slate-400" />
             <span>한국어/영어 리포트 자동 생성</span>
          </div>
        </div>
      </div>
    </header>
  );
};