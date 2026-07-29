'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Camera, Menu, X } from 'lucide-react';
import { Button } from '@photomagic/ui';
import { ROUTES } from '@photomagic/config';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: ROUTES.PUBLIC.HOME },
    { label: 'Portfolio', href: ROUTES.PUBLIC.PORTFOLIO },
    { label: 'Services', href: '/services' },
    { label: 'Investment', href: ROUTES.PUBLIC.INVESTMENT },
    { label: 'FAQ', href: '/faq' },
    { label: 'Blog', href: '/blog' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-surface-glass/80 backdrop-blur-2xl border-b border-border-subtle">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-text-primary hover:text-gold-500 transition-colors"
        >
          <div className="rounded-full bg-gold-500/10 p-2 text-gold-500 border border-gold-500/20">
            <Camera size={20} />
          </div>
          <span className="font-bold tracking-tight text-lg">PHOTOMAGIC</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-secondary hover:text-gold-500 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link href={ROUTES.PUBLIC.BOOKING}>
            <Button variant="primary" size="sm">
              Inquire / Book
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="md:hidden p-2 text-text-secondary hover:text-text-primary"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-6 px-4 flex flex-col gap-4 border-t border-border-subtle mt-3 bg-surface-base">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-text-secondary hover:text-gold-500"
            >
              {link.label}
            </Link>
          ))}
          <Link href={ROUTES.PUBLIC.BOOKING} onClick={() => setMobileMenuOpen(false)}>
            <Button variant="primary" className="w-full mt-2">
              Inquire / Book Consultation
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
};
