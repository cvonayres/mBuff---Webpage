import { useState, useEffect } from 'react';
import { RobotStatus } from '../types/robot';
import { robotApi } from '../services/robotApi';

export const useRobotStatus = () => {
  const [status, setStatus] = useState<RobotStatus>({
    connected: false,
    status: 'Connecting...'
  });

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const robotStatus = await robotApi.getStatus();
        setStatus({
          ...robotStatus,
        });
      } catch (error) {
        // Handle API errors gracefully
        setStatus({
          connected: false,
          status: 'Disconnected'
        });
      }
    };

    // Check status immediately
    checkStatus();

    // Check status every 10 seconds
    const interval = setInterval(checkStatus, 10000);

    return () => clearInterval(interval);
  }, []);

  return status;
};