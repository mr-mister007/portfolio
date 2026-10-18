import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';
export type Accent = 'blue' | 'lime' | 'orange';

interface ThemeContextValue {
  theme: Theme;
  accent: Accent;
  toggleTheme: () => void;
  cycleAccent: () => void;
  setAccent: (accent: Accent) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  accent: 'blue',
  toggleTheme: () => {},
  cycleAccent: () => {},
  setAccent: () => {},
  toggle: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const ACCENTS: Accent[] = ['blue', 'lime', 'orange'];

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [accent, setAccentState] = useState<Accent>('blue');

  useEffect(() => {
    try {
      const storedTheme = (localStorage.getItem('pg-theme') || localStorage.getItem('theme')) as Theme | null;
      if (storedTheme === 'light' || storedTheme === 'dark') {
        setTheme(storedTheme);
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        setTheme('light');
      }

      const storedAccent = (localStorage.getItem('pg-accent') || localStorage.getItem('accent')) as Accent | null;
      if (storedAccent && ACCENTS.includes(storedAccent)) {
        setAccentState(storedAccent);
      }
    } catch {
      // ignore storage access errors
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-accent', accent);

    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }

    try {
      localStorage.setItem('pg-theme', theme);
      localStorage.setItem('theme', theme);
      localStorage.setItem('pg-accent', accent);
      localStorage.setItem('accent', accent);
    } catch {
      // ignore
    }
  }, [theme, accent]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const cycleAccent = useCallback(() => {
    setAccentState((prev) => {
      const idx = ACCENTS.indexOf(prev);
      return ACCENTS[(idx + 1) % ACCENTS.length];
    });
  }, []);

  const setAccent = useCallback((newAccent: Accent) => {
    setAccentState(newAccent);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        accent,
        toggleTheme,
        cycleAccent,
        setAccent,
        toggle: toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
