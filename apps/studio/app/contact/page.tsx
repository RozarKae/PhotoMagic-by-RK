'use client';

import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { STUDIO_PROFILE, ROUTES } from '@photomagic/config';
import {
  Phone,
  MessageCircle,
  Mail,
  Instagram,
  Facebook,
  MapPin,
  Calendar,
  Send,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappUrl = `https://wa.me/91${STUDIO_PROFILE.contact.phone}?text=Hello%20PhotoMagic%20Studios%2C%20I%20would%20like%20to%20inquire%20about%20availability.`;

  return (
    <div className="min-h-screen bg-[var(--color-canvas,#FFF5F7)] text-[var(--color-text-primary,#1E0A3C)] flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="flex-1 pt-36 pb-24 px-6 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-nav text-[10px] uppercase tracking-[0.28em] text-rose-600 dark:text-rose-400 font-bold block mb-2">
            Studio Concierge
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-purple-950 dark:text-purple-50 tracking-tight">
            Connect with PhotoMagic
          </h1>
          <p className="font-tamil text-xs sm:text-sm text-purple-800 dark:text-purple-300 mt-2 font-medium">
            இல்லத்தின் இன்ப நிகழ்வுகள், விழிகளின் வழியே
          </p>
          <p className="text-xs sm:text-sm text-purple-900/80 dark:text-purple-300/80 mt-3 font-normal">
            Direct communication for weddings, milestone celebrations, fashion editorials, and
            family portraiture across South India and nationwide.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Details Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Primary WhatsApp Card */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
                  <MessageCircle size={22} />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-300 font-bold block">
                    Instant WhatsApp Concierge
                  </span>
                  <span className="text-base font-bold text-emerald-950 dark:text-emerald-100 font-mono">
                    +91 {STUDIO_PROFILE.contact.phone}
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                Chat Now →
              </span>
            </a>

            {/* Direct Phone */}
            <a
              href={`tel:${STUDIO_PROFILE.contact.phone}`}
              className="p-6 rounded-3xl bg-white dark:bg-[#170C22] border border-purple-200/80 dark:border-purple-800/40 shadow-sm flex items-center gap-4 hover:border-rose-400 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center justify-center">
                <Phone size={20} />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-purple-700 dark:text-purple-400 font-bold block">
                  Studio Phone
                </span>
                <span className="text-base font-bold text-purple-950 dark:text-purple-100 font-mono">
                  +91 {STUDIO_PROFILE.contact.phone}
                </span>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${STUDIO_PROFILE.contact.email}`}
              className="p-6 rounded-3xl bg-white dark:bg-[#170C22] border border-purple-200/80 dark:border-purple-800/40 shadow-sm flex items-center gap-4 hover:border-rose-400 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center justify-center">
                <Mail size={20} />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-purple-700 dark:text-purple-400 font-bold block">
                  Electronic Mail
                </span>
                <span className="text-sm font-semibold text-purple-950 dark:text-purple-100">
                  {STUDIO_PROFILE.contact.email}
                </span>
              </div>
            </a>

            {/* Social Profiles */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#170C22] border border-purple-200/80 dark:border-purple-800/40 shadow-sm flex flex-col gap-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-rose-600 dark:text-rose-400 font-bold">
                Social Atelier
              </span>
              <div className="flex flex-col gap-3">
                <a
                  href={STUDIO_PROFILE.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-xs text-purple-950 dark:text-purple-200 hover:text-rose-600 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Instagram size={16} className="text-rose-500" />
                    <span>Instagram: @rkae_photographs</span>
                  </div>
                  <span className="font-mono text-[10px] text-purple-500">Visit →</span>
                </a>
                <a
                  href={STUDIO_PROFILE.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-xs text-purple-950 dark:text-purple-200 hover:text-rose-600 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Facebook size={16} className="text-blue-500" />
                    <span>Facebook: Rozar Khan</span>
                  </div>
                  <span className="font-mono text-[10px] text-purple-500">Visit →</span>
                </a>
              </div>
            </div>

            {/* Regions Served */}
            <div className="p-6 rounded-3xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/40 text-xs">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold font-mono text-[10px] uppercase mb-1">
                <MapPin size={13} />
                <span>Geographic Scope</span>
              </div>
              <p className="text-purple-900/90 dark:text-purple-200/90">
                {STUDIO_PROFILE.contact.regionsServed}
              </p>
            </div>
          </div>

          {/* Right Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#170C22] border border-purple-200/80 dark:border-purple-800/40 shadow-museum">
              {submitted ? (
                <div className="text-center py-12 flex flex-col items-center gap-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-bold font-hero text-purple-950 dark:text-white">
                    Inquiry Transmitted
                  </h3>
                  <p className="text-xs sm:text-sm text-purple-800 dark:text-purple-300 max-w-sm">
                    Thank you {name}. Our studio concierge desk will contact you via WhatsApp /
                    Phone within 4 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <h2 className="text-2xl font-bold font-hero text-purple-950 dark:text-purple-50">
                      Send Direct Message
                    </h2>
                    <p className="text-xs text-purple-800 dark:text-purple-300 mt-1">
                      Fill in your details or use our interactive 7-step date booking flow.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-purple-950 dark:text-purple-200 block mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ananya Sundaram"
                        className="w-full text-xs px-4 py-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-purple-950 dark:text-purple-200 block mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 7904943234"
                        className="w-full text-xs px-4 py-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-purple-950 dark:text-purple-200 block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. ananya@example.com"
                        className="w-full text-xs px-4 py-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-purple-950 dark:text-purple-200 block mb-1">
                        Tentative Event Date
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full text-xs px-4 py-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-purple-950 dark:text-purple-200 block mb-1">
                        Your Event Vision or Questions
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about the city, venue, and cultural ceremonies you are planning..."
                        className="w-full text-xs px-4 py-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-rose-500 to-purple-600 hover:opacity-95 text-white font-nav text-xs font-bold uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Transmit Message to Concierge</span>
                    <Send size={14} />
                  </button>

                  <div className="text-center pt-2">
                    <Link
                      href={ROUTES.PUBLIC.BOOKING}
                      className="text-xs font-mono text-purple-700 dark:text-purple-400 hover:text-rose-600 dark:hover:text-rose-400 font-semibold"
                    >
                      Or use the 7-step interactive Check Your Date flow →
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
