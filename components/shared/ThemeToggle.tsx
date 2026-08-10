'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};
const useHasMounted = () =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useHasMounted();

  if (!mounted) {
    return <div className="w-8 h-8" />;
  }

  const next = theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark';

  const icon =
    theme === 'dark' ? <Moon className="w-3.5 h-3.5" /> :
    theme === 'light' ? <Sun className="w-3.5 h-3.5" /> :
    <Monitor className="w-3.5 h-3.5" />;

  return (
    <button
      onClick={() => setTheme(next)}
      className="p-2 rounded-xl bg-surface-page/5 hover:bg-surface-page/10 text-heading/80 hover:text-heading border border-heading/10 transition-all cursor-pointer"
      title={`Theme: ${theme} — click to switch to ${next}`}
    >
      {icon}
    </button>
  );
}
