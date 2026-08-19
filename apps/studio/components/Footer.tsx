import React from 'react';
import Link from 'next/link';
import { Film, Instagram, Facebook, Mail, Phone, Globe, UserCheck } from 'lucide-react';
import { ROUTES, STUDIO_PROFILE } from '@photomagic/config';

export const Footer: React.FC = () => {
  const osUrl = process.env.NEXT_PUBLIC_OS_URL || 'http://localhost:3001';

  return (
    <footer className="bg-[#FAF5FF] border-t border-purple-200/60 pt-20 pb-12 text-[#6B5B7B] text-xs relative overflow-hidden">
      {/* Subtle Vignette Background */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-rose-300/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        {/* Brand & Ethos Column */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <span className="font-hero font-extrabold tracking-[0.25em] text-lg bg-gradient-to-r from-purple-900 via-purple-700 to-rose-600 bg-clip-text text-transparent">
              PHOTOMAGIC <span className="text-purple-950 font-light text-xs">BY RK</span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-rose-600 font-bold mt-0.5">
              Rozar Khan • Fine Art Atelier
            </span>
          </div>

          <p className="text-xs text-purple-900/80 font-normal leading-relaxed">
            Founded by <strong>Rozar Khan</strong>. Preserving regal wedding unions, Project
            BabyBliss heirloom portraiture, and cinematic 4K films across Chennai, Bangalore, and
            worldwide.
          </p>

          <div className="flex gap-3 mt-2">
            <a
              href="https://instagram.com/rozarkhan_photography"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram Profile"
              title="Rozar Khan Instagram"
              className="p-2.5 rounded-full bg-white hover:bg-purple-100 text-purple-900 hover:text-rose-600 transition-colors border border-purple-200 shadow-sm"
            >
              <Instagram size={15} />
            </a>
            <a
              href="https://facebook.com/rkaephotography"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook Page"
              title="RKae Photography Facebook"
              className="p-2.5 rounded-full bg-white hover:bg-purple-100 text-purple-900 hover:text-rose-600 transition-colors border border-purple-200 shadow-sm"
            >
              <Facebook size={15} />
            </a>
            <a
              href="mailto:hello@batpaiyancatponnu.online"
              aria-label="Send Email Inquiry"
              title="Email Concierge"
              className="p-2.5 rounded-full bg-white hover:bg-purple-100 text-purple-900 hover:text-rose-600 transition-colors border border-purple-200 shadow-sm"
            >
              <Mail size={15} />
            </a>
          </div>
        </div>

        {/* Navigation Column */}
        <div>
          <h4 className="font-nav text-[10px] font-bold text-purple-950 uppercase tracking-[0.2em] mb-4">
            Photography Library
          </h4>
          <ul className="flex flex-col gap-2.5 font-medium text-xs text-purple-900/80">
            <li>
              <Link href={ROUTES.PUBLIC.HOME} className="hover:text-rose-600 transition-colors">
                Studio Entrance
              </Link>
            </li>
            <li>
              <Link
                href={ROUTES.PUBLIC.PORTFOLIO}
                className="hover:text-rose-600 transition-colors"
              >
                Portfolio Showcase
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-rose-600 transition-colors">
                Services & Packages
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-rose-600 transition-colors">
                About Rozar Khan
              </Link>
            </li>
          </ul>
        </div>

        {/* Studio Services */}
        <div>
          <h4 className="font-nav text-[10px] font-bold text-purple-950 uppercase tracking-[0.2em] mb-4">
            Signature Services
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs text-purple-900/80">
            <li>Royal Destination Weddings</li>
            <li>Project BabyBliss & Toddlers</li>
            <li>12x18 Archival Italian Albums</li>
            <li>4K Cinematic Wedding Films</li>
            <li>AI Face Proofing & 8K Vault</li>
          </ul>
        </div>

        {/* Concierge & Contact */}
        <div className="flex flex-col gap-3">
          <h4 className="font-nav text-[10px] font-bold text-purple-950 uppercase tracking-[0.2em] mb-1">
            Studio Concierge
          </h4>
          <p className="text-xs text-purple-900/80 leading-relaxed">
            {STUDIO_PROFILE.contact.address}, {STUDIO_PROFILE.contact.city},{' '}
            {STUDIO_PROFILE.contact.state}
          </p>
          <a
            href={`https://wa.me/${STUDIO_PROFILE.contact.whatsapp.replace(/[^0-9]/g, '')}`}
            className="font-bold text-xs text-rose-600 hover:text-rose-700 transition-colors"
          >
            WhatsApp: {STUDIO_PROFILE.contact.phone}
          </a>
          <a
            href="mailto:hello@batpaiyancatponnu.online"
            className="text-xs text-purple-800 hover:text-rose-600 transition-colors"
          >
            hello@batpaiyancatponnu.online
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-12 pt-6 border-t border-purple-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-purple-800/70">
        <p>
          © {new Date().getFullYear()} PhotoMagic by RK. Directed by Rozar Khan. All rights
          reserved.
        </p>
        <p>Chennai • Bangalore • Kochi • Global Destinations</p>
      </div>
    </footer>
  );
};
