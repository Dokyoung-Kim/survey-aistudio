export interface SurveySummary {
  overview: string;
  themes: string[];
}

export interface PainPointCategory {
  category: string;
  points: string[];
}

export interface UserPersona {
  name: string; // e.g., "The Busy Professional"
  goals: string;
  behavior: string;
  painPoints: string;
  needs: string;
}

export interface ServiceDesignInsight {
  feature: string;
  description: string;
  priority: 'Must' | 'Should' | 'Could';
}

export interface PPTSummary {
  title: string;
  bullets: string[];
}

export interface AnalyzedSection {
  surveySummary: SurveySummary;
  topInsights: string[];
  painPoints: PainPointCategory[];
  userNeeds: string[];
  personas: UserPersona[];
  serviceDesign: ServiceDesignInsight[];
  pptSummary: PPTSummary;
}

export interface AnalysisResult {
  english: AnalyzedSection;
  korean: AnalyzedSection;
}

export enum AppStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}
