import ToggleSetting from './ToggleSetting';
import RideModeSelector from './RideModeSelector';
import SpeedLimitSlider from './SpeedLimitSlider';
import type { RideMode, ScooterSettings } from '../../types/scooter';

interface SettingsScreenProps {
  settings: ScooterSettings;
  isConnected: boolean;
  onZeroStartChange: (value: boolean) => void;
  onRideModeChange: (mode: RideMode) => void;
  onMaxSpeedChange: (value: number) => void;
}

export default function SettingsScreen({
  settings,
  isConnected,
  onZeroStartChange,
  onRideModeChange,
  onMaxSpeedChange,
}: SettingsScreenProps) {
  return (
    <div className="screen">
      <div className="card">
        <p className="card-title">Scooter Einstellungen</p>

        <ToggleSetting
          title="Zero Start"
          description={
            settings.zeroStart
              ? 'Start per Gasgriff aktiv (ohne Anschieben) — simuliert'
              : 'Anschieben vor dem Start erforderlich — simuliert'
          }
          checked={settings.zeroStart}
          onChange={onZeroStartChange}
        />

        <RideModeSelector value={settings.rideMode} onChange={onRideModeChange} />

        <SpeedLimitSlider value={settings.maxSpeed} onChange={onMaxSpeedChange} />
      </div>

      <div className="card">
        <p className="card-title">Status</p>
        <div className="setting-row">
          <div className="setting-row__text">
            <strong>Verbindung</strong>
            <span>{isConnected ? 'Einstellungen werden live übernommen' : 'Verbinde ein Gerät, um Live-Werte zu sehen'}</span>
          </div>
        </div>
      </div>

      <div className="notice-box">
        <span className="notice-box__icon">💾</span>
        <span>
          Alle Einstellungen werden lokal in deinem Browser (LocalStorage) gespeichert. Diese App verändert keine
          echten Sicherheits- oder Geschwindigkeitsbegrenzungen eines realen E-Scooters.
        </span>
      </div>
    </div>
  );
}
