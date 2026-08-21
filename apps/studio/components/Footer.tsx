import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Mail, Phone, MapPin, Sparkles, Camera } from 'lucide-react';
import { ROUTES, STUDIO_PROFILE } from '@photomagic/config';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAF8FC] dark:bg-[#0E0617] border-t border-slate-200/80 dark:border-purple-900/40 pt-20 pb-12 text-slate-700 dark:text-slate-300 text-xs relative overflow-hidden transition-colors duration-300">
      {/* Subtle Pastel Ambient Highlights */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-200/20 dark:bg-purple-900/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-rose-200/20 dark:bg-rose-900/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        {/* Brand & Ethos Column */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <span className="font-hero font-extrabold tracking-[0.22em] text-lg bg-gradient-to-r from-slate-900 via-purple-900 to-rose-700 dark:from-white dark:via-purple-200 dark:to-rose-400 bg-clip-text text-transparent">
              PHOTOMAGIC{' '}
              <span className="text-slate-900 dark:text-purple-300 font-light text-xs">
                STUDIOS BY RK
              </span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-rose-700 dark:text-rose-400 font-bold mt-0.5">
              {STUDIO_PROFILE.brandLine}
            </span>
          </div>

          <p className="font-tamil text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
            {STUDIO_PROFILE.tamilStatement}
          </p>

          <p className="text-xs text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            {STUDIO_PROFILE.positioning}
          </p>

          {/* Social Icons */}
          <div className="flex gap-3 mt-2">
            <a
              href={STUDIO_PROFILE.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram Profile"
              title="Instagram @rkae_photographs"
              className="p-2.5 rounded-full bg-white dark:bg-purple-950/60 hover:bg-rose-50 text-slate-800 dark:text-slate-200 hover:text-rose-600 transition-colors border border-slate-200 dark:border-purple-800 shadow-sm"
            >
              <Instagram size={15} />
            </a>
            <a
              href={STUDIO_PROFILE.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook Profile"
              title="Facebook Rozar Khan"
              className="p-2.5 rounded-full bg-white dark:bg-purple-950/60 hover:bg-purple-50 text-slate-800 dark:text-slate-200 hover:text-purple-700 transition-colors border border-slate-200 dark:border-purple-800 shadow-sm"
            >
              <Facebook size={15} />
            </a>
            <a
              href={`mailto:${STUDIO_PROFILE.contact.email}`}
              aria-label="Send Email Inquiry"
              title={`Email ${STUDIO_PROFILE.contact.email}`}
              className="p-2.5 rounded-full bg-white dark:bg-purple-950/60 hover:bg-sky-50 text-slate-800 dark:text-slate-200 hover:text-sky-700 transition-colors border border-slate-200 dark:border-purple-800 shadow-sm"
            >
              <Mail size={15} />
            </a>
          </div>
        </div>

        {/* Navigation Column */}
        <div>
          <h4 className="font-nav text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-[0.2em] mb-4">
            Navigation
          </h4>
          <ul className="flex flex-col gap-2.5 font-medium text-xs text-slate-700 dark:text-slate-300">
            <li>
              <Link
                href={ROUTES.PUBLIC.HOME}
                className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
              >
                About PhotoMagic
              </Link>
            </li>
            <li>
              <Link
                href={ROUTES.PUBLIC.PORTFOLIO}
                className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
              >
                Portfolio Showcase
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
              >
                Services & Coverage
              </Link>
            </li>
            <li>
              <Link
                href="/stories"
                className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
              >
                Visual Stories
              </Link>
            </li>
            <li>
              <Link
                href="/packages"
                className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
              >
                Collections & Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
              >
                Contact Studio
              </Link>
            </li>
          </ul>
        </div>

        {/* Photography Categories */}
        <div>
          <h4 className="font-nav text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-[0.2em] mb-4">
            Photography Categories
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              Weddings & Muhurthams
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Pre-Weddings & Engagements
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Baby Shower (Valaikappu)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              1st Birthday & Baby Milestones
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              Couple Portraits & Silhouettes
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              Maternity & Motherhood
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              Commercial & Product Artifacts
            </li>
          </ul>
        </div>

        {/* Concierge & Contact */}
        <div className="flex flex-col gap-3">
          <h4 className="font-nav text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-[0.2em] mb-1">
            Studio Concierge
          </h4>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex items-center gap-1.5">
            <MapPin size={14} className="text-rose-600 flex-shrink-0" />
            <span>{STUDIO_PROFILE.contact.regionsServed}</span>
          </p>
          <a
            href={`tel:${STUDIO_PROFILE.contact.phone}`}
            className="font-bold text-xs text-slate-900 dark:text-white hover:text-rose-600 dark:hover:text-rose-400 transition-colors flex items-center gap-1.5"
          >
            <Phone size={14} className="text-purple-700 dark:text-purple-400" />
            <span>{STUDIO_PROFILE.contact.phone}</span>
          </a>
          <a
            href={`https://wa.me/91${STUDIO_PROFILE.contact.phone}`}
            target="_blank"
            rel="noreferrer"
            className="font-bold text-xs text-emerald-700 dark:text-emerald-400 hover:opacity-80 transition-opacity"
          >
            WhatsApp: +91 {STUDIO_PROFILE.contact.phone}
          </a>
          <a
            href={`mailto:${STUDIO_PROFILE.contact.email}`}
            className="text-xs text-slate-700 dark:text-slate-300 hover:text-rose-600 transition-colors"
          >
            {STUDIO_PROFILE.contact.email}
          </a>

          <div className="pt-2">
            <Link
              href={ROUTES.PUBLIC.MY_EVENTS}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-purple-950/60 border border-slate-200 dark:border-purple-800 text-[11px] font-nav font-semibold text-slate-900 dark:text-slate-200 hover:text-rose-600 shadow-sm"
            >
              <Sparkles size={12} className="text-amber-500" />
              <span>Client Portal (My Events)</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Copyright */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-12 pt-6 border-t border-slate-200/80 dark:border-purple-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-600 dark:text-slate-400 font-mono">
        <p>© 2026 PhotoMagic Studios by RK. All Rights Reserved.</p>
        <p>Tamil Nadu · Pondicherry · Kerala · India</p>
      </div>
    </footer>
  );
};
