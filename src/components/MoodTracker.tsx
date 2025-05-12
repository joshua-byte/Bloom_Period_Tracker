import React, { useState } from 'react';
import { MoodType, MoodEntry } from '../types';
import { MascotAvatar } from './MascotAvatar';

interface MoodTrackerProps {
  onMoodSelect: (entry: MoodEntry) => void;
}

export const MoodTracker: React.FC<MoodTrackerProps> = ({ onMoodSelect }) => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [intensity, setIntensity] = useState<number>(3);
  const [notes, setNotes] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  
  const moods: {type: MoodType, emoji: string, label: string, color: string}[] = [
    { type: 'happy', emoji: '😊', label: 'Happy', color: 'bg-yellow-100 hover:bg-yellow-200 border-yellow-300' },
    { type: 'calm', emoji: '😌', label: 'Calm', color: 'bg-blue-100 hover:bg-blue-200 border-blue-300' },
    { type: 'sad', emoji: '😢', label: 'Sad', color: 'bg-indigo-100 hover:bg-indigo-200 border-indigo-300' },
    { type: 'anxious', emoji: '😰', label: 'Anxious', color: 'bg-purple-100 hover:bg-purple-200 border-purple-300' },
    { type: 'angry', emoji: '😠', label: 'Angry', color: 'bg-red-100 hover:bg-red-200 border-red-300' },
    { type: 'tired', emoji: '😴', label: 'Tired', color: 'bg-gray-100 hover:bg-gray-200 border-gray-300' },
  ];
  
  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    // Auto scroll to intensity section
    document.getElementById('intensity-section')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSubmit = () => {
    if (!selectedMood) return;
    
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      mood: selectedMood,
      intensity,
      notes: notes.trim() || undefined
    };
    
    onMoodSelect(newEntry);
    setShowConfirmation(true);
    
    // Reset form after delay
    setTimeout(() => {
      setSelectedMood(null);
      setIntensity(3);
      setNotes('');
      setShowConfirmation(false);
    }, 3000);
  };
  
  // Get supportive message based on mood
  const getSupportiveMessage = () => {
    if (!selectedMood) return '';
    
    const messages = {
      happy: 'It\'s wonderful that you\'re feeling good today!',
      calm: 'Calm is a beautiful state of mind. Enjoy this peaceful energy.',
      sad: 'It\'s perfectly okay to feel sad. Your emotions are valid, and this will pass.',
      anxious: 'Anxiety can be tough, but remember to breathe. You\'ve got this.',
      angry: 'Anger is a natural response. Take some time for yourself to process.',
      tired: 'Rest is essential. Listen to your body and be gentle with yourself today.'
    };
    
    return messages[selectedMood];
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-lg mx-auto transition-all">
      {showConfirmation ? (
        <div className="py-8 flex flex-col items-center animate-fade-in">
          <div className="text-green-500 mb-4 text-5xl">✓</div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">Mood Logged!</h3>
          <p className="text-gray-600 text-center mb-4">Thanks for sharing how you\'re feeling today.</p>
          <MascotAvatar 
            currentMood={selectedMood}
            withMessage
            customMessage="I\'ll remember that. Thanks for sharing!"
          />
        </div>
      ) : (
        <>
          <h2 className="text-xl font-medium text-gray-800 mb-6">How are you feeling today?</h2>
          
          <div className="grid grid-cols-3 gap-3 mb-8">
            {moods.map(({ type, emoji, label, color }) => (
              <button
                key={type}
                onClick={() => handleMoodSelect(type)}
                className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                  selectedMood === type
                    ? `${color} border-2 scale-105 shadow-md`
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <span className="text-2xl mb-1">{emoji}</span>
                <span className={`text-sm font-medium ${selectedMood === type ? 'text-gray-800' : 'text-gray-600'}`}>
                  {label}
                </span>
              </button>
            ))}
          </div>
          
          {selectedMood && (
            <div className="animate-fade-in">
              <div id="intensity-section" className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How intense is this feeling? (1-5)
                </label>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Mild</span>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={intensity}
                    onChange={(e) => setIntensity(parseInt(e.target.value))}
                    className="w-full mx-2 accent-pink-500"
                  />
                  <span className="text-xs text-gray-500">Strong</span>
                </div>
                <div className="flex justify-between px-1 mt-1">
                  {[1, 2, 3, 4, 5].map(num => (
                    <span 
                      key={num} 
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        intensity === num ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Any notes about how you\'re feeling? (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="What might be influencing how you feel today?"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  rows={3}
                />
              </div>
              
              <div className="p-4 bg-pink-50 rounded-lg mb-6 border border-pink-100">
                <p className="text-pink-800 text-sm">{getSupportiveMessage()}</p>
              </div>
              
              <button
                onClick={handleSubmit}
                className="w-full py-3 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors"
              >
                Log This Mood
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};