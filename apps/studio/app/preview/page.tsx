'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Sparkles, Laptop, Smartphone, Tablet } from 'lucide-react';

export default function StandalonePreviewPage() {
  const searchParams = useSearchParams();
  const themeParam = searchParams.get('theme') || 'lavender';
  const pageParam = searchParams.get('page') || 'home';

  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  return (
    <div
      className={`min-h-screen bg-[var(--color-canvas,#FFF5F7)] text-[var(--color-text-primary,#1E0A3C)] flex flex-col theme-${themeParam}`}
    >
      {/* Top Preview Bar */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-11 bg-[#140822] text-white px-6 flex items-center justify-between border-b border-purple-800/40 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Live Visual Builder Preview Mode ({pageParam.toUpperCase()})</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDevice('desktop')}
            className={`p-1.5 rounded-lg ${device === 'desktop' ? 'bg-purple-700 text-white' : 'text-purple-300'}`}
          >
            <Laptop size={14} />
          </button>
          <button
            onClick={() => setDevice('tablet')}
            className={`p-1.5 rounded-lg ${device === 'tablet' ? 'bg-purple-700 text-white' : 'text-purple-300'}`}
          >
            <Tablet size={14} />
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`p-1.5 rounded-lg ${device === 'mobile' ? 'bg-purple-700 text-white' : 'text-purple-300'}`}
          >
            <Smartphone size={14} />
          </button>
        </div>
      </div>

      <div className="pt-11 flex-1 flex justify-center">
        <div
          className={`w-full transition-all duration-300 ${
            device === 'desktop'
              ? 'max-w-full'
              : device === 'tablet'
                ? 'max-w-[768px] shadow-2xl border-x border-purple-200 dark:border-purple-800'
                : 'max-w-[375px] shadow-2xl border-x border-purple-200 dark:border-purple-800'
          }`}
        >
          <Navbar />
          <div className="py-24 text-center px-6">
            <span className="font-mono text-xs text-rose-600 font-bold uppercase tracking-widest block mb-2">
              Standalone Builder Live Preview
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-hero text-purple-950 dark:text-purple-50">
              PhotoMagic Studios Preview Frame
            </h1>
            <p className="text-xs sm:text-sm text-purple-800 dark:text-purple-300 mt-2">
              Viewing in real-time responsive container with dynamic theme tokens applied.
            </p>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
