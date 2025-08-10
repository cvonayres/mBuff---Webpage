import React from 'react';
import { RobotHeader } from './components/RobotHeader';
import { DanceSection } from './components/DanceSection';
import { SayingsSection } from './components/SayingsSection';
import { CameraFeed } from './components/CameraFeed';
import { ControlsSection } from './components/ControlsSection';
import { RobotFooter } from './components/RobotFooter';
import { useRobotStatus } from './hooks/useRobotStatus';

function App() {
  const robotStatus = useRobotStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <RobotHeader 
            isConnected={robotStatus.connected} 
            batteryLevel={robotStatus.battery}
          />
          
          {/* Main Content Grid */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column - Dance & Songs */}
            <div className="lg:col-span-1">
              <DanceSection />
            </div>
            
            {/* Left-Center Column - Sayings */}
            <div className="lg:col-span-1">
              <SayingsSection />
            </div>
            
            {/* Right-Center Column - Camera */}
            <div className="lg:col-span-1">
              <CameraFeed />
            </div>
            
            {/* Right Column - Controls */}
            <div className="lg:col-span-1">
              <ControlsSection />
            </div>
          </div>
          
          {/* Footer */}
          <RobotFooter />
        </div>
      </div>
    </div>
  );
}

export default App;
