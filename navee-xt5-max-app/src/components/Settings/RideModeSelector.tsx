import type { RideMode } from '../../types/scooter';

interface RideModeOption {
  value: RideMode;
  label: string;
}

const OPTIONS: RideModeOption[] = [
  { value: 'eco', label: 'Eco' },
  { value: 'drive', label: 'Drive' },
  { value: 'sport', label: 'Sport' },
];

interface RideModeSelectorProps {
  value: RideMode;
  onChange: (mode: RideMode) => void;
}

export default function RideModeSelector({ value, onChange }: RideModeSelectorProps) {
  return (
    <div className="setting-row" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 10 }}>
      <div className="setting-row__text">
        <strong>Fahrmodus</strong>
        <span>Beeinflusst die simulierte Zielgeschwindigkeit im Dashboard.</span>
      </div>
      <div className="segmented-control" role="tablist" aria-label="Fahrmodus">
        {OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={value === option.value}
            className={`segmented-control__option ${value === option.value ? 'active' : ''}`}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
