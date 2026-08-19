'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Sparkles, MessageCircle, X } from 'lucide-react';
import { STUDIO_PROFILE } from '@photomagic/config';

export const CornerArtistMascot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside
      aria-label="Lead Artist Concierge"
      className="fixed bottom-0 left-3 sm:left-8 z-40 pointer-events-auto flex flex-col items-start select-none"
    >
      {/* Speech Bubble / Tooltip for Light Theme */}
      {isOpen && (
        <div
          className={`mb-2 max-w-[220px] bg-white/95 backdrop-blur-xl border border-purple-200/80 rounded-2xl p-3.5 shadow-[0_12px_35px_rgba(124,58,237,0.15)] transition-all duration-300 text-xs ${
            isHovered ? 'scale-105 border-rose-400' : ''
          }`}
        >
          <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-purple-100 mb-1.5">
            <div className="flex items-center gap-1.5 text-rose-600 font-extrabold text-[10px] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              Rozar Khan (RK)
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-purple-400 hover:text-purple-900 transition-colors"
              aria-label="Dismiss speech bubble"
            >
              <X size={13} />
            </button>
          </div>
          <p className="text-[11px] text-purple-950/90 leading-tight font-medium">
            Ready to document your story? Connect directly with me on WhatsApp!
          </p>
          <a
            href={`https://wa.me/${STUDIO_PROFILE.contact.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20Rozar,%20I%20would%20like%20to%20inquire%20about%20a%20photography%20session%20with%20PhotoMagic!`}
            target="_blank"
            rel="noreferrer"
            className="mt-2.5 inline-flex items-center gap-1.5 text-[10px] font-bold text-white bg-gradient-to-r from-purple-600 to-rose-500 px-3 py-1.5 rounded-lg shadow-[0_2px_10px_rgba(225,29,72,0.25)] hover:opacity-95 transition-opacity"
          >
            <MessageCircle size={12} /> Chat with Rozar
          </a>
        </div>
      )}

      {/* Photographer Mascot Silhouette Image */}
      <div
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {/* Soft Radial Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-rose-400/15 to-transparent rounded-full blur-xl scale-95 group-hover:scale-110 transition-transform duration-500 pointer-events-none" />

        <div className="relative w-28 sm:w-36 h-auto transition-transform duration-300 group-hover:-translate-y-1">
          <img
            src="/images/rozar_photographer_mascot.png"
            alt="Rozar Khan - Lead Photographer"
            className="w-full h-auto drop-shadow-[0_12px_20px_rgba(124,58,237,0.25)] filter contrast-125 hover:brightness-105 transition-all duration-300"
          />

          {/* Shutter Lens Flash Effect on Hover */}
          <div className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-rose-400/70 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300 blur-[2px] pointer-events-none" />
        </div>
      </div>
    </aside>
  );
};
