import React, { useMemo } from 'react';
import { Calendar, BarChart2, RefreshCw } from 'lucide-react';
import { EmotionTimeline } from '../components/EmotionTimeline';
import { MascotAvatar } from '../components/MascotAvatar';
import { MoodEntry, Symptom, MoodType } from '../types';

interface DashboardProps {
  moodEntries: MoodEntry[];
  symptoms: Symptom[];
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  moodEntries,
  symptoms 
}) => {
  // Calculate most frequent mood
  const mostFrequentMood = useMemo(() => {
    if (moodEntries.length === 0) return undefined;
    
    const moodCounts: Record<string, number> = {};
    moodEntries.forEach(entry => {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    });
    
    let maxCount = 0;
    let mostFrequent: MoodType | undefined = undefined;
    
    Object.entries(moodCounts).forEach(([mood, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostFrequent = mood as MoodType;
      }
    });
    
    return mostFrequent;
  }, [moodEntries]);
  
  // Calculate most common symptom
  const mostCommonSymptom = useMemo(() => {
    if (symptoms.length === 0) return 'None tracked yet';
    
    const symptomCounts: Record<string, number> = {};
    symptoms.forEach(symptom => {
      symptomCounts[symptom.category] = (symptomCounts[symptom.category] || 0) + 1;
    });
    
    let maxCount = 0;
    let mostCommon = '';
    
    Object.entries(symptomCounts).forEach(([category, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostCommon = category;
      }
    });
    
    // Format the symptom name for display
    return mostCommon
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  }, [symptoms]);
  
  // Calculate average mood intensity
  const averageMoodIntensity = useMemo(() => {
    if (moodEntries.length === 0) return 0;
    
    const total = moodEntries.reduce((sum, entry) => sum + entry.intensity, 0);
    return (total / moodEntries.length).toFixed(1);
  }, [moodEntries]);
  
  // Get encouraging message based on tracking history
  const getEncouragingMessage = () => {
    if (moodEntries.length === 0 && symptoms.length === 0) {
      return "Start tracking to see your wellness insights here!";
    }
    
    if (moodEntries.length > 0 && symptoms.length === 0) {
      return "Great job tracking your mood! Try logging your symptoms too for more personalized insights.";
    }
    
    if (moodEntries.length === 0 && symptoms.length > 0) {
      return "You're doing well tracking symptoms! Add mood tracking for a more complete picture.";
    }
    
    if (moodEntries.length >= 5) {
      return "Amazing work tracking consistently! Your data is helping you understand your patterns better.";
    }
    
    return "You're making great progress in understanding your cycle and emotions!";
  };
  
  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          Your Wellness Dashboard
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Visualize your mood patterns and gain insights about your menstrual health.
        </p>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-5 border-t-4 border-pink-400">
          <div className="flex items-center mb-3">
            <div className="bg-pink-100 p-2 rounded-lg mr-3">
              <Calendar className="text-pink-500" size={20} />
            </div>
            <h3 className="text-gray-700 font-medium">Tracking Stats</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Moods tracked:</span>
              <span className="font-medium">{moodEntries.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Symptoms logged:</span>
              <span className="font-medium">{symptoms.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Last tracked:</span>
              <span className="font-medium">
                {moodEntries.length > 0 || symptoms.length > 0 
                  ? new Date(Math.max(
                      moodEntries.length > 0 ? new Date(moodEntries[0].date).getTime() : 0,
                      symptoms.length > 0 ? new Date(symptoms[0].date).getTime() : 0
                    )).toLocaleDateString()
                  : 'N/A'
                }
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-5 border-t-4 border-purple-400">
          <div className="flex items-center mb-3">
            <div className="bg-purple-100 p-2 rounded-lg mr-3">
              <BarChart2 className="text-purple-500" size={20} />
            </div>
            <h3 className="text-gray-700 font-medium">Mood Insights</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Most frequent mood:</span>
              <span className="font-medium capitalize">{mostFrequentMood || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Average intensity:</span>
              <span className="font-medium">{averageMoodIntensity} / 5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Most common symptom:</span>
              <span className="font-medium">{mostCommonSymptom}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-5 border-t-4 border-blue-400">
          <div className="flex items-center mb-3">
            <div className="bg-blue-100 p-2 rounded-lg mr-3">
              <RefreshCw className="text-blue-500" size={20} />
            </div>
            <h3 className="text-gray-700 font-medium">Trends</h3>
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Tracking streak:</span>
              <span className="font-medium">
                {moodEntries.length > 0 ? Math.min(moodEntries.length, 7) : 0} days
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Mood variability:</span>
              <span className="font-medium">
                {moodEntries.length < 3 
                  ? 'Need more data' 
                  : moodEntries.length > 5 && new Set(moodEntries.slice(0, 5).map(e => e.mood)).size > 3
                    ? 'High'
                    : 'Moderate'
                }
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <MascotAvatar 
              size="small" 
              currentMood={mostFrequentMood}
            />
          </div>
        </div>
      </div>
      
      {/* Mood timeline */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Emotional Journey</h2>
        <EmotionTimeline moodEntries={moodEntries} limit={10} />
      </div>
      
      {/* Encouragement card */}
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="md:flex-shrink-0">
          <MascotAvatar 
            size="medium"
            currentMood={moodEntries.length > 0 ? moodEntries[0].mood : 'happy'}
          />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Your Wellness Journey
          </h3>
          <p className="text-gray-700 mb-4">
            {getEncouragingMessage()}
          </p>
          <p className="text-sm text-pink-700">
            Remember, small steps in tracking lead to big insights about your health.
          </p>
        </div>
      </div>
    </div>
  );
};