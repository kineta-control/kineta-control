import type { ConnectionStatus } from '../../types/scooter';

interface ConnectionBannerProps {
  status: ConnectionStatus;
  deviceName: string | null;
  connectProgress: number;
  onDisconnect: () => void;
}

const STATUS_TEXT: Record<ConnectionStatus, string> = {
  disconnected: 'Kein Gerät verbunden',
  scanning: 'Suche nach Geräten…',
  connecting: 'Verbindung wird aufgebaut…',
  connected: 'Verbunden',
};

export default function ConnectionBanner({ status, deviceName, connectProgress, onDisconnect }: ConnectionBannerProps) {
  const isConnected = status === 'connected';
  const dotClass = isConnected ? 'connected' : status === 'connecting' || status === 'scanning' ? 'pending' : '';

  return (
    <div className={`connection-banner ${isConnected ? 'is-connected' : ''}`}>
      <span className={`status-dot ${dotClass}`} />
      <div className="connection-banner__text">
        <strong>{isConnected ? deviceName ?? 'NAVEE XT5 Max' : STATUS_TEXT[status]}</strong>
        <span>
          {status === 'connecting'
            ? `${connectProgress}% · simulierte Kopplung`
            : isConnected
              ? 'Bluetooth (simuliert) · Telemetrie aktiv'
              : 'Bluetooth (simuliert)'}
        </span>
      </div>
      {isConnected && (
        <button type="button" className="pill-button secondary" onClick={onDisconnect}>
          Trennen
        </button>
      )}
    </div>
  );
}
