import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'auto';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Get saved theme from localStorage or default to 'dark'
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'dark';
  });

  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    const effectiveTheme = theme === 'auto' ? systemTheme : theme;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    // Add current theme class
    root.classList.add(effectiveTheme);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme, systemTheme]);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const effectiveTheme = theme === 'auto' ? systemTheme : theme;

  return {
    theme,
    effectiveTheme,
    changeTheme,
    systemTheme,
  };
};