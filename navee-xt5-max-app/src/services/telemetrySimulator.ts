/**
 * Simuliert Live-Telemetrie (Geschwindigkeit, Akku) rein innerhalb der App.
 * Beeinflusst ausschliesslich den in der UI angezeigten Zustand - es gibt
 * keine Verbindung zu echter Hardware.
 */
import type { RideMode, Telemetry } from '../types/scooter';

function targetSpeedForMode(mode: RideMode, maxSpeed: number): number {
  switch (mode) {
    case 'eco':
      return Math.min(maxSpeed, 18);
    case 'drive':
      return Math.min(maxSpeed, 35);
    case 'sport':
      return maxSpeed;
    default:
      return maxSpeed;
  }
}

export interface TelemetryTickParams {
  current: Telemetry;
  rideMode: RideMode;
  maxSpeed: number;
}

export function nextTelemetryTick({ current, rideMode, maxSpeed }: TelemetryTickParams): Telemetry {
  const target = targetSpeedForMode(rideMode, maxSpeed);
  const noise = (Math.random() - 0.5) * 2.5;
  const pull = (target - current.speed) * 0.12;
  let speed = current.speed + pull + noise;
  speed = Math.max(0, Math.min(maxSpeed, speed));

  const batteryDrain = speed > 1 ? 0.004 + speed * 0.0006 : 0.0008;
  const battery = Math.max(18, current.battery - batteryDrain);

  const distanceStepKm = (speed / 3600) * 2;
  const odometerKm = current.odometerKm + distanceStepKm;

  return {
    ...current,
    speed: Math.round(speed * 10) / 10,
    battery: Math.round(battery * 10) / 10,
    odometerKm: Math.round(odometerKm * 10) / 10,
  };
}
