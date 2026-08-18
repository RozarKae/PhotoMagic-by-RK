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
      {/* Speech Bubble / Tooltip */}
      {isOpen && (
        <div
          className={`mb-2 max-w-[210px] bg-[#1C0D36]/95 backdrop-blur-xl border border-purple-500/40 rounded-2xl p-3 shadow-[0_10px_30px_rgba(15,5,29,0.9)] transition-all duration-300 text-xs ${
            isHovered ? 'scale-105 border-rose-400' : ''
          }`}
        >
          <div className="flex items-center justify-between gap-2 pb-1 border-b border-purple-500/20 mb-1.5">
            <div className="flex items-center gap-1.5 text-rose-300 font-bold text-[10px] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
              Rozar Khan (RK)
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-purple-300/60 hover:text-white transition-colors"
              aria-label="Dismiss speech bubble"
            >
              <X size={12} />
            </button>
          </div>
          <p className="text-[11px] text-purple-100/90 leading-tight">
            Ready to document your story? Connect directly with me on WhatsApp!
          </p>
          <a
            href={`https://wa.me/${STUDIO_PROFILE.contact.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20Rozar,%20I%20would%20like%20to%20inquire%20about%20a%20photography%20session%20with%20PhotoMagic!`}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-white bg-gradient-to-r from-purple-600 to-rose-500 px-2.5 py-1 rounded-lg hover:opacity-95 transition-opacity"
          >
            <MessageCircle size={11} /> Chat with Rozar
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
        <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 via-rose-500/20 to-transparent rounded-full blur-xl scale-95 group-hover:scale-110 transition-transform duration-500 pointer-events-none" />

        <div className="relative w-28 sm:w-36 h-auto transition-transform duration-300 group-hover:-translate-y-1">
          <img
            src="/images/rozar_photographer_mascot.png"
            alt="Rozar Khan - Lead Photographer"
            className="w-full h-auto drop-shadow-[0_15px_25px_rgba(124,58,237,0.45)] filter contrast-125 hover:brightness-110 transition-all duration-300"
          />

          {/* Shutter Lens Flash Effect on Hover */}
          <div className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-rose-300/60 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300 blur-[2px] pointer-events-none" />
        </div>
      </div>
    </aside>
  );
};
