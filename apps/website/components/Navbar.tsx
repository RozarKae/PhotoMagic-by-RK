'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Camera, Menu, X, Sparkles } from 'lucide-react';
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
    { label: 'Home', href: ROUTES.PUBLIC.HOME },
    { label: 'Portfolio', href: ROUTES.PUBLIC.PORTFOLIO },
    { label: 'Services', href: '/services' },
    { label: 'Investment', href: ROUTES.PUBLIC.INVESTMENT },
    { label: 'FAQ', href: '/faq' },
    { label: 'Blog', href: '/blog' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-glass/90 backdrop-blur-2xl border-b border-border-subtle transition-all duration-300">
      {/* Scroll Progress Bar */}
      <div className="w-full bg-surface-base h-0.5 overflow-hidden">
        <div
          className="bg-gold-500 h-full transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-text-primary hover:text-gold-500 transition-colors group"
        >
          <div className="rounded-full bg-gold-500/10 p-2 text-gold-500 border border-gold-500/20 group-hover:scale-105 transition-transform">
            <Camera size={20} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-lg leading-none">PHOTOMAGIC</span>
            <span className="text-[9px] uppercase tracking-widest text-gold-500 font-semibold mt-0.5">
              Luxury Studio
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
                className={`text-sm font-medium transition-all relative py-1 ${
                  isActive ? 'text-gold-500 font-bold' : 'text-text-secondary hover:text-gold-500'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link href={ROUTES.PUBLIC.BOOKING}>
            <Button variant="primary" size="sm" className="font-bold tracking-wide shadow-gold">
              Inquire Consultation
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="md:hidden p-2 text-text-secondary hover:text-text-primary focus:outline-none"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden py-6 px-6 flex flex-col gap-4 border-t border-border-subtle bg-surface-base/95 backdrop-blur-2xl transition-all">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium py-1 transition-colors ${
                  isActive ? 'text-gold-500 font-bold' : 'text-text-secondary hover:text-gold-500'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href={ROUTES.PUBLIC.BOOKING} onClick={() => setMobileMenuOpen(false)}>
            <Button variant="primary" className="w-full mt-2 font-bold">
              Inquire Consultation
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
};
