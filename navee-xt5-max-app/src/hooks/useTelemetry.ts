import { useEffect, useState } from 'react';
import { nextTelemetryTick } from '../services/telemetrySimulator';
import { INITIAL_TELEMETRY, type RideMode, type Telemetry } from '../types/scooter';

const TICK_MS = 650;

export function useTelemetry(isActive: boolean, rideMode: RideMode, maxSpeed: number): Telemetry {
  const [telemetry, setTelemetry] = useState<Telemetry>(INITIAL_TELEMETRY);

  useEffect(() => {
    if (!isActive) {
      setTelemetry((prev) => ({ ...prev, speed: 0 }));
      return;
    }

    const interval = setInterval(() => {
      setTelemetry((prev) => nextTelemetryTick({ current: prev, rideMode, maxSpeed }));
    }, TICK_MS);

    return () => clearInterval(interval);
  }, [isActive, rideMode, maxSpeed]);

  return telemetry;
}
