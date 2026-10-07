interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export default function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header__title">
        <h1>NAVEE XT5 Max</h1>
        <span>Companion (Demo)</span>
      </div>
      <button
        type="button"
        className="icon-button"
        onClick={onToggleTheme}
        aria-label="Theme wechseln"
        title="Theme wechseln"
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </button>
    </header>
  );
}
