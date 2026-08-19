'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, UserCheck } from 'lucide-react';
import { ROUTES } from '@photomagic/config';

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

  const navLinks = [
    { label: 'Portfolio Showcase', href: ROUTES.PUBLIC.PORTFOLIO },
    { label: 'Services', href: '/services' },
    { label: 'About Studio', href: '/about' },
    { label: 'Font Selector', href: '/font-preview' },
    { label: 'Reserve Date', href: ROUTES.PUBLIC.BOOKING },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-2xl py-3.5 border-b border-purple-200/60 shadow-[0_4px_25px_rgba(124,58,237,0.08)]'
          : 'bg-gradient-to-b from-white/95 via-white/60 to-transparent py-5'
      }`}
    >
      {/* Scroll Progress Purple & Rose Line */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-purple-100/50 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-600 via-rose-500 to-purple-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Studio Hallmark */}
        <Link href="/" className="flex flex-col group">
          <span className="font-hero font-extrabold tracking-[0.25em] text-lg sm:text-xl bg-gradient-to-r from-purple-900 via-purple-700 to-rose-600 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
            PHOTOMAGIC <span className="font-light text-xs sm:text-sm text-purple-900">BY RK</span>
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-rose-600 font-semibold">
            Rozar Khan • Fine Art & Cinema
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-nav text-[11px] uppercase tracking-[0.18em] transition-all duration-200 relative py-1 ${
                  isActive
                    ? 'text-rose-600 font-bold'
                    : 'text-purple-950/80 hover:text-purple-700 font-medium'
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

        {/* Action Controls: Client Portal & Book Studio */}
        <div className="hidden sm:flex items-center gap-5">
          <Link
            href="/portal"
            className="font-nav text-[11px] uppercase tracking-[0.16em] text-purple-900 hover:text-rose-600 font-semibold transition-colors flex items-center gap-1.5"
          >
            <UserCheck size={14} className="text-purple-600" />
            <span>Client Gallery</span>
          </Link>

          <Link href={ROUTES.PUBLIC.BOOKING}>
            <button className="font-nav text-[10px] font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-purple-600 to-rose-500 hover:opacity-95 text-white py-2.5 px-6 rounded-xl shadow-[0_4px_15px_rgba(225,29,72,0.25)] transition-all">
              Book Studio
            </button>
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="lg:hidden p-2 text-purple-900 hover:text-rose-600 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-2xl border-b border-purple-200/70 py-6 px-8 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-nav text-xs uppercase tracking-wider text-purple-950 font-semibold hover:text-rose-600 py-2 border-b border-purple-50"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/portal"
              onClick={() => setMobileMenuOpen(false)}
              className="font-nav text-xs uppercase tracking-wider text-purple-900 font-bold flex items-center gap-2"
            >
              <UserCheck size={15} /> Client Photo Portal
            </Link>
            <Link href={ROUTES.PUBLIC.BOOKING} onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full font-nav text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-purple-600 to-rose-500 text-white py-3 rounded-xl">
                Book Studio Session
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
