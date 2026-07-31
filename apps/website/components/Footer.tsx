import React from 'react';
import Link from 'next/link';
import { Camera, Instagram, Facebook, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { ROUTES } from '@photomagic/config';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-base border-t border-border-subtle pt-16 pb-12 text-text-secondary text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-text-primary">
            <div className="rounded-full bg-gold-500/10 p-2 text-gold-500 border border-gold-500/20">
              <Camera size={20} />
            </div>
            <span className="font-bold tracking-tight text-lg">PHOTOMAGIC STUDIO</span>
          </div>
          <p className="text-xs text-text-tertiary leading-relaxed font-light">
            Capturing timeless elegance, royal heritage weddings, and haute couture portraiture with
            uncompromising visual luxury.
          </p>
          <div className="flex gap-4 text-text-secondary mt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:text-gold-500 transition-colors"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="hover:text-gold-500 transition-colors"
            >
              <Facebook size={18} />
            </a>
            <a
              href="mailto:concierge@photomagic.studio"
              aria-label="Email"
              className="hover:text-gold-500 transition-colors"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Navigation Column */}
        <div>
          <h4 className="font-semibold text-text-primary uppercase tracking-widest text-[10px] mb-4 text-gold-500">
            Explore Studio
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs font-light">
            <li>
              <Link href={ROUTES.PUBLIC.HOME} className="hover:text-gold-500 transition-colors">
                Home Portfolio
              </Link>
            </li>
            <li>
              <Link
                href={ROUTES.PUBLIC.PORTFOLIO}
                className="hover:text-gold-500 transition-colors"
              >
                Curated Stories
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-gold-500 transition-colors">
                Concierge Services
              </Link>
            </li>
            <li>
              <Link
                href={ROUTES.PUBLIC.INVESTMENT}
                className="hover:text-gold-500 transition-colors"
              >
                Collections & Investment
              </Link>
            </li>
          </ul>
        </div>

        {/* Client Access Column */}
        <div>
          <h4 className="font-semibold text-text-primary uppercase tracking-widest text-[10px] mb-4 text-gold-500">
            Client Access
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs font-light">
            <li>
              <a href="http://localhost:3000" className="hover:text-gold-500 transition-colors">
                Client Portal Sign In
              </a>
            </li>
            <li>
              <a
                href="http://localhost:3000/gallery"
                className="hover:text-gold-500 transition-colors"
              >
                Smart Proofing Galleries
              </a>
            </li>
            <li>
              <a
                href="http://localhost:3000/album"
                className="hover:text-gold-500 transition-colors"
              >
                Album Approval Hub
              </a>
            </li>
            <li>
              <a
                href="http://localhost:1314/admin"
                className="hover:text-gold-500 transition-colors"
              >
                Studio Command Center
              </a>
            </li>
          </ul>
        </div>

        {/* Global Ateliers Column */}
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-text-primary uppercase tracking-widest text-[10px] mb-4 text-gold-500">
            Global Ateliers
          </h4>
          <div className="flex items-center gap-2 text-xs font-light">
            <Globe size={14} className="text-gold-500 flex-shrink-0" />
            <span>Udaipur • Beverly Hills • London • Paris</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-light">
            <Phone size={14} className="text-gold-500 flex-shrink-0" />
            <span>+1 (800) 555-MAGIC / +91 98765 43210</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-light">
            <Mail size={14} className="text-gold-500 flex-shrink-0" />
            <span>concierge@photomagic.studio</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-border-subtle flex flex-col sm:flex-row justify-between items-center text-xs text-text-tertiary font-mono">
        <p>© {new Date().getFullYear()} PhotoMagic Studio OS. All rights reserved.</p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <Link href="/privacy" className="hover:text-text-secondary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-text-secondary transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};
