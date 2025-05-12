import { MoodType, SymptomCategory, Suggestion } from '../types';

// Database of suggestions
const suggestionDatabase: Suggestion[] = [
  {
    id: '1',
    title: 'Warm Compress Relief',
    description: 'Apply a warm compress or heating pad to your lower abdomen to help ease cramping.',
    moodTriggers: ['sad', 'anxious'],
    symptomTriggers: ['cramps', 'backPain'],
    emoji: '🔥'
  },
  {
    id: '2',
    title: 'Gentle Yoga Session',
    description: 'Try some gentle yoga poses like child\'s pose or cat-cow to relieve tension and discomfort.',
    moodTriggers: ['anxious', 'tired', 'sad'],
    symptomTriggers: ['cramps', 'backPain', 'bloating'],
    emoji: '🧘‍♀️'
  },
  {
    id: '3',
    title: 'Mindful Breathing',
    description: 'Take 5 minutes for deep, slow breaths. Inhale for 4 counts, hold for 4, exhale for 6.',
    moodTriggers: ['anxious', 'angry'],
    symptomTriggers: [],
    emoji: '🌬️'
  },
  {
    id: '4',
    title: 'Hydration Reminder',
    description: 'Drinking plenty of water can help with bloating and headaches. Try adding some lemon for extra benefits.',
    moodTriggers: ['tired'],
    symptomTriggers: ['headache', 'bloating', 'nausea'],
    emoji: '💧'
  },
  {
    id: '5',
    title: 'Journal Your Feelings',
    description: 'Take a moment to write down your thoughts. It can help process emotions during this time.',
    moodTriggers: ['sad', 'angry', 'anxious'],
    symptomTriggers: [],
    emoji: '📔'
  },
  {
    id: '6',
    title: 'Gentle Movement',
    description: 'A short, gentle walk can help reduce cramping and improve your mood through endorphin release.',
    moodTriggers: ['sad', 'tired'],
    symptomTriggers: ['cramps', 'bloating'],
    emoji: '🚶‍♀️'
  },
  {
    id: '7',
    title: 'Herbal Tea Break',
    description: 'Chamomile or ginger tea can help with relaxation and nausea. Take a moment to enjoy a warm cup.',
    moodTriggers: ['anxious', 'tired'],
    symptomTriggers: ['nausea', 'cramps'],
    emoji: '☕'
  },
  {
    id: '8',
    title: 'Anti-Inflammatory Foods',
    description: 'Try adding foods rich in omega-3s like nuts, seeds, and fatty fish to your diet to help reduce inflammation.',
    moodTriggers: [],
    symptomTriggers: ['cramps', 'backPain', 'headache'],
    emoji: '🥑'
  },
  {
    id: '9',
    title: 'Connect with a Friend',
    description: 'Sometimes talking about how you\'re feeling with someone you trust can provide emotional relief.',
    moodTriggers: ['sad', 'anxious', 'angry'],
    symptomTriggers: [],
    emoji: '👭'
  },
  {
    id: '10',
    title: 'Epsom Salt Bath',
    description: 'A warm bath with Epsom salts can help relax muscles and ease period pain.',
    moodTriggers: ['tired'],
    symptomTriggers: ['cramps', 'backPain'],
    emoji: '🛁'
  },
  {
    id: '11',
    title: 'Celebrate Small Wins',
    description: 'You\'re doing great! Take a moment to acknowledge something positive in your day.',
    moodTriggers: ['happy', 'calm'],
    symptomTriggers: [],
    emoji: '🎉'
  },
  {
    id: '12',
    title: 'Magnesium-Rich Foods',
    description: 'Try adding bananas, dark chocolate, or nuts to your diet as magnesium can help with period symptoms.',
    moodTriggers: [],
    symptomTriggers: ['cramps', 'fatigue'],
    emoji: '🍫'
  },
];

/**
 * Gets personalized suggestions based on current mood and symptoms
 */
export const getSuggestions = (
  currentMood?: MoodType, 
  currentSymptoms?: SymptomCategory[],
  limit: number = 3
): Suggestion[] => {
  // If no mood or symptoms, return general suggestions
  if (!currentMood && (!currentSymptoms || currentSymptoms.length === 0)) {
    return suggestionDatabase.slice(0, limit);
  }
  
  // Score each suggestion based on relevance to current mood and symptoms
  const scoredSuggestions = suggestionDatabase.map(suggestion => {
    let score = 0;
    
    // Score mood match
    if (currentMood && suggestion.moodTriggers.includes(currentMood)) {
      score += 2;
    }
    
    // Score symptom matches
    if (currentSymptoms && currentSymptoms.length > 0) {
      currentSymptoms.forEach(symptom => {
        if (suggestion.symptomTriggers.includes(symptom)) {
          score += 1;
        }
      });
    }
    
    return { suggestion, score };
  });
  
  // Sort by score (highest first) and take the top 'limit' suggestions
  return scoredSuggestions
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.suggestion);
};

/**
 * Gets a supportive message based on current mood
 */
export const getSupportiveMessage = (currentMood?: MoodType): string => {
  if (!currentMood) {
    return 'How are you feeling today? Your emotions matter.';
  }
  
  const messages: Record<MoodType, string[]> = {
    happy: [
      'It\'s wonderful to see you feeling good today!',
      'Your positive energy is something to celebrate.',
      'Happiness looks great on you! Enjoy this feeling.'
    ],
    calm: [
      'Embracing calm moments is so important for wellbeing.',
      'This peaceful energy is something to cherish.',
      'Taking time to find your center is self-care at its best.'
    ],
    sad: [
      'It\'s okay to feel down. Your feelings are valid and temporary.',
      'Be gentle with yourself today. Sadness is part of being human.',
      'I\'m here with you through the tough moments.'
    ],
    anxious: [
      'Anxiety is challenging, but you have the strength to move through it.',
      'Remember to breathe. This feeling will pass.',
      'Your worries are valid, but they don\'t define you.'
    ],
    angry: [
      'It\'s natural to feel frustrated. Your feelings deserve space.',
      'Anger often signals something important to us. Listen to what it\'s telling you.',
      'Take the time you need to process these feelings.'
    ],
    tired: [
      'Rest is essential, especially during your cycle. Listen to your body.',
      'It\'s okay to slow down and take care of yourself.',
      'Your body is working hard. Honor what it needs today.'
    ]
  };
  
  // Return a random message from the appropriate mood category
  const moodMessages = messages[currentMood];
  const randomIndex = Math.floor(Math.random() * moodMessages.length);
  return moodMessages[randomIndex];
};
