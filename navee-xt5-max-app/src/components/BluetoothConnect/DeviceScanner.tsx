import ConnectionBanner from './ConnectionBanner';
import DeviceListItem from './DeviceListItem';
import type { ConnectionStatus, MockDevice } from '../../types/scooter';

interface DeviceScannerProps {
  status: ConnectionStatus;
  discoveredDevices: MockDevice[];
  connectedDevice: MockDevice | null;
  connectProgress: number;
  connectingDeviceId: string | null;
  onStartScan: () => void;
  onCancelScan: () => void;
  onConnect: (device: MockDevice) => void;
  onDisconnect: () => void;
}

export default function DeviceScanner({
  status,
  discoveredDevices,
  connectedDevice,
  connectProgress,
  connectingDeviceId,
  onStartScan,
  onCancelScan,
  onConnect,
  onDisconnect,
}: DeviceScannerProps) {
  const isScanning = status === 'scanning';
  const isConnecting = status === 'connecting';
  const isConnected = status === 'connected';

  return (
    <div className="screen">
      <ConnectionBanner
        status={status}
        deviceName={connectedDevice?.name ?? null}
        connectProgress={connectProgress}
        onDisconnect={onDisconnect}
      />

      {!isConnected && (
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <p className="card-title" style={{ margin: 0 }}>
              Gerät verbinden
            </p>
            {isScanning ? (
              <span className="scan-status">
                <span className="scan-spinner" />
                Suche läuft…
              </span>
            ) : (
              <button type="button" className="pill-button" onClick={onStartScan}>
                Suchen
              </button>
            )}
          </div>

          {isScanning && (
            <button type="button" className="pill-button secondary" onClick={onCancelScan} style={{ marginBottom: 12 }}>
              Suche abbrechen
            </button>
          )}

          <div className="device-list">
            {discoveredDevices.length === 0 && !isScanning && (
              <p className="empty-state">Noch keine Geräte gefunden. Starte die Suche, um Geräte in der Nähe anzuzeigen.</p>
            )}
            {discoveredDevices
              .slice()
              .sort((a, b) => Number(b.isTarget) - Number(a.isTarget) || b.signal - a.signal)
              .map((device) => (
                <DeviceListItem
                  key={device.id}
                  device={device}
                  isConnecting={isConnecting && connectingDeviceId === device.id}
                  connectProgress={connectProgress}
                  onConnect={onConnect}
                />
              ))}
          </div>
        </div>
      )}

      <div className="notice-box">
        <span className="notice-box__icon">🔒</span>
        <span>
          Diese Suche verwendet eine lokale Bluetooth-Simulation. Es wird keine echte Bluetooth-Hardware angesprochen
          und es findet keine Verbindung zu einem realen Fahrzeug statt.
        </span>
      </div>
    </div>
  );
}
