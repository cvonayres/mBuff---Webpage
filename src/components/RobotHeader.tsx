import React from 'react';
import { Bot, Wifi, WifiOff, Battery } from 'lucide-react';

interface RobotHeaderProps {
  isConnected: boolean;
  batteryLevel?: number;
}

export const RobotHeader: React.FC<RobotHeaderProps> = ({ isConnected, batteryLevel }) => {
  return (
    <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 p-6 rounded-t-3xl shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-white p-3 rounded-full shadow-md">
            <Bot className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">mBuff</h1>
            <p className="text-white/80 text-sm">Your Friendly Robot</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {batteryLevel !== undefined && (
            <div className="flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-full">
              <Battery className="w-5 h-5 text-white" />
              <span className="text-white font-medium">{batteryLevel}%</span>
            </div>
          )}
          
          <div className="flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-full">
            {isConnected ? (
              <>
                <Wifi className="w-5 h-5 text-green-300" />
                <span className="text-white font-medium">Connected</span>
              </>
            ) : (
              <>
                <WifiOff className="w-5 h-5 text-red-300" />
                <span className="text-white font-medium">Disconnected</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};