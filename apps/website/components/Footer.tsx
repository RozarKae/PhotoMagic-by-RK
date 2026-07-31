import React from 'react';
import Link from 'next/link';
import { Camera, Instagram, Facebook, Mail, Phone, Globe } from 'lucide-react';
import { ROUTES } from '@photomagic/config';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-canvas border-t border-gold-500/20 pt-20 pb-16 text-silver text-xs">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-ivory">
            <div className="rounded-full bg-gold-500/10 p-2 text-gold-500 border border-gold-500/30">
              <Camera size={18} />
            </div>
            <span className="font-hero font-bold tracking-widest text-base">
              PHOTOMAGIC ATELIER
            </span>
          </div>
          <p className="text-xs text-silver font-light leading-relaxed">
            International fine art studio & royal heritage photography atelier. Documenting legacy
            across Udaipur, Paris, Beverly Hills, and London.
          </p>
          <div className="flex gap-4 text-silver mt-2">
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
          <h4 className="font-nav text-[10px] font-semibold text-gold-500 uppercase tracking-widest mb-4">
            Museum Exhibition
          </h4>
          <ul className="flex flex-col gap-3 font-light">
            <li>
              <Link href={ROUTES.PUBLIC.HOME} className="hover:text-ivory transition-colors">
                Exhibition Entrance
              </Link>
            </li>
            <li>
              <Link href={ROUTES.PUBLIC.PORTFOLIO} className="hover:text-ivory transition-colors">
                Curated Portfolio Archive
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-ivory transition-colors">
                Atelier Photography Services
              </Link>
            </li>
            <li>
              <Link href={ROUTES.PUBLIC.INVESTMENT} className="hover:text-ivory transition-colors">
                Commissions & Collections
              </Link>
            </li>
          </ul>
        </div>

        {/* Client Access Column */}
        <div>
          <h4 className="font-nav text-[10px] font-semibold text-gold-500 uppercase tracking-widest mb-4">
            Private Client Portal
          </h4>
          <ul className="flex flex-col gap-3 font-light">
            <li>
              <a href="http://localhost:3001" className="hover:text-ivory transition-colors">
                Client Portal Sign In
              </a>
            </li>
            <li>
              <a
                href="http://localhost:3001/gallery"
                className="hover:text-ivory transition-colors"
              >
                Spatial Proofing Galleries
              </a>
            </li>
            <li>
              <a href="http://localhost:3001/album" className="hover:text-ivory transition-colors">
                3D Album Co-Design Hub
              </a>
            </li>
            <li>
              <a href="http://localhost:3002/admin" className="hover:text-ivory transition-colors">
                Executive Command Center
              </a>
            </li>
          </ul>
        </div>

        {/* Global Ateliers Column */}
        <div className="flex flex-col gap-3">
          <h4 className="font-nav text-[10px] font-semibold text-gold-500 uppercase tracking-widest mb-4">
            Global Residence
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

      <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-16 pt-8 border-t border-gold-500/10 flex flex-col sm:flex-row justify-between items-center font-mono text-[11px] text-bronze">
        <p>© {new Date().getFullYear()} PhotoMagic Studio OS. All rights reserved.</p>
        <div className="flex gap-6 mt-3 sm:mt-0">
          <Link href="/privacy" className="hover:text-silver transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-silver transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};
