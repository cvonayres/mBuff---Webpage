import React from 'react';
import { MessageCircle } from 'lucide-react';
import { SAYINGS } from '../config/robot';
import { robotApi } from '../services/robotApi';

export const SayingsSection: React.FC = () => {
const handleSpeak = async (sayingId: number) => {
  try {
    await robotApi.say(sayingId);
  } catch (error) {
    console.error('Failed to say:', error);
  }
};
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-full">
      <div className="flex items-center space-x-2 mb-4">
        <MessageCircle className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-bold text-gray-800">What Should I Say?</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {SAYINGS.map((saying) => (
          <button
            key={saying.id}
            onClick={() => handleSpeak(saying.id)}
            className={`${saying.color} p-4 rounded-xl border-2 border-transparent hover:border-white transition-all duration-200 transform hover:scale-105 shadow-md text-left`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{saying.emoji}</span>
              <span className="font-medium text-gray-700">{saying.text}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};