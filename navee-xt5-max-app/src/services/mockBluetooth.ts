/**
 * Mock-Bluetooth-Schicht.
 *
 * WICHTIG: Dies ist eine reine Software-Simulation fuer Demo-/Portfolio-Zwecke.
 * Es wird KEINE echte Bluetooth-Hardware angesprochen (kein navigator.bluetooth,
 * keine Web-Bluetooth-API, kein Native-Modul) und es werden KEINE Befehle an ein
 * echtes Fahrzeug, einen echten ESC oder echte Scooter-Hardware gesendet.
 * Alle Geraete, Signalstaerken und Telemetriedaten sind generiert.
 */
import type { MockDevice } from '../types/scooter';

interface DeviceTemplate {
  id: string;
  name: string;
  isTarget: boolean;
  signalRange: [number, number];
}

const DEVICE_POOL: DeviceTemplate[] = [
  { id: 'navee-xt5-max-01', name: 'NAVEE XT5 Max', isTarget: true, signalRange: [78, 99] },
  { id: 'jbl-flip-6', name: 'JBL Flip 6', isTarget: false, signalRange: [40, 85] },
  { id: 'sony-wh1000', name: 'Sony WH-1000XM5', isTarget: false, signalRange: [35, 80] },
  { id: 'garmin-fenix-7', name: 'Garmin Fenix 7', isTarget: false, signalRange: [30, 70] },
  { id: 'mi-band-8', name: 'Mi Smart Band 8', isTarget: false, signalRange: [25, 65] },
];

function randomInRange([min, max]: [number, number]): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export interface ScanHandle {
  cancel: () => void;
}

/**
 * Simuliert einen Bluetooth-Scanvorgang. Geraete werden nacheinander mit
 * zufaelliger Verzoegerung "gefunden" und per Callback gemeldet.
 */
export function startMockScan(
  onDeviceFound: (device: MockDevice) => void,
  onComplete: () => void,
): ScanHandle {
  const order = shuffle(DEVICE_POOL);
  const timers: ReturnType<typeof setTimeout>[] = [];
  let cancelled = false;

  order.forEach((template, index) => {
    const delay = 500 + index * (550 + Math.random() * 400);
    const timer = setTimeout(() => {
      if (cancelled) return;
      onDeviceFound({
        id: template.id,
        name: template.name,
        isTarget: template.isTarget,
        signal: randomInRange(template.signalRange),
      });
    }, delay);
    timers.push(timer);
  });

  const totalDuration = 500 + order.length * (550 + 400) + 300;
  const completionTimer = setTimeout(() => {
    if (!cancelled) onComplete();
  }, totalDuration);
  timers.push(completionTimer);

  return {
    cancel: () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    },
  };
}

export interface ConnectHandle {
  cancel: () => void;
}

/**
 * Simuliert den Verbindungsaufbau zu einem Geraet inkl. Fortschrittsanzeige.
 */
export function connectToMockDevice(
  _device: MockDevice,
  onProgress: (percent: number) => void,
  onConnected: () => void,
): ConnectHandle {
  let cancelled = false;
  let percent = 0;

  const interval = setInterval(() => {
    if (cancelled) return;
    percent = Math.min(100, percent + 18 + Math.random() * 12);
    onProgress(Math.round(percent));
    if (percent >= 100) {
      clearInterval(interval);
      onConnected();
    }
  }, 220);

  return {
    cancel: () => {
      cancelled = true;
      clearInterval(interval);
    },
  };
}
