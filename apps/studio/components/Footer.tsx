import React from 'react';
import Link from 'next/link';
import { Film, Instagram, Facebook, Mail, Phone, Globe, UserCheck } from 'lucide-react';
import { ROUTES } from '@photomagic/config';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#090909] border-t border-gold-500/20 pt-24 pb-12 text-silver text-xs relative overflow-hidden">
      {/* Subtle Vignette Background */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        {/* Brand & Ethos Column */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <span className="font-hero font-bold tracking-[0.3em] text-lg text-gold-gradient">
              PHOTOMAGIC
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-gold-500 font-medium mt-0.5">
              Cinematic Film Studio
            </span>
          </div>

          <p className="text-xs text-silver/80 font-light leading-relaxed">
            Luxury photography & cinematic motion studio preserving weddings as blockbuster
            productions across Udaipur, Paris, Beverly Hills, and Lake Como.
          </p>

          <div className="flex gap-4 text-silver mt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 hover:text-gold-400 transition-colors border border-gold-500/20"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 hover:text-gold-400 transition-colors border border-gold-500/20"
            >
              <Facebook size={16} />
            </a>
            <a
              href="mailto:concierge@photomagic.studio"
              aria-label="Email"
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 hover:text-gold-400 transition-colors border border-gold-500/20"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        {/* Navigation Column */}
        <div>
          <h4 className="font-nav text-[10px] font-bold text-gold-400 uppercase tracking-[0.25em] mb-5">
            Cinematic Library
          </h4>
          <ul className="flex flex-col gap-3 font-light text-xs text-silver/90">
            <li>
              <Link href={ROUTES.PUBLIC.HOME} className="hover:text-gold-300 transition-colors">
                Studio Entrance
              </Link>
            </li>
            <li>
              <Link
                href={ROUTES.PUBLIC.PORTFOLIO}
                className="hover:text-gold-300 transition-colors"
              >
                Feature Films & Trailers
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-gold-300 transition-colors">
                Production Services & Scope
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gold-300 transition-colors">
                Director's Ethos & Crew
              </Link>
            </li>
          </ul>
        </div>

        {/* Client Access Column */}
        <div>
          <h4 className="font-nav text-[10px] font-bold text-gold-400 uppercase tracking-[0.25em] mb-5 flex items-center gap-2">
            <UserCheck size={12} className="text-gold-400" />
            <span>Private Screening Room</span>
          </h4>
          <ul className="flex flex-col gap-3 font-light text-xs text-silver/90">
            <li>
              <a
                href="/portal"
                className="hover:text-gold-300 transition-colors flex items-center gap-1.5"
              >
                <span>Client Screening Room</span>
              </a>
            </li>
            <li>
              <a href="/portal" className="hover:text-gold-300 transition-colors">
                Scenes & Rushes Proofing
              </a>
            </li>
            <li>
              <a href="/portal" className="hover:text-gold-300 transition-colors">
                Final Cut Approval Suite
              </a>
            </li>
            <li>
              <a href="/admin" className="hover:text-gold-300 transition-colors">
                Studio Production HUD
              </a>
            </li>
          </ul>
        </div>

        {/* Global Ateliers Column */}
        <div className="flex flex-col gap-3.5">
          <h4 className="font-nav text-[10px] font-bold text-gold-400 uppercase tracking-[0.25em] mb-5">
            Production Headquarters
          </h4>
          <div className="flex items-center gap-3 text-xs text-silver/90 font-light">
            <Globe size={14} className="text-gold-400 flex-shrink-0" />
            <span>Udaipur • Beverly Hills • London • Paris</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-silver/90 font-light">
            <Phone size={14} className="text-gold-400 flex-shrink-0" />
            <span>+1 (800) 555-FILM / +91 98765 43210</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-silver/90 font-light">
            <Mail size={14} className="text-gold-400 flex-shrink-0" />
            <span>concierge@photomagic.studio</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-[11px] text-silver/70 font-light relative z-10">
        <p>© {new Date().getFullYear()} PhotoMagic Studio. All rights reserved.</p>
        <div className="flex gap-6 mt-3 sm:mt-0">
          <Link href="/privacy" className="hover:text-gold-300 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-gold-300 transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};
