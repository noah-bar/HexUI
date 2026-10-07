import { useCallback, useEffect, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = Exclude<Theme, 'system'>;

export type UseThemeResult = {
  /** Saved preference. `system` follows the operating-system setting. */
  theme: Theme;
  /** Theme currently applied to the document. */
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  /** Switches between explicit light and dark themes. */
  toggleTheme: () => void;
};

const STORAGE_KEY = 'hx-theme';
const CHANGE_EVENT = 'hx-theme-change';
const SYSTEM_QUERY = '(prefers-color-scheme: dark)';

type ThemeSnapshot = `${Theme}:${ResolvedTheme}`;

function isTheme(value: string | null): value is Theme {
  return value === 'light' || value === 'dark' || value === 'system';
}

function getTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  const storedTheme = window.localStorage.getItem(STORAGE_KEY);
  return isTheme(storedTheme) ? storedTheme : 'system';
}

function resolveTheme(theme: Theme): ResolvedTheme {
  if (theme !== 'system') return theme;
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia(SYSTEM_QUERY).matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return;
  const resolvedTheme = resolveTheme(theme);
  document.documentElement.dataset.theme = resolvedTheme;
  document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
}

function getSnapshot(): ThemeSnapshot {
  const theme = getTheme();
  return `${theme}:${resolveTheme(theme)}`;
}

function getServerSnapshot(): ThemeSnapshot {
  return 'system:light';
}

function subscribe(onChange: () => void) {
  const mediaQuery = window.matchMedia(SYSTEM_QUERY);

  const handleSystemChange = () => {
    if (getTheme() !== 'system') return;
    applyTheme('system');
    onChange();
  };

  const handleStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    applyTheme(getTheme());
    onChange();
  };

  mediaQuery.addEventListener('change', handleSystemChange);
  window.addEventListener('storage', handleStorage);
  window.addEventListener(CHANGE_EVENT, onChange);

  return () => {
    mediaQuery.removeEventListener('change', handleSystemChange);
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function updateTheme(theme: Theme) {
  window.localStorage.setItem(STORAGE_KEY, theme);
  applyTheme(theme);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/**
 * Controls HexUI's global light/dark theme on `<html>`, persists the preference,
 * follows the operating-system theme, and synchronizes changes between tabs.
 */
export function useTheme(): UseThemeResult {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const separatorIndex = snapshot.indexOf(':');
  const theme = snapshot.slice(0, separatorIndex) as Theme;
  const resolvedTheme = snapshot.slice(separatorIndex + 1) as ResolvedTheme;

  useEffect(() => applyTheme(theme), [theme]);

  const setTheme = useCallback((value: Theme) => updateTheme(value), []);
  const toggleTheme = useCallback(
    () => updateTheme(resolvedTheme === 'dark' ? 'light' : 'dark'),
    [resolvedTheme],
  );

  return { theme, resolvedTheme, setTheme, toggleTheme };
}
