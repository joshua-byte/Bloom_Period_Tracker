import React, { useMemo } from 'react';
import { MoodType } from '../types';

interface MascotAvatarProps {
  currentMood?: MoodType;
  size?: 'small' | 'medium' | 'large';
  withMessage?: boolean;
  customMessage?: string;
}

export const MascotAvatar: React.FC<MascotAvatarProps> = ({ 
  currentMood, 
  size = 'medium',
  withMessage = false,
  customMessage
}) => {
  const sizeClasses = useMemo(() => {
    switch (size) {
      case 'small': return 'w-12 h-12';
      case 'large': return 'w-28 h-28';
      default: return 'w-20 h-20';
    }
  }, [size]);
  
  const { bgColor, expression, defaultMessage } = useMemo(() => {
    switch (currentMood) {
      case 'happy':
        return {
          bgColor: 'bg-yellow-100 border-yellow-300',
          expression: '😊',
          defaultMessage: "I'm glad you're feeling good today!"
        };
      case 'calm':
        return {
          bgColor: 'bg-blue-100 border-blue-300',
          expression: '😌',
          defaultMessage: 'Taking it easy today? That\'s wonderful.'
        };
      case 'sad':
        return {
          bgColor: 'bg-indigo-100 border-indigo-300',
          expression: '🥺',
          defaultMessage: 'It\'s okay to feel down. I\'m here for you.'
        };
      case 'anxious':
        return {
          bgColor: 'bg-purple-100 border-purple-300',
          expression: '😰',
          defaultMessage: 'Deep breaths. You\'re doing great.'
        };
      case 'angry':
        return {
          bgColor: 'bg-red-100 border-red-300',
          expression: '😤',
          defaultMessage: 'Your feelings are valid. Let\'s work through this.'
        };
      case 'tired':
        return {
          bgColor: 'bg-gray-100 border-gray-300',
          expression: '😴',
          defaultMessage: 'Rest is important. Take care of yourself today.'
        };
      default:
        return {
          bgColor: 'bg-bloom-100 border-bloom-300',
          expression: '👋',
          defaultMessage: 'Hi there! How are you feeling today?'
        };
    }
  }, [currentMood]);
  
  const message = customMessage || defaultMessage;
  
  return (
    <div className="flex items-center animate-slide-up">
      <div 
        className={`${bgColor} ${sizeClasses} rounded-full flex items-center justify-center 
                    border-2 shadow-lg transition-all duration-500 animate-float 
                    hover:scale-110 hover:shadow-xl relative z-10`}
      >
        <span className="text-2xl transform transition-transform duration-300 hover:scale-125" 
              role="img" 
              aria-label={`Mascot feeling ${currentMood || 'neutral'}`}>
          {expression}
        </span>
        
        <div className="absolute w-full h-full rounded-full bg-transparent overflow-hidden">
          <div className="absolute w-2 h-2 bg-black rounded-full top-[40%] left-[35%] animate-pulse-soft"></div>
          <div className="absolute w-2 h-2 bg-black rounded-full top-[40%] right-[35%] animate-pulse-soft"></div>
        </div>
      </div>
      
      {withMessage && (
        <div className="relative ml-4 max-w-xs animate-fade-in">
          <div className="absolute left-0 top-1/2 transform -translate-x-2 -translate-y-1/2 rotate-45 w-4 h-4 bg-white"></div>
          <div className="card p-4 relative z-20">
            <p className="text-gray-700 text-sm md:text-base">{message}</p>
          </div>
        </div>
      )}
    </div>
  );
};