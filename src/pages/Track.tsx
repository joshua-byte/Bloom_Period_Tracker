import React, { useState, useContext } from 'react';
import { MoodTracker } from '../components/MoodTracker';
import { SymptomTracker } from '../components/SymptomTracker';
import { SuggestionCard } from '../components/SuggestionCard';
import { AppContext } from '../contexts/AppContext';
import { MoodEntry, Symptom } from '../types';
import { getSuggestions } from '../utils/suggestion-engine';
import { ExternalLink } from 'lucide-react';

export const Track: React.FC = () => {
  const { addMoodEntry, addSymptom, moodEntries } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState<'mood' | 'symptoms'>('mood');
  
  const latestMood = moodEntries.length > 0 ? moodEntries[0].mood : undefined;
  
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  
  const todaySymptoms = useContext(AppContext).symptoms
    .filter(symptom => new Date(symptom.date) >= todayStart)
    .map(symptom => symptom.category);
  
  const suggestions = getSuggestions(latestMood, todaySymptoms);
  
  const handleMoodSelect = (entry: MoodEntry) => {
    addMoodEntry(entry);
  };
  
  const handleSymptomAdd = (symptom: Symptom) => {
    addSymptom(symptom);
  };
  
  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Track Your Wellness
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Monitor your mood and symptoms to receive personalized care suggestions.
        </p>
      </div>
      
      {/* Tab navigation */}
      <div className="flex justify-center mb-10">
        <div className="bg-gray-100 p-1 rounded-full inline-flex shadow-sm">
          <button
            onClick={() => setActiveTab('mood')}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'mood' 
                ? 'bg-white text-teal-600 shadow-md transform scale-105' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Track Mood
          </button>
          <button
            onClick={() => setActiveTab('symptoms')}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'symptoms' 
                ? 'bg-white text-teal-600 shadow-md transform scale-105' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Track Symptoms
          </button>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main tracking area */}
        <div className="lg:col-span-2">
          <div className="card p-6 md:p-8">
            {activeTab === 'mood' ? (
              <MoodTracker onMoodSelect={handleMoodSelect} />
            ) : (
              <SymptomTracker onSymptomAdd={handleSymptomAdd} />
            )}
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Ena Card */}
          <a 
            href="https://cute-belekoy-02b822.netlify.app/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block card p-6 bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Chat with Ena</h3>
              <ExternalLink className="text-gray-600" size={20} />
            </div>
            <p className="text-gray-700 mb-3">
              Need someone to talk to? Ena is here to provide emotional support and help you through mood swings.
            </p>
            <span className="inline-flex items-center text-purple-600 font-medium">
              Start chatting now
              <ExternalLink className="ml-1" size={16} />
            </span>
          </a>
          
          {/* Suggestions card */}
          <div className="card p-6 bg-gradient-to-br from-teal-50 to-emerald-50">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Care Suggestions
            </h3>
            
            <div className="space-y-4">
              {suggestions.length > 0 ? (
                suggestions.map(suggestion => (
                  <SuggestionCard key={suggestion.id} suggestion={suggestion} />
                ))
              ) : (
                <p className="text-gray-600">
                  Track your mood and symptoms to receive personalized suggestions.
                </p>
              )}
            </div>
          </div>
          
          {/* Resources card */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Wellness Resources
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-teal-400 rounded-full mr-3"></span>
                Learn about menstrual health
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                Find support communities
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-teal-400 rounded-full mr-3"></span>
                Access wellness education
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                Discover sustainable products
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};