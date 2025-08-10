import { API_BASE_URL, ENDPOINTS } from '../config/robot';
import { RobotStatus } from '../types/robot';

class RobotApiService {
  private async makeRequest(endpoint: string, method: 'GET' | 'POST' = 'POST', payload?: any) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload ? JSON.stringify(payload) : undefined,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      // Return a default response when API is not available instead of throwing
      console.warn('Robot API not available:', error);
      return { 
        connected: false, 
        battery: 0, 
        status: 'disconnected',
        error: error instanceof Error ? error.message : 'API not available'
      };
      throw error;
    }
  }

  // Movement controls
  async moveForward() {
    return this.makeRequest(ENDPOINTS.MOVE_FORWARD);
  }

  async moveBackward() {
    return this.makeRequest(ENDPOINTS.MOVE_BACKWARD);
  }

  async moveLeft() {
    return this.makeRequest(ENDPOINTS.MOVE_LEFT);
  }

  async moveRight() {
    return this.makeRequest(ENDPOINTS.MOVE_RIGHT);
  }

  async stop() {
    return this.makeRequest(ENDPOINTS.STOP);
  }

  // Spin controls
  async spinLeft() {
    return this.makeRequest('/api/spin/left');
  }

  async spinRight() {
    return this.makeRequest('/api/spin/right');
  }

  async spinBackLeft() {
    return this.makeRequest('/api/spin/back-left');
  }

  async spinBackRight() {
    return this.makeRequest('/api/spin/back-right');
  }

  // Entertainment controls
  async dance(danceId: number) {
    return this.makeRequest(ENDPOINTS.DANCE, 'POST', { dance_id: danceId });
  }

  async playSong(songId: number) {
    return this.makeRequest(ENDPOINTS.SONG, 'POST', { song_id: songId });
  }

  async speak(sayingId: number) {
    return this.makeRequest(ENDPOINTS.SPEAK, 'POST', { saying_id: sayingId });
  }

  // Status
  async getStatus(): Promise<RobotStatus> {
    return this.makeRequest(ENDPOINTS.STATUS, 'GET');
  }

  // Camera feed URL
  getCameraFeedUrl(): string {
    return `${API_BASE_URL}${ENDPOINTS.CAMERA_FEED}`;
  }
}

export const robotApi = new RobotApiService();