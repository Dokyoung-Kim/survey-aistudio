import React from 'react';
import { ServiceDesignInsight } from '../types';

interface ServiceDesignCardProps {
  item: ServiceDesignInsight;
}

export const ServiceDesignCard: React.FC<ServiceDesignCardProps> = ({ item }) => {
  const getPriorityStyle = (p: string) => {
    switch (p) {
      case 'Must': return 'bg-indigo-600 text-white';
      case 'Should': return 'bg-amber-500 text-white';
      case 'Could': return 'bg-slate-400 text-white';
      default: return 'bg-slate-200 text-slate-700';
    }
  };

  const getPriorityLabel = (p: string) => {
    switch (p) {
      case 'Must': return '필수 (Must)';
      case 'Should': return '권장 (Should)';
      case 'Could': return '고려 (Could)';
      default: return p;
    }
  };

  return (
    <div className="flex items-start p-4 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 transition-colors">
      <div className={`flex-shrink-0 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide mt-1 mr-4 ${getPriorityStyle(item.priority)}`}>
        {getPriorityLabel(item.priority)}
      </div>
      <div className="flex-1">
        <h4 className="text-base font-bold text-slate-900 mb-1">{item.feature}</h4>
        <p className="text-slate-600 text-sm">{item.description}</p>
      </div>
    </div>
  );
};