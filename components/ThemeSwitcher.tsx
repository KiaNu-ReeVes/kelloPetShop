'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<'light' | 'light'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme') as 'light' | 'light' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: light)').matches;
    const initialTheme = stored || (prefersDark ? 'light' : 'light');
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (newTheme: 'light' | 'light') => {
    const root = document.documentElement;
    if (newTheme === 'light') {
      root.classList.add('light');
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      root.classList.remove('light');
      document.documentElement.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('theme', newTheme);
    window.dispatchEvent(new Event('themechange'));
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'light' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) return null;

  // return (
  //   <button
  //     onClick={toggleTheme}
  //     className="p-2 hover:bg-muted rounded-lg transition-colors flex items-center justify-center"
  //     title={`${theme === 'light' ? 'دارک' : 'روشن'} مود`}
  //     aria-label="تغییر تم"
  //   >
  //     {theme === 'light' ? (
  //       <Moon size={20} className="text-foreground" />
  //     ) : (
  //       <Sun size={20} className="text-foreground" />
  //     )}
  //   </button>
  // );
}
