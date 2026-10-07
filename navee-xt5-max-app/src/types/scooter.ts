export type RideMode = 'eco' | 'drive' | 'sport';

export type ConnectionStatus =
  | 'disconnected'
  | 'scanning'
  | 'connecting'
  | 'connected';

export const MIN_SPEED_LIMIT = 5;
export const MAX_SPEED_LIMIT = 60;

export interface ScooterSettings {
  zeroStart: boolean;
  rideMode: RideMode;
  maxSpeed: number;
}

export const DEFAULT_SETTINGS: ScooterSettings = {
  zeroStart: false,
  rideMode: 'drive',
  maxSpeed: 25,
};

export interface MockDevice {
  id: string;
  name: string;
  signal: number;
  isTarget: boolean;
}

export interface Telemetry {
  speed: number;
  battery: number;
  odometerKm: number;
  firmwareVersion: string;
}

export const INITIAL_TELEMETRY: Telemetry = {
  speed: 0,
  battery: 82,
  odometerKm: 184.3,
  firmwareVersion: 'NAVEE-XT5M-2.4.1',
};
