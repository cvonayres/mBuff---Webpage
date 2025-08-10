export interface RobotCommand {
  endpoint: string;
  method: 'GET' | 'POST';
  payload?: any;
}

export interface DanceMove {
  id: number;
  name: string;
  emoji: string;
  color: string;
}

export interface Song {
  id: number;
  name: string;
  emoji: string;
  color: string;
}

export interface Saying {
  id: number;
  text: string;
  emoji: string;
  color: string;
}

export interface RobotStatus {
  connected: boolean;
  battery?: number;
  status: string;
}