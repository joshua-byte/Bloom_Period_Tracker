import React, { useState } from 'react';
import { SymptomCategory, Symptom } from '../types';

interface SymptomTrackerProps {
  onSymptomAdd: (symptom: Symptom) => void;
}

export const SymptomTracker: React.FC<SymptomTrackerProps> = ({ onSymptomAdd }) => {
  const [selectedCategory, setSelectedCategory] = useState<SymptomCategory | null>(null);
  const [intensity, setIntensity] = useState<number>(3);
  const [notes, setNotes] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  
  const symptoms: {category: SymptomCategory, emoji: string, label: string, color: string}[] = [
    { category: 'cramps', emoji: '🌀', label: 'Cramps', color: 'bg-red-100 hover:bg-red-200 border-red-300' },
    { category: 'headache', emoji: '🤕', label: 'Headache', color: 'bg-purple-100 hover:bg-purple-200 border-purple-300' },
    { category: 'fatigue', emoji: '😩', label: 'Fatigue', color: 'bg-blue-100 hover:bg-blue-200 border-blue-300' },
    { category: 'bloating', emoji: '🎈', label: 'Bloating', color: 'bg-yellow-100 hover:bg-yellow-200 border-yellow-300' },
    { category: 'backPain', emoji: '🔙', label: 'Back Pain', color: 'bg-indigo-100 hover:bg-indigo-200 border-indigo-300' },
    { category: 'nausea', emoji: '🤢', label: 'Nausea', color: 'bg-green-100 hover:bg-green-200 border-green-300' },
    { category: 'other', emoji: '📝', label: 'Other', color: 'bg-gray-100 hover:bg-gray-200 border-gray-300' },
  ];
  
  const handleSymptomSelect = (category: SymptomCategory) => {
    setSelectedCategory(category);
    // Auto scroll to intensity section
    document.getElementById('symptom-intensity-section')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSubmit = () => {
    if (!selectedCategory) return;
    
    const newSymptom: Symptom = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      category: selectedCategory,
      intensity,
      notes: notes.trim() || undefined
    };
    
    onSymptomAdd(newSymptom);
    setShowConfirmation(true);
    
    // Reset form after delay
    setTimeout(() => {
      setSelectedCategory(null);
      setIntensity(3);
      setNotes('');
      setShowConfirmation(false);
    }, 3000);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-lg mx-auto transition-all">
      {showConfirmation ? (
        <div className="py-8 flex flex-col items-center animate-fade-in">
          <div className="text-green-500 mb-4 text-5xl">✓</div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">Symptom Logged!</h3>
          <p className="text-gray-600 text-center">
            Taking note of your symptoms helps us provide better care suggestions.
          </p>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-medium text-gray-800 mb-6">Track Your Symptoms</h2>
          
          <div className="grid grid-cols-3 gap-3 mb-8">
            {symptoms.map(({ category, emoji, label, color }) => (
              <button
                key={category}
                onClick={() => handleSymptomSelect(category)}
                className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                  selectedCategory === category
                    ? `${color} border-2 scale-105 shadow-md`
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <span className="text-2xl mb-1">{emoji}</span>
                <span className={`text-sm font-medium ${selectedCategory === category ? 'text-gray-800' : 'text-gray-600'}`}>
                  {label}
                </span>
              </button>
            ))}
          </div>
          
          {selectedCategory && (
            <div className="animate-fade-in">
              <div id="symptom-intensity-section" className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How intense is this symptom? (1-5)
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
                  <span className="text-xs text-gray-500">Severe</span>
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
                  Any additional notes? (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="When did it start? What makes it better or worse?"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  rows={3}
                />
              </div>
              
              {selectedCategory === 'cramps' && (
                <div className="p-4 bg-pink-50 rounded-lg mb-6 border border-pink-100">
                  <p className="text-pink-800 text-sm">
                    Cramping is common during menstruation. A heating pad or gentle stretching may help provide relief.
                  </p>
                </div>
              )}
              
              {selectedCategory === 'headache' && (
                <div className="p-4 bg-pink-50 rounded-lg mb-6 border border-pink-100">
                  <p className="text-pink-800 text-sm">
                    Headaches can be related to hormonal changes. Staying hydrated and resting in a dark room may help.
                  </p>
                </div>
              )}
              
              <button
                onClick={handleSubmit}
                className="w-full py-3 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors"
              >
                Log This Symptom
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};