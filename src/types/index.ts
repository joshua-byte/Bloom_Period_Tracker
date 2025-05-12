// Types for mood entries
export type MoodType = 'happy' | 'calm' | 'sad' | 'anxious' | 'angry' | 'tired';

export interface MoodEntry {
  id: string;
  date: string;
  mood: MoodType;
  intensity: number; // 1-5
  notes?: string;
}

// Types for symptoms
export type SymptomCategory = 'cramps' | 'headache' | 'fatigue' | 'bloating' | 'backPain' | 'nausea' | 'other';

export interface Symptom {
  id: string;
  date: string;
  category: SymptomCategory;
  intensity: number; // 1-5
  notes?: string;
}

// Application navigation pages
export type AppPage = 'home' | 'track' | 'dashboard' | 'about';

// Context type
export interface AppContextType {
  moodEntries: MoodEntry[];
  symptoms: Symptom[];
  addMoodEntry: (entry: MoodEntry) => void;
  addSymptom: (symptom: Symptom) => void;
  clearData: () => void;
  currentPage: AppPage;
  navigateTo: (page: AppPage) => void;
}

// Types for the suggestion engine
export interface Suggestion {
  id: string;
  title: string;
  description: string;
  moodTriggers: MoodType[];
  symptomTriggers: SymptomCategory[];
  emoji: string;
}
