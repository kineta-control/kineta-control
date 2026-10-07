interface ScooterIconProps {
  speed: number;
  isConnected: boolean;
}

function speedClass(speed: number): string {
  if (speed <= 0) return '';
  if (speed < 12) return 'speed-slow';
  if (speed < 28) return 'speed-medium';
  return 'speed-fast';
}

export default function ScooterIcon({ speed, isConnected }: ScooterIconProps) {
  const moving = isConnected && speed > 0;
  const classes = ['scooter-art'];
  if (moving) classes.push('is-moving', speedClass(speed));

  return (
    <div className={classes.join(' ')} aria-hidden="true">
      <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="10" y1="150" x2="230" y2="150" stroke="var(--border)" strokeWidth="2" strokeDasharray="6 6" />

        <path
          d="M64 60 L64 24 L96 24"
          stroke="var(--text-primary)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={isConnected ? 1 : 0.45}
        />
        <rect x="58" y="16" width="26" height="12" rx="4" fill="var(--accent)" opacity={isConnected ? 1 : 0.45} />

        <path
          d="M64 60 L150 60"
          stroke="var(--text-primary)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity={isConnected ? 1 : 0.45}
        />
        <path
          d="M150 60 L176 112"
          stroke="var(--text-primary)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity={isConnected ? 1 : 0.45}
        />
        <rect x="150" y="48" width="56" height="14" rx="6" fill="var(--text-primary)" opacity={isConnected ? 1 : 0.45} />

        <path
          d="M64 60 L40 112"
          stroke="var(--text-primary)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity={isConnected ? 1 : 0.45}
        />

        <g className="wheel">
          <circle cx="40" cy="128" r="20" stroke="var(--text-primary)" strokeWidth="6" opacity={isConnected ? 1 : 0.45} />
          <circle cx="40" cy="128" r="4" fill="var(--text-primary)" opacity={isConnected ? 1 : 0.45} />
        </g>
        <g className="wheel">
          <circle cx="176" cy="128" r="20" stroke="var(--text-primary)" strokeWidth="6" opacity={isConnected ? 1 : 0.45} />
          <circle cx="176" cy="128" r="4" fill="var(--text-primary)" opacity={isConnected ? 1 : 0.45} />
        </g>
      </svg>
    </div>
  );
}
