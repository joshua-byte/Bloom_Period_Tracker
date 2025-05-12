import React, { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { Track } from './pages/Track';
import { Dashboard } from './pages/Dashboard';
import { About } from './pages/About';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AppContext } from './contexts/AppContext';
import { MoodEntry, Symptom, AppPage } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  
  useEffect(() => {
    const savedMoodEntries = localStorage.getItem('moodEntries');
    const savedSymptoms = localStorage.getItem('symptoms');
    
    if (savedMoodEntries) {
      setMoodEntries(JSON.parse(savedMoodEntries));
    }
    
    if (savedSymptoms) {
      setSymptoms(JSON.parse(savedSymptoms));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
  }, [moodEntries]);
  
  useEffect(() => {
    localStorage.setItem('symptoms', JSON.stringify(symptoms));
  }, [symptoms]);
  
  const addMoodEntry = (entry: MoodEntry) => {
    setMoodEntries(prev => [entry, ...prev]);
  };
  
  const addSymptom = (symptom: Symptom) => {
    setSymptoms(prev => [symptom, ...prev]);
  };
  
  const clearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      setMoodEntries([]);
      setSymptoms([]);
      localStorage.removeItem('moodEntries');
      localStorage.removeItem('symptoms');
    }
  };
  
  const navigateTo = (page: AppPage) => {
    setCurrentPage(page);
  };
  
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigateTo={navigateTo} />;
      case 'track':
        return <Track addMoodEntry={addMoodEntry} addSymptom={addSymptom} />;
      case 'dashboard':
        return <Dashboard moodEntries={moodEntries} symptoms={symptoms} />;
      case 'about':
        return <About />;
      default:
        return <Home navigateTo={navigateTo} />;
    }
  };
  
  return (
    <AppContext.Provider value={{ 
      moodEntries, 
      symptoms, 
      addMoodEntry, 
      addSymptom, 
      clearData, 
      currentPage, 
      navigateTo 
    }}>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-teal-50 to-emerald-50">
        <Header />
        <main className="flex-1 container mx-auto p-4 md:p-6">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
