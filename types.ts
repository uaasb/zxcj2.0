export interface WheelItem {
  id: string;
  text: string;
  color: string;
}

export interface HistoryItem {
  id: string;
  mode: ToolMode;
  value: string;
  timestamp: string;
}

export type ToolMode = 'wheel' | 'team' | 'number' | 'password';

export interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  gravity: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
}