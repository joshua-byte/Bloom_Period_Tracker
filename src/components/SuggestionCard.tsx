import React from 'react';
import { Suggestion } from '../types';

interface SuggestionCardProps {
  suggestion: Suggestion;
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({ suggestion }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-pink-100 transition-all hover:shadow-md">
      <div className="flex items-start">
        <div className="bg-pink-100 rounded-full w-10 h-10 flex items-center justify-center text-xl mr-3 shrink-0">
          <span role="img" aria-label="Suggestion emoji">
            {suggestion.emoji}
          </span>
        </div>
        <div>
          <h3 className="font-medium text-gray-800">{suggestion.title}</h3>
          <p className="text-gray-600 text-sm mt-1">{suggestion.description}</p>
        </div>
      </div>
    </div>
  );
};