'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, UserCheck } from 'lucide-react';
import { Button } from '@photomagic/ui';
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
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Exhibition', href: ROUTES.PUBLIC.HOME },
    { label: 'Portfolio', href: ROUTES.PUBLIC.PORTFOLIO },
    { label: 'Services', href: '/services' },
    { label: 'About Studio', href: '/about' },
    { label: 'Inquiry', href: ROUTES.PUBLIC.BOOKING },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0A0A0C]/90 backdrop-blur-2xl py-4 border-b border-amber-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6'
      }`}
    >
      {/* Scroll Progress Gold Line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-white/5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-amber-200 to-amber-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Fine Art Hallmark */}
        <Link href="/" className="flex flex-col group">
          <span className="font-hero font-bold tracking-[0.3em] text-lg sm:text-xl text-gold-gradient group-hover:opacity-90 transition-opacity">
            PHOTOMAGIC
          </span>
          <span className="font-nav text-[9px] uppercase tracking-[0.25em] text-gray-400 font-medium">
            International Fine Art Atelier
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-nav text-[10px] uppercase tracking-[0.22em] transition-all duration-300 relative py-1 ${
                  isActive ? 'text-amber-400 font-semibold' : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-amber-400 to-amber-200" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls: Client Portal Login & Commission Inquiry */}
        <div className="hidden sm:flex items-center gap-6">
          <a
            href="http://localhost:3001"
            className="font-nav text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-amber-300 transition-colors flex items-center gap-1.5"
          >
            <UserCheck size={13} className="text-amber-400/80" />
            <span>Client Login</span>
          </a>

          <Link href={ROUTES.PUBLIC.BOOKING}>
            <Button
              variant="primary"
              size="sm"
              className="font-nav text-[9px] font-bold uppercase tracking-[0.25em] bg-gradient-to-r from-amber-500 via-[#F8F3E6] to-amber-400 text-black border border-amber-300/40 shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_30px_rgba(212,175,55,0.45)] transition-all duration-300 py-2.5 px-5"
            >
              Commission Inquiry
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
          className="lg:hidden p-2 text-gray-300 hover:text-white focus:outline-none"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-6 py-8 flex flex-col gap-5 bg-[#0A0A0C]/98 border-b border-amber-500/20 backdrop-blur-3xl animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-nav text-xs font-semibold uppercase tracking-[0.2em] py-2 transition-colors ${
                  isActive ? 'text-amber-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <a
              href="http://localhost:3001"
              className="font-nav text-xs uppercase tracking-[0.2em] text-gray-300 hover:text-amber-400 py-2 flex items-center gap-2"
            >
              <UserCheck size={14} className="text-amber-400" />
              <span>Client Portal Login (PhotoMagic OS)</span>
            </a>
            <Link href={ROUTES.PUBLIC.BOOKING} onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="primary"
                className="w-full font-nav text-xs font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-amber-500 to-amber-400 text-black py-3"
              >
                Commission Inquiry
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
