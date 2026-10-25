import { useCallback, useEffect, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = Exclude<Theme, 'system'>;

export type UseThemeResult = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  /** Switches to the explicit opposite theme, never to `system`. */
  toggleTheme: () => void;
};

const STORAGE_KEY = 'hx-theme';
const CHANGE_EVENT = 'hx-theme-change';
const SYSTEM_QUERY = '(prefers-color-scheme: dark)';

type ThemeSnapshot = `${Theme}:${ResolvedTheme}`;

function isTheme(value: string | null): value is Theme {
  return value === 'light' || value === 'dark' || value === 'system';
}

// Used when localStorage is unavailable (private browsing, blocked storage).
let memoryTheme: Theme = 'system';

function readStoredTheme(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return memoryTheme;
  }
}

function storeTheme(theme: Theme) {
  memoryTheme = theme;
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage unavailable: memoryTheme is used instead.
  }
}

function getTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  const storedTheme = readStoredTheme();
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
  storeTheme(theme);
  applyTheme(theme);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Applies the saved theme before the first paint. Render it in `<head>`: `<script dangerouslySetInnerHTML={{ __html: themeScript }} />`. */
export const themeScript = `(function(){var t;try{t=localStorage.getItem(${JSON.stringify(STORAGE_KEY)})}catch(e){}if(t!=='light'&&t!=='dark')t=matchMedia(${JSON.stringify(SYSTEM_QUERY)}).matches?'dark':'light';var d=document.documentElement;d.dataset.theme=t;d.classList.toggle('dark',t==='dark')})()`;

export function useTheme(): UseThemeResult {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const separatorIndex = snapshot.indexOf(':');
  const theme = snapshot.slice(0, separatorIndex) as Theme;
  const resolvedTheme = snapshot.slice(separatorIndex + 1) as ResolvedTheme;

  useEffect(() => applyTheme(theme), [theme]);

  const setTheme = useCallback((value: Theme) => updateTheme(value), []);
  const toggleTheme = useCallback(() => updateTheme(resolvedTheme === 'dark' ? 'light' : 'dark'), [resolvedTheme]);

  return { theme, resolvedTheme, setTheme, toggleTheme };
}
