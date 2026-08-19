'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MessageCircle,
  Calendar,
  ArrowUp,
  Moon,
  Sun,
  Palette,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { ROUTES, STUDIO_PROFILE } from '@photomagic/config';

export const FloatingControls: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('lavender');
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Check initial system / stored dark mode
    const storedTheme = localStorage.getItem('photomagic_theme') || 'lavender';
    const storedMode = localStorage.getItem('photomagic_mode');
    const prefersDark =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialDark = storedMode ? storedMode === 'dark' : prefersDark;
    setIsDarkMode(initialDark);
    setCurrentTheme(storedTheme);

    if (initialDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    if (storedTheme) {
      document.documentElement.classList.add(`theme-${storedTheme}`);
    }

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('photomagic_mode', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('photomagic_mode', 'light');
    }
  };

  const handleSelectTheme = (theme: string) => {
    // Remove previous theme class
    const themeClasses = [
      'theme-lavender',
      'theme-soft-pink',
      'theme-blush',
      'theme-rose',
      'theme-mauve',
      'theme-maroon',
    ];
    themeClasses.forEach((cls) => document.documentElement.classList.remove(cls));

    document.documentElement.classList.add(`theme-${theme}`);
    setCurrentTheme(theme);
    localStorage.setItem('photomagic_theme', theme);
    setShowThemePicker(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const themes = [
    { id: 'lavender', label: 'Lavender Pastel', color: '#FAF5FF', accent: '#A855F7' },
    { id: 'soft-pink', label: 'Soft Pink', color: '#FFF1F2', accent: '#FB7185' },
    { id: 'blush', label: 'Blush Ivory', color: '#FFF5F7', accent: '#F43F5E' },
    { id: 'rose', label: 'Rose Quartz', color: '#FFF0F3', accent: '#E11D48' },
    { id: 'mauve', label: 'Mauve Slate', color: '#F8F5FB', accent: '#7E22CE' },
    { id: 'maroon', label: 'Royal Maroon', color: '#FAF0F2', accent: '#881337' },
  ];

  const whatsappUrl = `https://wa.me/91${STUDIO_PROFILE.contact.phone}?text=Hello%20PhotoMagic%20Studios%20by%20RK%2C%20I%20would%20like%20to%20inquire%20about%20availability.`;

  return (
    <aside
      aria-label="Quick Access Studio Controls"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 select-none"
    >
      {/* Theme Picker Popup */}
      {showThemePicker && (
        <div className="bg-white/95 dark:bg-[#170C22]/95 backdrop-blur-xl border border-purple-200/80 dark:border-purple-800/40 p-3 rounded-2xl shadow-museum flex flex-col gap-2 min-w-[190px] mb-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="font-mono text-[9px] uppercase tracking-widest text-purple-900 dark:text-purple-300 font-bold px-2">
            Select Studio Palette
          </span>
          <div className="flex flex-col gap-1">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => handleSelectTheme(t.id)}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-nav transition-all ${
                  currentTheme === t.id
                    ? 'bg-purple-100 dark:bg-purple-900/60 font-bold text-purple-900 dark:text-white'
                    : 'text-purple-900/80 dark:text-purple-200/80 hover:bg-purple-50 dark:hover:bg-purple-950/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-sm"
                    style={{ backgroundColor: t.accent }}
                  />
                  <span>{t.label}</span>
                </div>
                {currentTheme === t.id && <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Unified Floating Controls Bar */}
      <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/90 dark:bg-[#170C22]/90 backdrop-blur-2xl border border-purple-200/80 dark:border-purple-800/50 shadow-[0_8px_32px_rgba(124,58,237,0.14)]">
        {/* WhatsApp Direct */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Direct WhatsApp Contact"
          title="Direct WhatsApp with Rozar Khan"
          className="p-2.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 transition-all border border-emerald-500/20 shadow-sm flex items-center justify-center"
        >
          <MessageCircle size={17} />
        </a>

        {/* Primary CTA: Check Your Date */}
        <Link href={ROUTES.PUBLIC.BOOKING}>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 via-rose-500 to-purple-600 hover:opacity-95 text-white font-nav text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-[0_4px_15px_rgba(225,29,72,0.25)] transition-all">
            <Calendar size={14} className="text-white" />
            <span>Check Your Date</span>
          </button>
        </Link>

        {/* Palette / Theme Switcher */}
        <button
          onClick={() => setShowThemePicker((prev) => !prev)}
          className="p-2.5 rounded-full bg-purple-50 dark:bg-purple-900/40 hover:bg-purple-100 dark:hover:bg-purple-900/70 text-purple-800 dark:text-purple-300 transition-all border border-purple-200/60 dark:border-purple-700/40 flex items-center justify-center"
          title="Change Studio Palette"
          aria-label="Change Studio Color Palette"
        >
          <Palette size={16} />
        </button>

        {/* Light / Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2.5 rounded-full bg-purple-50 dark:bg-purple-900/40 hover:bg-purple-100 dark:hover:bg-purple-900/70 text-purple-800 dark:text-purple-300 transition-all border border-purple-200/60 dark:border-purple-700/40 flex items-center justify-center"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label={isDarkMode ? 'Light Mode' : 'Dark Mode'}
        >
          {isDarkMode ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} />}
        </button>

        {/* Back to Top */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-purple-50 dark:bg-purple-900/40 hover:bg-purple-100 dark:hover:bg-purple-900/70 text-purple-800 dark:text-purple-300 transition-all border border-purple-200/60 dark:border-purple-700/40 flex items-center justify-center animate-in fade-in duration-200"
            title="Scroll to Top"
            aria-label="Scroll to Top"
          >
            <ArrowUp size={16} />
          </button>
        )}
      </div>
    </aside>
  );
};
