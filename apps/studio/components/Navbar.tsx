'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Calendar, Sparkles, ArrowUpRight, Camera } from 'lucide-react';
import { ROUTES, STUDIO_PROFILE } from '@photomagic/config';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Services', href: '/services' },
    { label: 'Stories', href: '/stories' },
    { label: 'Packages', href: '/packages' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 dark:bg-[#170C22]/95 backdrop-blur-2xl py-3 border-b border-purple-200/60 dark:border-purple-900/40 shadow-[0_4px_25px_rgba(124,58,237,0.06)]'
            : 'bg-gradient-to-b from-white/90 via-white/50 dark:from-[#0D0614]/90 dark:via-[#0D0614]/50 to-transparent py-5'
        }`}
      >
        {/* Scroll Progress Purple & Rose Line */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-purple-100/40 dark:bg-purple-950/40 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-600 via-rose-500 to-gold-400 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Studio Brand Hallmark / Logo Slot */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-700 dark:text-purple-300 shadow-sm group-hover:scale-105 transition-transform">
              <Camera size={16} />
            </div>
            <div className="flex flex-col">
              <span className="font-hero font-extrabold tracking-[0.22em] text-base sm:text-lg bg-gradient-to-r from-purple-950 via-purple-800 to-rose-600 dark:from-purple-100 dark:via-purple-200 dark:to-rose-400 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
                PHOTOMAGIC{' '}
                <span className="font-light text-xs text-purple-900 dark:text-purple-300">
                  STUDIOS BY RK
                </span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-rose-600 dark:text-rose-400 font-semibold">
                {STUDIO_PROFILE.brandLine}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-nav text-[11px] uppercase tracking-[0.18em] transition-all duration-200 relative py-1 ${
                    isActive
                      ? 'text-rose-600 dark:text-rose-400 font-bold'
                      : 'text-slate-800 dark:text-slate-200 hover:text-purple-700 dark:hover:text-purple-300 font-semibold'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600 to-rose-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Controls: My Events (Portal) & Check Your Date */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href={ROUTES.PUBLIC.MY_EVENTS}
              className="font-nav text-[11px] uppercase tracking-[0.16em] text-slate-800 dark:text-slate-200 hover:text-purple-700 dark:hover:text-rose-400 font-semibold transition-colors flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-purple-950/40"
            >
              <Sparkles size={13} className="text-amber-500" />
              <span>My Events</span>
            </Link>

            <Link href={ROUTES.PUBLIC.BOOKING}>
              <button className="font-nav text-[10px] font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-purple-700 via-rose-600 to-purple-700 hover:opacity-95 text-white py-2.5 px-5 rounded-xl shadow-[0_4px_15px_rgba(225,29,72,0.22)] transition-all flex items-center gap-2">
                <Calendar size={13} />
                <span>Check Your Date</span>
              </button>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-slate-900 dark:text-white hover:text-rose-600 transition-colors"
            aria-label="Open mobile menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Experience */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#0E0617] text-white flex flex-col justify-between p-8 sm:p-12 animate-in fade-in duration-300">
          {/* Top Header inside overlay */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div className="flex flex-col">
              <span className="font-hero font-extrabold tracking-[0.25em] text-lg bg-gradient-to-r from-purple-200 to-rose-300 bg-clip-text text-transparent">
                PHOTOMAGIC STUDIOS
              </span>
              <span className="font-tamil text-xs text-purple-300 mt-1 font-normal">
                {STUDIO_PROFILE.tamilStatement}
              </span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close mobile menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Nav List with Creative Typography */}
          <nav className="flex flex-col gap-5 my-auto py-6">
            {navLinks.map((link, idx) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-baseline justify-between border-b border-white/10 pb-3"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-rose-400 font-semibold">0{idx + 1}</span>
                  <span className="font-hero text-2xl sm:text-3xl font-bold tracking-wider text-purple-100 group-hover:text-rose-400 group-hover:translate-x-2 transition-all">
                    {link.label}
                  </span>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-white/40 group-hover:text-rose-400 transition-colors"
                />
              </Link>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
            <Link
              href={ROUTES.PUBLIC.MY_EVENTS}
              onClick={() => setMobileMenuOpen(false)}
              className="font-nav text-xs uppercase tracking-[0.2em] text-purple-200 font-semibold flex items-center justify-center gap-2 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition-colors"
            >
              <Sparkles size={14} className="text-gold-400" />
              <span>Access My Events Portal</span>
            </Link>

            <Link href={ROUTES.PUBLIC.BOOKING} onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full font-nav text-xs font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-purple-600 via-rose-500 to-purple-600 text-white py-3.5 rounded-xl shadow-[0_4px_20px_rgba(225,29,72,0.3)]">
                Check Your Date Availability
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
