import React, { useState } from 'react';
import { Hand, Gamepad2, Plus, Minus } from 'lucide-react';
import { robotApi } from '../services/robotApi';

export const ControlsSection: React.FC = () => {
  const [activeControl, setActiveControl] = useState<string | null>(null);
  const [speed, setSpeed] = useState(5);

  const handleControl = async (action: string, apiCall: () => Promise<any>) => {
    setActiveControl(action);
    try {
      await apiCall();
    } catch (error) {
      console.error(`Failed to execute ${action}:`, error);
    } finally {
      setTimeout(() => setActiveControl(null), 200);
    }
  };

  const handleSpeedChange = (delta: number) => {
    setSpeed(prev => Math.max(1, Math.min(10, prev + delta)));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-full flex flex-col">
      <div className="flex items-center space-x-2 mb-6">
        <Gamepad2 className="w-6 h-6 text-purple-500" />
        <h2 className="text-xl font-bold text-gray-800">Robot Controls</h2>
      </div>
      
      {/* Main Control Container - Centered */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative">
          
          {/* Speed Control Antennas - Moved higher up */}
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 flex items-center space-x-20">
            {/* Left Antenna (-) */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => handleSpeedChange(-1)}
                className="w-12 h-12 bg-pink-200 hover:bg-pink-300 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <Minus className="w-6 h-6 text-pink-700" />
              </button>
            </div>
            
            {/* Right Antenna (+) */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => handleSpeedChange(1)}
                className="w-12 h-12 bg-green-200 hover:bg-green-300 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <Plus className="w-6 h-6 text-green-700" />
              </button>
            </div>
          </div>

          {/* Corner Spin Circles - Z-Index 5 (lowest) */}
          {/* Top-Left Spin */}
          <button
            onClick={() => handleControl('spin-left', robotApi.spinLeft)}
            className={`absolute -top-2 -left-2 w-20 h-20 bg-pink-300 hover:bg-pink-400 rounded-full shadow-md z-5 transition-all duration-200 transform hover:scale-105 ${
              activeControl === 'spin-left' ? 'scale-110 bg-pink-400' : ''
            }`}
          >
            <span className="absolute top-2 left-4 text-lg">↶</span>
          </button>
          
          {/* Top-Right Spin */}
          <button
            onClick={() => handleControl('spin-right', robotApi.spinRight)}
            className={`absolute -top-2 -right-2 w-20 h-20 bg-cyan-300 hover:bg-cyan-400 rounded-full shadow-md z-5 transition-all duration-200 transform hover:scale-105 ${
              activeControl === 'spin-right' ? 'scale-110 bg-cyan-400' : ''
            }`}
          >
            <span className="absolute top-2 right-4 text-lg">↷</span>
          </button>
          
          {/* Bottom-Left Spin */}
          <button
            onClick={() => handleControl('spin-back-left', robotApi.spinBackLeft)}
            className={`absolute -bottom-2 -left-2 w-20 h-20 bg-yellow-400 hover:bg-yellow-500 rounded-full shadow-md z-5 transition-all duration-200 transform hover:scale-105 ${
              activeControl === 'spin-back-left' ? 'scale-110 bg-yellow-500' : ''
            }`}
          >
            <span className="absolute bottom-2 left-4 text-lg rotate-180">↷</span>
          </button>
          
          {/* Bottom-Right Spin */}
          <button
            onClick={() => handleControl('spin-back-right', robotApi.spinBackRight)}
            className={`absolute -bottom-2 -right-2 w-20 h-20 bg-orange-300 hover:bg-orange-400 rounded-full shadow-md z-5 transition-all duration-200 transform hover:scale-105 ${
              activeControl === 'spin-back-right' ? 'scale-110 bg-orange-400' : ''
            }`}
          >
            <span className="absolute bottom-2 right-4 text-lg rotate-180">↶</span>
          </button>

          {/* Direction Circle - Z-Index 10 (middle layer) */}
          <div className="w-48 h-48 rounded-full border-4 border-gray-300 bg-blue-100 relative z-10">
            {/* Divider Lines Rotated 45 degrees */}
            <div className="absolute left-1/2 top-0 w-0.5 h-full bg-gray-400 transform -translate-x-0.5 rotate-45 origin-center"></div>
            <div className="absolute left-1/2 top-0 w-0.5 h-full bg-gray-400 transform -translate-x-0.5 -rotate-45 origin-center"></div>
            
            {/* Kid-Friendly Direction Arrows */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-3xl">⬆️</div>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-3xl">➡️</div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-3xl">⬇️</div>
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-3xl">⬅️</div>
            
            {/* Invisible Direction Control Buttons */}
            {/* Forward Button */}
            <button
              onClick={() => handleControl('forward', robotApi.moveForward)}
              className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-transparent hover:bg-blue-200/30 transition-all duration-200 ${
                activeControl === 'forward' ? 'bg-blue-300/50' : ''
              }`}
              style={{ borderRadius: '50% 50% 0 0' }}
            />
            
            {/* Right Button */}
            <button
              onClick={() => handleControl('right', robotApi.moveRight)}
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-20 h-16 bg-transparent hover:bg-blue-200/30 transition-all duration-200 ${
                activeControl === 'right' ? 'bg-blue-300/50' : ''
              }`}
              style={{ borderRadius: '0 50% 50% 0' }}
            />
            
            {/* Backward Button */}
            <button
              onClick={() => handleControl('backward', robotApi.moveBackward)}
              className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-transparent hover:bg-blue-200/30 transition-all duration-200 ${
                activeControl === 'backward' ? 'bg-blue-300/50' : ''
              }`}
              style={{ borderRadius: '0 0 50% 50%' }}
            />
            
            {/* Left Button */}
            <button
              onClick={() => handleControl('left', robotApi.moveLeft)}
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-20 h-16 bg-transparent hover:bg-blue-200/30 transition-all duration-200 ${
                activeControl === 'left' ? 'bg-blue-300/50' : ''
              }`}
              style={{ borderRadius: '50% 0 0 50%' }}
            />
          </div>

          {/* Center STOP Button - Z-Index 20 (highest) */}
          <button
            onClick={() => handleControl('stop', robotApi.stop)}
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-red-300 hover:bg-red-400 rounded-full flex flex-col items-center justify-center shadow-lg border-2 border-red-400 z-20 transition-all duration-200 transform hover:scale-105 ${
              activeControl === 'stop' ? 'scale-110 bg-red-400' : ''
            }`}
          >
            <Hand className="w-6 h-6 text-red-700 mb-1" />
            <span className="text-xs font-bold text-red-700">STOP</span>
          </button>

          {/* Speed Display - Moved further down */}
          <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full">
              <span className="text-sm text-purple-700 font-medium">Speed:</span>
              <div className="flex space-x-1">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-3 rounded-full ${
                      i < speed ? 'bg-purple-500' : 'bg-purple-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-purple-700 font-bold">{speed}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-xs text-gray-500">
          🎮 Control mBuff with the joystick!
        </p>
      </div>
    </div>
  );
};