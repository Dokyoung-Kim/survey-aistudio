import React from 'react';
import { UserPersona } from '../types';
import { Icons } from './Icons';

interface PersonaCardProps {
  persona: UserPersona;
}

export const PersonaCard: React.FC<PersonaCardProps> = ({ persona }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4 mb-6 pb-4 border-b border-slate-100">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
          <Icons.Users className="w-8 h-8" />
        </div>
        <div>
          <h4 className="text-xl font-bold text-slate-900">{persona.name}</h4>
          <span className="text-sm text-slate-500 font-medium">주요 페르소나 (Primary Persona)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">목표 및 동기 (Goals)</h5>
          <p className="text-slate-700 text-sm leading-relaxed bg-slate-50 p-3 rounded-lg">{persona.goals}</p>
        </div>
        <div>
          <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">행동 패턴 (Behavior)</h5>
          <p className="text-slate-700 text-sm leading-relaxed bg-slate-50 p-3 rounded-lg">{persona.behavior}</p>
        </div>
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
             <h5 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">주요 불편 사항 (Pain Points)</h5>
             <p className="text-sm text-red-800 bg-red-50 p-3 rounded-lg border border-red-100">{persona.painPoints}</p>
           </div>
           <div>
             <h5 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">핵심 니즈 (Needs)</h5>
             <p className="text-sm text-indigo-800 bg-indigo-50 p-3 rounded-lg border border-indigo-100">{persona.needs}</p>
           </div>
        </div>
      </div>
    </div>
  );
};