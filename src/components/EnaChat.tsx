import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { MoodType, SymptomCategory } from '../types';

interface EnaChatProps {
  latestMood?: MoodType;
  symptoms?: SymptomCategory[];
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ena';
  timestamp: Date;
}

export const EnaChat: React.FC<EnaChatProps> = ({ latestMood, symptoms }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    // Initial greeting
    const initialMessage = {
      id: Date.now().toString(),
      text: getInitialGreeting(),
      sender: 'ena' as const,
      timestamp: new Date()
    };
    setMessages([initialMessage]);
  }, []);
  
  const getInitialGreeting = () => {
    if (latestMood) {
      return `Hi! I noticed you're feeling ${latestMood} today. Would you like to talk about it?`;
    }
    return "Hi! I'm Ena, your emotional wellness companion. How are you feeling today?";
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    try {
      const response = await fetch('https://lnkd.in/gY7a2JSE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: input,
          mood: latestMood,
          symptoms: symptoms
        })
      });
      
      const data = await response.json();
      
      setTimeout(() => {
        const enaResponse = {
          id: Date.now().toString(),
          text: data.response,
          sender: 'ena' as const,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, enaResponse]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching response:', error);
      setIsTyping(false);
    }
  };
  
  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-md">
      <div className="p-4 border-b border-gray-100 flex items-center">
        <div className="bg-teal-100 p-2 rounded-full mr-3">
          <MessageCircle className="text-teal-600" size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Chat with Ena</h2>
          <p className="text-sm text-gray-500">Your emotional wellness companion</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600 transition-colors"
            disabled={isTyping}
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};