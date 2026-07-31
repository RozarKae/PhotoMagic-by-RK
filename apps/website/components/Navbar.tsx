'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Camera, Menu, X } from 'lucide-react';
import { Button } from '@photomagic/ui';
import { ROUTES } from '@photomagic/config';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Exhibition', href: ROUTES.PUBLIC.HOME },
    { label: 'Portfolio', href: ROUTES.PUBLIC.PORTFOLIO },
    { label: 'Atelier Services', href: '/services' },
    { label: 'Investment', href: ROUTES.PUBLIC.INVESTMENT },
    { label: 'Faq', href: '/faq' },
    { label: 'Journal', href: '/blog' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-canvas/80 backdrop-blur-2xl border-b border-gold-500/20 transition-all duration-300">
      {/* Scroll Progress Indicator Line */}
      <div className="w-full bg-canvas h-[1px] overflow-hidden">
        <div
          className="bg-gold-500 h-full transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Master Brand Hallmark */}
        <Link
          href="/"
          className="flex items-center gap-3 text-ivory hover:text-gold-500 transition-colors group"
        >
          <div className="rounded-full bg-gold-500/10 p-2 text-gold-500 border border-gold-500/30 group-hover:border-gold-500 transition-colors">
            <Camera size={18} />
          </div>
          <div className="flex flex-col">
            <span className="font-hero font-bold tracking-widest text-base leading-none">
              PHOTOMAGIC
            </span>
            <span className="font-nav text-[9px] uppercase tracking-widest text-gold-500 font-semibold mt-1">
              International Fine Art Atelier
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-nav text-[11px] font-semibold uppercase tracking-widest transition-all relative py-1 ${
                  isActive ? 'text-gold-500' : 'text-silver hover:text-ivory'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link href={ROUTES.PUBLIC.BOOKING}>
            <Button variant="primary" size="sm" className="font-bold tracking-widest shadow-watch">
              Commission Inquiry
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="md:hidden p-2 text-silver hover:text-ivory focus:outline-none"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden py-6 px-6 flex flex-col gap-4 border-t border-gold-500/20 bg-canvas/95 backdrop-blur-2xl transition-all">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-nav text-xs font-semibold uppercase tracking-widest py-1 transition-colors ${
                  isActive ? 'text-gold-500' : 'text-silver hover:text-ivory'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href={ROUTES.PUBLIC.BOOKING} onClick={() => setMobileMenuOpen(false)}>
            <Button variant="primary" className="w-full mt-2 font-bold tracking-widest">
              Commission Inquiry
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
};
