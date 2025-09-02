import React from "react";
import { RobotHeader } from "./components/RobotHeader";
import { DanceSection } from "./components/DanceSection";
import { SayingsSection } from "./components/SayingsSection";
import { CameraFeed } from "./components/CameraFeed";
import { ControlsSection } from "./components/ControlsSection";
import { RobotFooter } from "./components/RobotFooter";
import { useRobotStatus } from "./hooks/useRobotStatus";
import SenseHatPainter from "./components/SenseHatPainter";
import { robotApi } from "./services/robotApi";

function App() {
  const robotStatus = useRobotStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-visible">
          <RobotHeader
            isConnected={robotStatus.connected}
            batteryLevel={robotStatus.battery}
          />

          <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 pb-28">
            <div className="lg:col-span-1">
              <DanceSection />
            </div>

            <div className="lg:col-span-1">
              <SayingsSection />
            </div>

            <div className="space-y-6 lg:col-span-1">
              <CameraFeed size="sm" />
              <SenseHatPainter
                title="Sense HAT LED Painter (8×8)"
                onSend={robotApi.sendSenseHatPixels}
              />
            </div>

            <div className="lg:col-span-1">
              <ControlsSection />
            </div>
          </div>

          <RobotFooter />
        </div>
      </div>
    </div>
  );
}

export default App;
