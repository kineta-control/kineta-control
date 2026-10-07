import type { MockDevice } from '../../types/scooter';

interface DeviceListItemProps {
  device: MockDevice;
  isConnecting: boolean;
  connectProgress: number;
  onConnect: (device: MockDevice) => void;
}

function signalBars(signal: number): number {
  if (signal >= 75) return 4;
  if (signal >= 50) return 3;
  if (signal >= 25) return 2;
  return 1;
}

export default function DeviceListItem({ device, isConnecting, connectProgress, onConnect }: DeviceListItemProps) {
  const activeBars = signalBars(device.signal);

  return (
    <div className={`device-row ${device.isTarget ? 'is-target' : ''}`}>
      <div className="device-row__icon">{device.isTarget ? '🛴' : '📶'}</div>
      <div className="device-row__info">
        <strong>{device.name}</strong>
        <div className="signal-bars" aria-label={`Signalstärke ${device.signal}%`}>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={i < activeBars ? 'active' : ''} />
          ))}
        </div>
      </div>
      <button
        type="button"
        className="pill-button secondary"
        onClick={() => onConnect(device)}
        disabled={isConnecting}
      >
        {isConnecting ? `${connectProgress}%` : 'Verbinden'}
      </button>
    </div>
  );
}
