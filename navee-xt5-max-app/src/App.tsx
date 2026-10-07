import { useState } from 'react';
import Header from './components/Layout/Header';
import BottomNav, { type Screen } from './components/Layout/BottomNav';
import Dashboard from './components/Dashboard/Dashboard';
import DeviceScanner from './components/BluetoothConnect/DeviceScanner';
import SettingsScreen from './components/Settings/SettingsScreen';
import { useMockBluetooth } from './hooks/useMockBluetooth';
import { useScooterSettings } from './hooks/useScooterSettings';
import { useTelemetry } from './hooks/useTelemetry';
import { useTheme } from './hooks/useTheme';
import type { MockDevice } from './types/scooter';

export default function App() {
  const [screen, setScreen] = useState<Screen>('dashboard');
  const { theme, toggleTheme } = useTheme();
  const { settings, setZeroStart, setRideMode, setMaxSpeed } = useScooterSettings();
  const bluetooth = useMockBluetooth();
  const [connectingDeviceId, setConnectingDeviceId] = useState<string | null>(null);

  const isConnected = bluetooth.status === 'connected';
  const telemetry = useTelemetry(isConnected, settings.rideMode, settings.maxSpeed);

  const handleConnect = (device: MockDevice) => {
    setConnectingDeviceId(device.id);
    bluetooth.connect(device);
  };

  const handleDisconnect = () => {
    setConnectingDeviceId(null);
    bluetooth.disconnect();
  };

  return (
    <div className="app-shell">
      <div className="app-frame">
        <Header theme={theme} onToggleTheme={toggleTheme} />
        <main className="app-main">
          {screen === 'dashboard' && (
            <Dashboard
              status={bluetooth.status}
              deviceName={bluetooth.connectedDevice?.name ?? null}
              telemetry={telemetry}
              rideMode={settings.rideMode}
              maxSpeed={settings.maxSpeed}
            />
          )}

          {screen === 'connect' && (
            <DeviceScanner
              status={bluetooth.status}
              discoveredDevices={bluetooth.discoveredDevices}
              connectedDevice={bluetooth.connectedDevice}
              connectProgress={bluetooth.connectProgress}
              connectingDeviceId={connectingDeviceId}
              onStartScan={bluetooth.startScan}
              onCancelScan={bluetooth.cancelScan}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
            />
          )}

          {screen === 'settings' && (
            <SettingsScreen
              settings={settings}
              isConnected={isConnected}
              onZeroStartChange={setZeroStart}
              onRideModeChange={setRideMode}
              onMaxSpeedChange={setMaxSpeed}
            />
          )}
        </main>
        <BottomNav active={screen} onChange={setScreen} />
      </div>
    </div>
  );
}
