import ScooterIcon from './ScooterIcon';
import type { ConnectionStatus, Telemetry } from '../../types/scooter';

interface DashboardProps {
  status: ConnectionStatus;
  deviceName: string | null;
  telemetry: Telemetry;
}

const RIDE_MODE_LABELS: Record<string, string> = {
  eco: 'Eco',
  drive: 'Drive',
  sport: 'Sport',
};

interface DashboardExtraProps {
  rideMode: string;
  maxSpeed: number;
}

export default function Dashboard({
  status,
  deviceName,
  telemetry,
  rideMode,
  maxSpeed,
}: DashboardProps & DashboardExtraProps) {
  const isConnected = status === 'connected';
  const batteryLow = telemetry.battery < 25;

  return (
    <div className="screen">
      <div className="scooter-stage">
        <div className="scooter-stage__speed">
          {isConnected ? telemetry.speed.toFixed(0) : '--'}
          <span className="scooter-stage__speed-unit"> km/h · simuliert</span>
        </div>
        <ScooterIcon speed={telemetry.speed} isConnected={isConnected} />
      </div>

      <div className="card">
        <p className="card-title">Gerätestatus</p>
        <div className="stat-grid">
          <div className="stat-tile">
            <span className="stat-tile__label">Verbindung</span>
            <span className="stat-tile__value">{isConnected ? 'Verbunden' : 'Getrennt'}</span>
          </div>
          <div className="stat-tile">
            <span className="stat-tile__label">Modell</span>
            <span className="stat-tile__value">{deviceName ?? 'XT5 Max'}</span>
          </div>
          <div className="stat-tile">
            <span className="stat-tile__label">Firmware</span>
            <span className="stat-tile__value">{telemetry.firmwareVersion}</span>
          </div>
        </div>
      </div>

      <div className="card">
        <p className="card-title">Akku &amp; Reichweite</p>
        <div className="stat-grid">
          <div className="stat-tile" style={{ gridColumn: 'span 1' }}>
            <span className="stat-tile__label">Akku</span>
            <span className="stat-tile__value">{telemetry.battery.toFixed(0)}%</span>
            <div className="battery-bar">
              <div
                className={`battery-bar__fill ${batteryLow ? 'low' : ''}`}
                style={{ width: `${telemetry.battery}%` }}
              />
            </div>
          </div>
          <div className="stat-tile">
            <span className="stat-tile__label">Strecke</span>
            <span className="stat-tile__value">{telemetry.odometerKm.toFixed(1)} km</span>
          </div>
          <div className="stat-tile">
            <span className="stat-tile__label">Fahrmodus</span>
            <span className="stat-tile__value">{RIDE_MODE_LABELS[rideMode] ?? rideMode}</span>
          </div>
        </div>
      </div>

      <div className="card">
        <p className="card-title">Simulierte Höchstgeschwindigkeit</p>
        <div className="stat-tile" style={{ background: 'transparent', border: 'none', padding: 0 }}>
          <span className="stat-tile__value" style={{ fontSize: 22 }}>
            {maxSpeed} km/h
          </span>
          <span className="stat-tile__label" style={{ textTransform: 'none', fontWeight: 400 }}>
            Einstellbar unter „Einstellungen“ · wirkt nur in dieser Demo
          </span>
        </div>
      </div>

      <div className="notice-box">
        <span className="notice-box__icon">ℹ️</span>
        <span>
          Alle Werte sind simuliert. Diese App steuert kein reales Fahrzeug und sendet keine Befehle an echte
          Scooter-Hardware.
        </span>
      </div>
    </div>
  );
}
