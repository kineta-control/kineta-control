import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { DEFAULT_SETTINGS, type RideMode, type ScooterSettings } from '../types/scooter';

const STORAGE_KEY = 'navee-xt5-max.settings';

export function useScooterSettings() {
  const [settings, setSettings] = useLocalStorage<ScooterSettings>(STORAGE_KEY, DEFAULT_SETTINGS);

  const setZeroStart = useCallback(
    (zeroStart: boolean) => setSettings((prev) => ({ ...prev, zeroStart })),
    [setSettings],
  );

  const setRideMode = useCallback(
    (rideMode: RideMode) => setSettings((prev) => ({ ...prev, rideMode })),
    [setSettings],
  );

  const setMaxSpeed = useCallback(
    (maxSpeed: number) => setSettings((prev) => ({ ...prev, maxSpeed })),
    [setSettings],
  );

  return { settings, setZeroStart, setRideMode, setMaxSpeed };
}
