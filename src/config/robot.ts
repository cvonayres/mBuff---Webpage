import { DanceMove, Song, Saying } from '../types/robot';

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_ROBOT_API_URL || 'http://localhost:5000';

// API Endpoints
export const ENDPOINTS = {
  // Movement controls
  MOVE_FORWARD: '/api/move/forward',
  MOVE_BACKWARD: '/api/move/backward',
  MOVE_LEFT: '/api/move/left',
  MOVE_RIGHT: '/api/move/right',
  STOP: '/api/move/stop',
  
  // Dance moves
  DANCE: '/api/dance',
  
  // Songs
  SONG: '/api/song',
  
  // Sayings
  SPEAK: '/api/speak',
  
  // Camera
  CAMERA_FEED: '/api/camera/feed',
  
  // Status
  STATUS: '/api/status'
};

// Dance moves configuration
export const DANCE_MOVES: DanceMove[] = [
  { id: 1, name: 'Wiggle Dance', emoji: '🕺', color: 'bg-pink-200 hover:bg-pink-300' },
  { id: 2, name: 'Spin Move', emoji: '🌪️', color: 'bg-purple-200 hover:bg-purple-300' },
  { id: 3, name: 'Happy Bounce', emoji: '🦘', color: 'bg-blue-200 hover:bg-blue-300' },
  { id: 4, name: 'Robot Shuffle', emoji: '🤖', color: 'bg-green-200 hover:bg-green-300' }
];

// Songs configuration
export const SONGS: Song[] = [
  { id: 1, name: 'Happy Song', emoji: '🎵', color: 'bg-yellow-200 hover:bg-yellow-300' },
  { id: 2, name: 'Robot Beeps', emoji: '🎶', color: 'bg-cyan-200 hover:bg-cyan-300' },
  { id: 3, name: 'Fun Tune', emoji: '🎼', color: 'bg-rose-200 hover:bg-rose-300' },
  { id: 4, name: 'Dance Beat', emoji: '🎤', color: 'bg-indigo-200 hover:bg-indigo-300' }
];

// Sayings configuration
export const SAYINGS: Saying[] = [
  { id: 1, text: 'Hello Friend!', emoji: '👋', color: 'bg-emerald-200 hover:bg-emerald-300' },
  { id: 2, text: 'I am mBuff!', emoji: '🤖', color: 'bg-teal-200 hover:bg-teal-300' },
  { id: 3, text: 'Let\'s play!', emoji: '🎮', color: 'bg-orange-200 hover:bg-orange-300' },
  { id: 4, text: 'You are awesome!', emoji: '⭐', color: 'bg-violet-200 hover:bg-violet-300' },
  { id: 5, text: 'Time to dance!', emoji: '💃', color: 'bg-fuchsia-200 hover:bg-fuchsia-300' },
  { id: 6, text: 'Beep boop!', emoji: '🔊', color: 'bg-lime-200 hover:bg-lime-300' }
];