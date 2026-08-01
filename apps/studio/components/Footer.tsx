import React from 'react';
import Link from 'next/link';
import { Sparkles, Instagram, Facebook, Mail, Phone, Globe, UserCheck } from 'lucide-react';
import { ROUTES } from '@photomagic/config';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#08080A] border-t border-amber-500/20 pt-24 pb-12 text-gray-400 text-xs relative overflow-hidden">
      {/* Soft Vignette Background */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        {/* Brand & Ethos Column */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <span className="font-hero font-bold tracking-[0.3em] text-lg text-gold-gradient">
              PHOTOMAGIC
            </span>
            <span className="font-nav text-[9px] uppercase tracking-[0.25em] text-gray-400 font-medium mt-0.5">
              International Fine Art Atelier
            </span>
          </div>

          <p className="text-xs text-gray-400 font-light leading-relaxed">
            International fine art photography & 8K cinema studio documenting human legacies across
            Udaipur, Paris, Beverly Hills, and London.
          </p>

          <div className="flex gap-4 text-gray-400 mt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 hover:text-amber-400 transition-colors border border-amber-500/10"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 hover:text-amber-400 transition-colors border border-amber-500/10"
            >
              <Facebook size={16} />
            </a>
            <a
              href="mailto:concierge@photomagic.studio"
              aria-label="Email"
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 hover:text-amber-400 transition-colors border border-amber-500/10"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        {/* Navigation Column */}
        <div>
          <h4 className="font-nav text-[10px] font-bold text-amber-400 uppercase tracking-[0.25em] mb-5">
            Curated Exhibition
          </h4>
          <ul className="flex flex-col gap-3 font-light text-xs text-gray-300">
            <li>
              <Link href={ROUTES.PUBLIC.HOME} className="hover:text-amber-300 transition-colors">
                Exhibition Entrance
              </Link>
            </li>
            <li>
              <Link
                href={ROUTES.PUBLIC.PORTFOLIO}
                className="hover:text-amber-300 transition-colors"
              >
                Master Story Portfolio
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-amber-300 transition-colors">
                Atelier Collections & Scope
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-amber-300 transition-colors">
                Brand Ethos & Artisans
              </Link>
            </li>
          </ul>
        </div>

        {/* Client Access Column (Separated PhotoMagic OS!) */}
        <div>
          <h4 className="font-nav text-[10px] font-bold text-amber-400 uppercase tracking-[0.25em] mb-5 flex items-center gap-2">
            <UserCheck size={12} className="text-amber-400" />
            <span>Private Client Portal</span>
          </h4>
          <ul className="flex flex-col gap-3 font-light text-xs text-gray-300">
            <li>
              <a
                href="http://localhost:3001"
                className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
              >
                <span>Client Login (PhotoMagic OS)</span>
              </a>
            </li>
            <li>
              <a
                href="http://localhost:3001/gallery"
                className="hover:text-amber-300 transition-colors"
              >
                Private Spatial Proofing
              </a>
            </li>
            <li>
              <a
                href="http://localhost:3001/album"
                className="hover:text-amber-300 transition-colors"
              >
                3D Heirloom Album Studio
              </a>
            </li>
            <li>
              <a
                href="http://localhost:3002/admin"
                className="hover:text-amber-300 transition-colors"
              >
                Executive Atelier Command
              </a>
            </li>
          </ul>
        </div>

        {/* Global Ateliers Column */}
        <div className="flex flex-col gap-3.5">
          <h4 className="font-nav text-[10px] font-bold text-amber-400 uppercase tracking-[0.25em] mb-5">
            Global Residences
          </h4>
          <div className="flex items-center gap-3 text-xs text-gray-300 font-light">
            <Globe size={14} className="text-amber-400 flex-shrink-0" />
            <span>Udaipur • Beverly Hills • London • Paris</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-300 font-light">
            <Phone size={14} className="text-amber-400 flex-shrink-0" />
            <span>+1 (800) 555-MAGIC / +91 98765 43210</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-300 font-light">
            <Mail size={14} className="text-amber-400 flex-shrink-0" />
            <span>concierge@photomagic.studio</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-[11px] text-gray-400 font-light relative z-10">
        <p>© {new Date().getFullYear()} PhotoMagic Studio. All rights reserved.</p>
        <div className="flex gap-6 mt-3 sm:mt-0">
          <Link href="/privacy" className="hover:text-gray-200 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-gray-200 transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};
