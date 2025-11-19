import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { ReportView } from './components/ReportView';
import { AnalysisResult, AppStatus } from './types';
import { analyzeSurveyData } from './services/geminiService';
import { Icons } from './components/Icons';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (inputData: string) => {
    setStatus(AppStatus.ANALYZING);
    setError(null);
    try {
      const result = await analyzeSurveyData(inputData);
      setData(result);
      setStatus(AppStatus.SUCCESS);
    } catch (err) {
      console.error(err);
      setStatus(AppStatus.ERROR);
      setError(err instanceof Error ? err.message : "예기치 않은 오류가 발생했습니다.");
    }
  };

  const handleReset = () => {
    setStatus(AppStatus.IDLE);
    setData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        {status === AppStatus.IDLE && (
          <div className="flex flex-col items-center justify-center h-full space-y-12">
             <div className="text-center space-y-4 max-w-2xl">
               <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                 고객의 목소리를 <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">실행 가능한 인사이트</span>로
               </h1>
               <p className="text-lg text-slate-600">
                 고객 설문 데이터를 즉시 분석하여 페인 포인트를 파악하고,<br className="hidden md:block" /> 
                 전문가 수준의 페르소나와 서비스 디자인 인사이트를 도출하세요.
               </p>
             </div>
             <InputSection onAnalyze={handleAnalyze} isAnalyzing={false} />
          </div>
        )}

        {status === AppStatus.ANALYZING && (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
             <div className="relative">
               <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                 <Icons.Brain className="w-8 h-8 text-indigo-600" />
               </div>
             </div>
             <div className="text-center">
               <h3 className="text-xl font-bold text-slate-800">데이터 분석 및 리포트 생성 중...</h3>
               <p className="text-slate-500 mt-2">주요 테마 추출, 페르소나 생성 및 국/영문 리포트 작성 작업을 수행하고 있습니다.<br/>잠시만 기다려주세요.</p>
             </div>
          </div>
        )}

        {status === AppStatus.ERROR && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100 max-w-md text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                <Icons.Alert className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-red-900 mb-2">분석 실패</h3>
              <p className="text-red-700 mb-6 text-sm">{error || "API 키와 인터넷 연결 상태를 확인해 주세요."}</p>
              <button 
                onClick={handleReset}
                className="px-6 py-2 bg-white border border-red-200 text-red-700 rounded-lg hover:bg-red-50 font-medium transition-colors"
              >
                다시 시도
              </button>
            </div>
          </div>
        )}

        {status === AppStatus.SUCCESS && data && (
          <ReportView data={data} onReset={handleReset} />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
           <p className="text-slate-400 text-sm">© 2024 InsightFlow. Powered by Google Gemini 2.5.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;