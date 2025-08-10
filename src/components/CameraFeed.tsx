import React, { useState, useEffect } from 'react';
import { Camera, CameraOff } from 'lucide-react';
import { robotApi } from '../services/robotApi';

export const CameraFeed: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const cameraUrl = robotApi.getCameraFeedUrl();

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-full">
      <div className="flex items-center space-x-2 mb-4">
        <Camera className="w-6 h-6 text-green-500" />
        <h2 className="text-xl font-bold text-gray-800">Camera View</h2>
      </div>
      
      <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-video">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        )}
        
        {hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
            <CameraOff className="w-12 h-12 mb-2" />
            <p className="text-sm">Camera not available</p>
            <p className="text-xs text-gray-400 mt-1">Check robot connection</p>
          </div>
        ) : (
          <img
            src={cameraUrl}
            alt="Robot Camera Feed"
            className="w-full h-full object-cover"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
      </div>
      
      <div className="mt-4 text-center">
        <div className="inline-flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-700 font-medium">Live Feed</span>
        </div>
      </div>
    </div>
  );
};