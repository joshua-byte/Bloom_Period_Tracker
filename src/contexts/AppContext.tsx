import { createContext } from 'react';
import { AppContextType } from '../types';

// Creating context with default values
export const AppContext = createContext<AppContextType>({
  moodEntries: [],
  symptoms: [],
  addMoodEntry: () => {},
  addSymptom: () => {},
  clearData: () => {},
  currentPage: 'home',
  navigateTo: () => {},
});
