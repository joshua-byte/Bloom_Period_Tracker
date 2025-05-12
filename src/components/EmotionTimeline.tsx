import React from 'react';
import { MoodEntry } from '../types';

interface EmotionTimelineProps {
  moodEntries: MoodEntry[];
  limit?: number;
}

export const EmotionTimeline: React.FC<EmotionTimelineProps> = ({ 
  moodEntries, 
  limit = 10 
}) => {
  // Get the entries to display (limited by the limit prop)
  const displayEntries = moodEntries.slice(0, limit);
  
  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };
  
  // Helper function to get emoji for mood
  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'happy': return '😊';
      case 'calm': return '😌';
      case 'sad': return '😢';
      case 'anxious': return '😰';
      case 'angry': return '😠';
      case 'tired': return '😴';
      default: return '😐';
    }
  };
  
  // Helper function to get color for mood
  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'happy': return 'bg-yellow-100 border-yellow-300';
      case 'calm': return 'bg-blue-100 border-blue-300';
      case 'sad': return 'bg-indigo-100 border-indigo-300';
      case 'anxious': return 'bg-purple-100 border-purple-300';
      case 'angry': return 'bg-red-100 border-red-300';
      case 'tired': return 'bg-gray-100 border-gray-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };
  
  if (displayEntries.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-100">
        <p className="text-gray-500">No mood entries yet. Start tracking to see your emotional timeline!</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Your Recent Moods</h3>
      
      <div className="space-y-4">
        {displayEntries.map((entry) => (
          <div 
            key={entry.id} 
            className="flex items-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${getMoodColor(entry.mood)}`}>
              <span className="text-xl">{getMoodEmoji(entry.mood)}</span>
            </div>
            
            <div className="ml-3 flex-1">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800 capitalize">{entry.mood}</span>
                <span className="text-xs text-gray-500">{formatDate(entry.date)}</span>
              </div>
              
              <div className="mt-1 flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-pink-500 h-1.5 rounded-full" 
                    style={{ width: `${(entry.intensity / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-xs text-gray-500">
                  {entry.intensity}/5
                </span>
              </div>
              
              {entry.notes && (
                <p className="text-sm text-gray-600 mt-2 italic">"{entry.notes}"</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
