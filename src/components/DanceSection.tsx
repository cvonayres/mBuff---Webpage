import React from 'react';
import { Music } from 'lucide-react';
import { DANCE_MOVES, SONGS } from '../config/robot';
import { robotApi } from '../services/robotApi';

export const DanceSection: React.FC = () => {
  const handleDance = async (danceId: number) => {
    try {
      await robotApi.dance(danceId);
    } catch (error) {
      console.error('Failed to execute dance:', error);
    }
  };

  const handleSong = async (songId: number) => {
    try {
      await robotApi.playSong(songId);
    } catch (error) {
      console.error('Failed to play song:', error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-full">
      <div className="flex items-center space-x-2 mb-4">
        <Music className="w-6 h-6 text-pink-500" />
        <h2 className="text-xl font-bold text-gray-800">Dance & Songs</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">🕺 Dance Moves</h3>
          <div className="grid grid-cols-2 gap-2">
            {DANCE_MOVES.map((dance) => (
              <button
                key={dance.id}
                onClick={() => handleDance(dance.id)}
                className={`${dance.color} p-3 rounded-xl border-2 border-transparent hover:border-white transition-all duration-200 transform hover:scale-105 shadow-md`}
              >
                <div className="text-2xl mb-1">{dance.emoji}</div>
                <div className="text-sm font-medium text-gray-700">{dance.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">🎵 Songs</h3>
          <div className="grid grid-cols-2 gap-2">
            {SONGS.map((song) => (
              <button
                key={song.id}
                onClick={() => handleSong(song.id)}
                className={`${song.color} p-3 rounded-xl border-2 border-transparent hover:border-white transition-all duration-200 transform hover:scale-105 shadow-md`}
              >
                <div className="text-2xl mb-1">{song.emoji}</div>
                <div className="text-sm font-medium text-gray-700">{song.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};