import React from 'react';
import { Heart, Star, Sparkles } from 'lucide-react';

export const RobotFooter: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 p-4 rounded-b-3xl shadow-lg">
      <div className="flex items-center justify-center space-x-6">
        <div className="flex items-center space-x-2 text-white">
          <Heart className="w-5 h-5 text-red-300" />
          <span className="font-medium">Made with Love</span>
        </div>
        
        <div className="flex items-center space-x-2 text-white">
          <Star className="w-5 h-5 text-yellow-300" />
          <span className="font-medium">For Amazing Kids</span>
        </div>
        
        <div className="flex items-center space-x-2 text-white">
          <Sparkles className="w-5 h-5 text-cyan-300" />
          <span className="font-medium">Have Fun!</span>
        </div>
      </div>
      
      <div className="mt-2 text-center">
        <p className="text-white/80 text-sm">
          🤖 mBuff is ready to play! 🎉
        </p>
      </div>
    </div>
  );
};