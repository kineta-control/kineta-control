export type Screen = 'dashboard' | 'connect' | 'settings';

interface NavItem {
  id: Screen;
  label: string;
  icon: string;
}

const ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '🛴' },
  { id: 'connect', label: 'Verbinden', icon: '📶' },
  { id: 'settings', label: 'Einstellungen', icon: '⚙️' },
];

interface BottomNavProps {
  active: Screen;
  onChange: (screen: Screen) => void;
}

export default function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="bottom-nav">
      {ITEMS.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`nav-item ${active === item.id ? 'active' : ''}`}
          onClick={() => onChange(item.id)}
          aria-current={active === item.id}
        >
          <span className="nav-item__icon">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </nav>
  );
}
