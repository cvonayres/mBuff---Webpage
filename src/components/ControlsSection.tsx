import React, { useState } from 'react';
import { Hand, Gamepad2, Plus, Minus } from 'lucide-react';
import { robotApi } from '../services/robotApi';

export const ControlsSection: React.FC = () => {
  const [activeControl, setActiveControl] = useState<string | null>(null);
  const [speed, setSpeed] = useState(5);

  const handleControl = async (action: string, apiCall: () => Promise<any>) => {
    setActiveControl(action);
    try { await apiCall(); } catch (e) { console.error(action, e); }
    finally { setTimeout(() => setActiveControl(null), 200); }
  };

  const bumpSpeed = async (delta: number) => {
    setSpeed(prev => Math.max(1, Math.min(10, prev + delta)));
    if (delta > 0) await handleControl('speed-up', robotApi.speedUp);
    else await handleControl('speed-down', robotApi.speedDown);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-full flex flex-col">
      <div className="flex items-center space-x-2 mb-6">
        <Gamepad2 className="w-6 h-6 text-purple-500" />
        <h2 className="text-xl font-bold text-gray-800">Robot Controls</h2>
      </div>

      <div className="flex-1 flex items-center justify-center">
        {/* isolated stacking context */}
        <div className="relative isolate">

          {/* CORNERS (z-0) */}
          {/* Top-Left: rotate */}
          <button
            onClick={() => handleControl('rotate-top-left', robotApi.rotateTopLeft)}
            className={`absolute -top-2 -left-2 w-20 h-20 bg-pink-300 hover:bg-pink-400 rounded-full shadow-md z-0 transition-all hover:scale-105 ${
              activeControl === 'rotate-top-left' ? 'scale-110 bg-pink-400' : ''
            }`}
            aria-label="Rotate top left"
          >
            <span className="absolute top-2 left-4 text-lg pointer-events-none">↶</span>
          </button>

          {/* Top-Right: rotate */}
          <button
            onClick={() => handleControl('rotate-top-right', robotApi.rotateTopRight)}
            className={`absolute -top-2 -right-2 w-20 h-20 bg-cyan-300 hover:bg-cyan-400 rounded-full shadow-md z-0 transition-all hover:scale-105 ${
              activeControl === 'rotate-top-right' ? 'scale-110 bg-cyan-400' : ''
            }`}
            aria-label="Rotate top right"
          >
            <span className="absolute top-2 right-4 text-lg pointer-events-none">↷</span>
          </button>
          
          {/* Bottom-Left: SPEED DOWN */}
          <button
            onClick={() => bumpSpeed(-1)}
            className={`absolute -bottom-2 -left-2 w-20 h-20 bg-yellow-400 hover:bg-yellow-500 rounded-full shadow-md z-0 transition-all hover:scale-105 ${
              activeControl === 'speed-down' ? 'scale-110 bg-yellow-500' : ''
            }`}
            aria-label="Speed down"
            title="Speed down"
          >
            {/* push icon to the visible outer corner */}
            <Minus className="absolute left-3 bottom-3 w-7 h-7 text-gray-900 pointer-events-none drop-shadow" />
          </button>

          {/* Bottom-Right: SPEED UP */}
          <button
            onClick={() => bumpSpeed(1)}
            className={`absolute -bottom-2 -right-2 w-20 h-20 bg-orange-300 hover:bg-orange-400 rounded-full shadow-md z-0 transition-all hover:scale-105 ${
              activeControl === 'speed-up' ? 'scale-110 bg-orange-400' : ''
            }`}
            aria-label="Speed up"
            title="Speed up"
          >
            {/* push icon to the visible outer corner */}
            <Plus className="absolute right-3 bottom-3 w-7 h-7 text-gray-900 pointer-events-none drop-shadow" />
          </button>

          {/* D-PAD CIRCLE (z-10) */}
          <div className="w-48 h-48 rounded-full border-4 border-gray-300 bg-blue-100 relative z-10">
            <div className="absolute left-1/2 top-0 w-0.5 h-full bg-gray-400 -translate-x-0.5 rotate-45 origin-center pointer-events-none"></div>
            <div className="absolute left-1/2 top-0 w-0.5 h-full bg-gray-400 -translate-x-0.5 -rotate-45 origin-center pointer-events-none"></div>

            {/* labels */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-3xl pointer-events-none select-none">⬆️</div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-3xl pointer-events-none select-none">➡️</div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-3xl pointer-events-none select-none">⬇️</div>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-3xl pointer-events-none select-none">⬅️</div>

            {/* hitboxes (z-20) */}
            <button
              onClick={() => handleControl('forward', robotApi.moveForward)}
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-16 h-20 bg-transparent hover:bg-blue-200/30 z-20 ${
                activeControl === 'forward' ? 'bg-blue-300/50' : ''
              }`}
              style={{ borderRadius: '50% 50% 0 0' }}
              aria-label="Move forward"
            />
            <button
              onClick={() => handleControl('right', robotApi.moveRight)}
              className={`absolute right-0 top-1/2 -translate-y-1/2 w-20 h-16 bg-transparent hover:bg-blue-200/30 z-20 ${
                activeControl === 'right' ? 'bg-blue-300/50' : ''
              }`}
              style={{ borderRadius: '0 50% 50% 0' }}
              aria-label="Move right"
            />
            <button
              onClick={() => handleControl('backward', robotApi.moveBackward)}
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-20 bg-transparent hover:bg-blue-200/30 z-20 ${
                activeControl === 'backward' ? 'bg-blue-300/50' : ''
              }`}
              style={{ borderRadius: '0 0 50% 50%' }}
              aria-label="Move backward"
            />
            <button
              onClick={() => handleControl('left', robotApi.moveLeft)}
              className={`absolute left-0 top-1/2 -translate-y-1/2 w-20 h-16 bg-transparent hover:bg-blue-200/30 z-20 ${
                activeControl === 'left' ? 'bg-blue-300/50' : ''
              }`}
              style={{ borderRadius: '50% 0 0 50%' }}
              aria-label="Move left"
            />
          </div>

          {/* STOP (z-30) */}
          <button
            onClick={() => handleControl('stop', robotApi.stop)}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-red-300 hover:bg-red-400 rounded-full flex flex-col items-center justify-center shadow-lg border-2 border-red-400 z-30 transition-all hover:scale-105 ${
              activeControl === 'stop' ? 'scale-110 bg-red-400' : ''
            }`}
            aria-label="Stop"
          >
            <Hand className="w-6 h-6 text-red-700 mb-1" />
            <span className="text-xs font-bold text-red-700">STOP</span>
          </button>

          {/* SPEED BAR */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2">
            <div className="flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full">
              <span className="text-sm text-purple-700 font-medium">Speed:</span>
              <div className="flex space-x-1">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className={`w-1.5 h-3 rounded-full ${i < speed ? 'bg-purple-500' : 'bg-purple-200'}`} />
                ))}
              </div>
              <span className="text-xs text-purple-700 font-bold">{speed}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
