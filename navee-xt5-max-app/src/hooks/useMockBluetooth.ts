import { useCallback, useEffect, useRef, useState } from 'react';
import { connectToMockDevice, startMockScan, type ConnectHandle, type ScanHandle } from '../services/mockBluetooth';
import type { ConnectionStatus, MockDevice } from '../types/scooter';

export function useMockBluetooth() {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [discoveredDevices, setDiscoveredDevices] = useState<MockDevice[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<MockDevice | null>(null);
  const [connectProgress, setConnectProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const scanHandleRef = useRef<ScanHandle | null>(null);
  const connectHandleRef = useRef<ConnectHandle | null>(null);

  useEffect(() => {
    return () => {
      scanHandleRef.current?.cancel();
      connectHandleRef.current?.cancel();
    };
  }, []);

  const startScan = useCallback(() => {
    setError(null);
    setDiscoveredDevices([]);
    setStatus('scanning');
    scanHandleRef.current?.cancel();

    scanHandleRef.current = startMockScan(
      (device) => setDiscoveredDevices((prev) => [...prev, device]),
      () => setStatus((prev) => (prev === 'scanning' ? 'disconnected' : prev)),
    );
  }, []);

  const cancelScan = useCallback(() => {
    scanHandleRef.current?.cancel();
    setStatus('disconnected');
  }, []);

  const connect = useCallback((device: MockDevice) => {
    setError(null);
    setStatus('connecting');
    setConnectProgress(0);
    connectHandleRef.current?.cancel();

    connectHandleRef.current = connectToMockDevice(
      device,
      (percent) => setConnectProgress(percent),
      () => {
        setConnectedDevice(device);
        setStatus('connected');
      },
    );
  }, []);

  const disconnect = useCallback(() => {
    connectHandleRef.current?.cancel();
    setConnectedDevice(null);
    setConnectProgress(0);
    setStatus('disconnected');
    setDiscoveredDevices([]);
  }, []);

  return {
    status,
    discoveredDevices,
    connectedDevice,
    connectProgress,
    error,
    startScan,
    cancelScan,
    connect,
    disconnect,
  };
}
