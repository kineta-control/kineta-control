import type { CSSProperties } from 'react';
import { MAX_SPEED_LIMIT, MIN_SPEED_LIMIT } from '../../types/scooter';

interface SpeedLimitSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function SpeedLimitSlider({ value, onChange }: SpeedLimitSliderProps) {
  const percent = ((value - MIN_SPEED_LIMIT) / (MAX_SPEED_LIMIT - MIN_SPEED_LIMIT)) * 100;

  return (
    <div className="setting-row" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
      <div className="slider-block">
        <div className="slider-block__value">
          <strong>{value} km/h</strong>
          <span>Simulierte Höchstgeschwindigkeit</span>
        </div>
        <input
          type="range"
          min={MIN_SPEED_LIMIT}
          max={MAX_SPEED_LIMIT}
          step={1}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          style={{ '--fill-percent': `${percent}%` } as CSSProperties}
          aria-label="Simulierte Höchstgeschwindigkeit"
        />
        <div className="slider-scale">
          <span>{MIN_SPEED_LIMIT} km/h</span>
          <span>{MAX_SPEED_LIMIT} km/h</span>
        </div>
      </div>
    </div>
  );
}
