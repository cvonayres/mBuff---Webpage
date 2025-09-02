import React, { useState } from 'react';
import { Hand, Plus, Minus } from 'lucide-react';
import { robotApi } from '../services/robotApi';

/**
 * Updated controls section for the mBuff web interface.
 *
 * This version wires up all of the on‑screen buttons to the
 * corresponding API endpoints exposed by `robotApi`.  In addition
 * to moving the robot forward, back, left and right and stopping it,
 * users can now adjust the speed via the ± buttons which call
 * `/api/move/speedup` and `/api/move/speeddown`, and rotate the
 * robot using the four corner buttons mapped to the new rotation
 * endpoints (`/api/rotate/topleft`, `/api/rotate/topright`,
 * `/api/rotate/bottomleft`, `/api/rotate/bottomright`).
 */
export const ControlsSection: React.FC = () => {
  // Track which control is currently active to provide visual feedback.
  const [activeControl, setActiveControl] = useState<string | null>(null);
  // Track the current speed value (range 1–10).  The UI displays this
  // value but it does not affect the API calls since the backend
  // maintains its own speed state.
  const [speed, setSpeed] = useState<number>(5);

  /**
   * Generic handler for invoking robot actions.  This helper will set
   * `activeControl` while the API call is in flight to highlight the
   * button being pressed.  After the call resolves the highlight is
   * removed automatically after a short delay.
   */
  const handleControl = async (
    control: string,
    apiCall: () => Promise<any>
  ) => {
    setActiveControl(control);
    try {
      await apiCall();
    } catch (error) {
      console.error(`Failed to execute ${control}:`, error);
    } finally {
      // Remove highlight after 200 ms
      setTimeout(() => setActiveControl(null), 200);
    }
  };

  /**
   * Adjust the speed up or down.  This handler updates local state
   * immediately and then makes a corresponding API call.  When the
   * delta is positive the robot speeds up; when negative it slows
   * down.
   */
  const handleSpeedChange = async (delta: number) => {
    const newSpeed = Math.max(1, Math.min(10, speed + delta));
    setSpeed(newSpeed);
    try {
      if (delta > 0) {
        await robotApi.speedUp();
        setActiveControl('speed-up');
      } else {
        await robotApi.speedDown();
        setActiveControl('speed-down');
      }
    } catch (error) {
      console.error('Failed to change speed:', error);
    } finally {
      // remove highlight after delay
      setTimeout(() => setActiveControl(null), 200);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-6 space-y-6">
      <h2 className="text-2xl font-bold">Robot Controls</h2>

      {/* Speed controls */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => handleSpeedChange(-1)}
          className={`w-12 h-12 rounded-full flex items-center justify-center bg-pink-200 hover:bg-pink-300 transition-all duration-200 ${activeControl === 'speed-down' ? 'scale-110 bg-pink-400' : ''}`}
          aria-label="Decrease speed"
        >
          <Minus />
        </button>
        <div className="text-lg font-medium">Speed: {speed}</div>
        <button
          onClick={() => handleSpeedChange(1)}
          className={`w-12 h-12 rounded-full flex items-center justify-center bg-green-200 hover:bg-green-300 transition-all duration-200 ${activeControl === 'speed-up' ? 'scale-110 bg-green-400' : ''}`}
          aria-label="Increase speed"
        >
          <Plus />
        </button>
      </div>

      {/* Rotation controls */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleControl('rotate-top-left', robotApi.rotateTopLeft)}
          className={`w-16 h-16 rounded-full bg-pink-300 hover:bg-pink-400 flex items-center justify-center transition-all duration-200 ${activeControl === 'rotate-top-left' ? 'scale-110 bg-pink-400' : ''}`}
          aria-label="Rotate top left"
        >
          ↶
        </button>
        <button
          onClick={() => handleControl('rotate-top-right', robotApi.rotateTopRight)}
          className={`w-16 h-16 rounded-full bg-cyan-300 hover:bg-cyan-400 flex items-center justify-center transition-all duration-200 ${activeControl === 'rotate-top-right' ? 'scale-110 bg-cyan-400' : ''}`}
          aria-label="Rotate top right"
        >
          ↷
        </button>
        <button
          onClick={() => handleControl('rotate-bottom-left', robotApi.rotateBottomLeft)}
          className={`w-16 h-16 rounded-full bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center transition-all duration-200 ${activeControl === 'rotate-bottom-left' ? 'scale-110 bg-yellow-500' : ''}`}
          aria-label="Rotate bottom left"
        >
          ↷
        </button>
        <button
          onClick={() => handleControl('rotate-bottom-right', robotApi.rotateBottomRight)}
          className={`w-16 h-16 rounded-full bg-orange-300 hover:bg-orange-400 flex items-center justify-center transition-all duration-200 ${activeControl === 'rotate-bottom-right' ? 'scale-110 bg-orange-400' : ''}`}
          aria-label="Rotate bottom right"
        >
          ↶
        </button>
      </div>

      {/* Directional pad */}
      <div className="relative w-40 h-40 mt-4">
        {/* Forward */}
        <button
          onClick={() => handleControl('forward', robotApi.moveForward)}
          className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-blue-200 hover:bg-blue-300 flex items-center justify-center transition-all duration-200 ${activeControl === 'forward' ? 'bg-blue-300' : ''}`}
          aria-label="Move forward"
        >
          ↑
        </button>
        {/* Right */}
        <button
          onClick={() => handleControl('right', robotApi.moveRight)}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-blue-200 hover:bg-blue-300 flex items-center justify-center transition-all duration-200 ${activeControl === 'right' ? 'bg-blue-300' : ''}`}
          aria-label="Move right"
        >
          →
        </button>
        {/* Backward */}
        <button
          onClick={() => handleControl('backward', robotApi.moveBackward)}
          className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-blue-200 hover:bg-blue-300 flex items-center justify-center transition-all duration-200 ${activeControl === 'backward' ? 'bg-blue-300' : ''}`}
          aria-label="Move backward"
        >
          ↓
        </button>
        {/* Left */}
        <button
          onClick={() => handleControl('left', robotApi.moveLeft)}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-blue-200 hover:bg-blue-300 flex items-center justify-center transition-all duration-200 ${activeControl === 'left' ? 'bg-blue-300' : ''}`}
          aria-label="Move left"
        >
          ←
        </button>
        {/* Stop button in the center */}
        <button
          onClick={() => handleControl('stop', robotApi.stop)}
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-red-300 hover:bg-red-400 flex flex-col items-center justify-center transition-all duration-200 ${activeControl === 'stop' ? 'bg-red-400' : ''}`}
          aria-label="Stop"
        >
          <Hand className="w-6 h-6" />
          <span className="text-xs font-bold">STOP</span>
        </button>
      </div>
    </div>
  );
};