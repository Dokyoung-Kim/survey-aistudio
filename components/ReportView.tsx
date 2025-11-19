import React, { useState } from 'react';
import { AnalyzedSection, AnalysisResult } from '../types';
import { Icons } from './Icons';
import { PersonaCard } from './PersonaCard';
import { ServiceDesignCard } from './ServiceDesignCard';

interface ReportViewProps {
  data: AnalysisResult;
  onReset: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({ data, onReset }) => {
  const [lang, setLang] = useState<'english' | 'korean'>('korean');
  
  const currentData: AnalyzedSection = data[lang];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pb-20">
      {/* Toolbar */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md py-4 border-b border-slate-200 mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-bold text-slate-900">분석 결과 보고서</h2>
          <div className="flex bg-slate-100 p-1 rounded-lg">
             <button
              onClick={() => setLang('korean')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                lang === 'korean' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              한국어
            </button>
            <button
              onClick={() => setLang('english')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                lang === 'english' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              English
            </button>
          </div>
        </div>
        <button 
          onClick={onReset}
          className="text-slate-500 hover:text-red-600 font-medium text-sm flex items-center space-x-1"
        >
          <Icons.Close className="w-4 h-4" />
          <span>새 분석 시작</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Summary & Insights */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* 1. Survey Summary */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center space-x-3 mb-4 text-indigo-600">
              <Icons.FileText className="w-6 h-6" />
              <h3 className="text-lg font-bold">1. 설문 요약 (Summary)</h3>
            </div>
            <p className="text-slate-700 leading-relaxed mb-6">{currentData.surveySummary.overview}</p>
            <div className="flex flex-wrap gap-2">
              {currentData.surveySummary.themes.map((theme, idx) => (
                <span key={idx} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                  #{theme}
                </span>
              ))}
            </div>
          </section>

          {/* 2. Key Insights */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center space-x-3 mb-6 text-indigo-600">
              <Icons.Target className="w-6 h-6" />
              <h3 className="text-lg font-bold">2. 핵심 인사이트 Top 5</h3>
            </div>
            <ul className="space-y-3">
              {currentData.topInsights.map((insight, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-slate-700">{insight}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* 3. Pain Points */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center space-x-3 mb-6 text-red-500">
              <Icons.Alert className="w-6 h-6" />
              <h3 className="text-lg font-bold text-indigo-600">3. 사용자 불편 사항 (Pain Points)</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentData.painPoints.map((group, idx) => (
                <div key={idx} className="bg-red-50/50 rounded-xl p-5">
                  <h4 className="font-bold text-red-800 mb-3">{group.category}</h4>
                  <ul className="space-y-2">
                    {group.points.map((point, pIdx) => (
                      <li key={pIdx} className="text-sm text-red-900/80 flex items-start space-x-2">
                        <span className="block w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

           {/* 5. User Personas */}
           <section>
            <div className="flex items-center space-x-3 mb-6 text-indigo-600">
              <Icons.Users className="w-6 h-6" />
              <h3 className="text-lg font-bold">5. 사용자 페르소나 (Personas)</h3>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {currentData.personas.map((persona, idx) => (
                <PersonaCard key={idx} persona={persona} />
              ))}
            </div>
          </section>

          {/* 6. Service Design */}
          <section>
            <div className="flex items-center space-x-3 mb-6 text-indigo-600">
              <Icons.Lightbulb className="w-6 h-6" />
              <h3 className="text-lg font-bold">6. 서비스 디자인 제안</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {currentData.serviceDesign.map((item, idx) => (
                <ServiceDesignCard key={idx} item={item} />
              ))}
            </div>
          </section>

        </div>

        {/* Right Column: Needs & PPT Summary */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* 4. User Needs - Sticky-ish */}
          <section className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-6">
              <Icons.Heart className="w-6 h-6 text-indigo-200" />
              <h3 className="text-lg font-bold">4. 사용자 니즈 (Needs)</h3>
            </div>
            <ul className="space-y-4">
              {currentData.userNeeds.map((need, idx) => (
                <li key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                  <p className="text-indigo-50 text-sm font-medium leading-relaxed">{need}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* 7. PPT Summary */}
          <section className="bg-slate-800 text-slate-200 rounded-2xl p-6 shadow-lg border border-slate-700 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3 text-white">
                <Icons.Presentation className="w-6 h-6" />
                <h3 className="text-lg font-bold">7. 발표용 요약 (PPT)</h3>
              </div>
              <span className="bg-slate-700 text-xs font-mono px-2 py-1 rounded text-slate-300">Slide Ready</span>
            </div>
            
            <div className="bg-white text-slate-900 rounded-lg p-6 aspect-[4/3] flex flex-col shadow-2xl">
              <h4 className="text-xl font-bold text-indigo-900 mb-4 border-b-2 border-indigo-100 pb-2">
                {currentData.pptSummary.title}
              </h4>
              <ul className="flex-1 space-y-3 overflow-y-auto pr-2">
                {currentData.pptSummary.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-sm">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span className="text-slate-700">{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-2 border-t border-slate-100 flex justify-between items-center">
                 <span className="text-xs text-slate-400">InsightFlow Analysis</span>
                 <div className="w-20 h-1 bg-indigo-600 rounded-full"></div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};