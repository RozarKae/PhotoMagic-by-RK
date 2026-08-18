'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';

interface FontPreset {
  id: string;
  name: string;
  category: string;
  headingFont: string;
  headingFontFamily: string;
  bodyFont: string;
  bodyFontFamily: string;
  googleFontUrl: string;
  description: string;
  vibe: string;
}

const FONT_PRESETS: FontPreset[] = [
  {
    id: 'jakarta-inter',
    name: '1. Plus Jakarta Sans + Inter (Current)',
    category: 'Ultra-Sleek Modern Tech',
    headingFont: 'Plus Jakarta Sans',
    headingFontFamily: "'Plus Jakarta Sans', sans-serif",
    bodyFont: 'Inter',
    bodyFontFamily: "'Inter', sans-serif",
    googleFontUrl:
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap',
    description:
      'Geometric, ultra-crisp, and highly legible. The gold standard for modern tech brands like Stripe and Linear.',
    vibe: 'Modern Executive • Tech-Forward • Ultra Crisp',
  },
  {
    id: 'outfit-jakarta',
    name: '2. Outfit + Plus Jakarta Sans',
    category: 'Minimalist Luxury & High Fashion',
    headingFont: 'Outfit',
    headingFontFamily: "'Outfit', sans-serif",
    bodyFont: 'Plus Jakarta Sans',
    bodyFontFamily: "'Plus Jakarta Sans', sans-serif",
    googleFontUrl:
      'https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap',
    description:
      'Smooth, wide circular geometry with architectural elegance. Gives a boutique high-fashion studio aura.',
    vibe: 'Runway Luxury • Architectural • Sophisticated',
  },
  {
    id: 'manrope-manrope',
    name: '3. Manrope (Unified Swiss Modern)',
    category: 'Timeless Executive Corporate',
    headingFont: 'Manrope',
    headingFontFamily: "'Manrope', sans-serif",
    bodyFont: 'Manrope',
    bodyFontFamily: "'Manrope', sans-serif",
    googleFontUrl:
      'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap',
    description:
      'A semi-geometric sans-serif with smooth modern curves and executive poise. Used by Apple-inspired design studios.',
    vibe: 'Executive • Seamless • Clean Precision',
  },
  {
    id: 'dm-sans',
    name: '4. DM Sans + Inter',
    category: 'Warm Creative Agency',
    headingFont: 'DM Sans',
    headingFontFamily: "'DM Sans', sans-serif",
    bodyFont: 'Inter',
    bodyFontFamily: "'Inter', sans-serif",
    googleFontUrl:
      'https://fonts.googleapis.com/css2?family=DM+Sans:wght@600;700;800&family=Inter:wght@400;500;600&display=swap',
    description:
      'Friendly yet authoritative sans-serif designed for high-impact titles, editorial branding, and digital media.',
    vibe: 'Creative Agency • Contemporary • Approachable',
  },
  {
    id: 'playfair-jakarta',
    name: '5. Playfair Display + Plus Jakarta Sans',
    category: 'Modern Prestige Editorial (Serif + Sans)',
    headingFont: 'Playfair Display',
    headingFontFamily: "'Playfair Display', serif",
    bodyFont: 'Plus Jakarta Sans',
    bodyFontFamily: "'Plus Jakarta Sans', sans-serif",
    googleFontUrl:
      'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap',
    description:
      'High-contrast transitional serif heading paired with a clean corporate sans. Evokes Vogue and Harper’s Bazaar.',
    vibe: 'Vogue Editorial • Grand Heritage • Prestigious',
  },
];

export default function FontPreviewPage() {
  const [selectedPreset, setSelectedPreset] = useState<FontPreset>(FONT_PRESETS[0]);

  return (
    <main className="min-h-screen bg-[#0F051D] text-[#FFF5F7] p-6 lg:p-12 relative overflow-hidden">
      {/* Dynamic Font Stylesheet Injection */}
      <link rel="stylesheet" href={selectedPreset.googleFontUrl} />

      {/* Atmospheric Background Glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-rose-500/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-500/20 pb-6">
          <div className="space-y-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors mb-2"
            >
              <ArrowLeft size={14} /> Back to Studio Home
            </Link>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <Sparkles className="text-purple-400" size={28} /> Font Personality Selector
            </h1>
            <p className="text-xs text-purple-200/80">
              Click any font suite below to preview how PhotoMagic by Rozar Khan looks in real time.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#1C0D36] border border-purple-500/30 px-4 py-2 rounded-xl text-xs">
            <span className="text-purple-300">Active Suite:</span>
            <strong className="text-rose-400">{selectedPreset.name}</strong>
          </div>
        </div>

        {/* Font Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {FONT_PRESETS.map((preset) => {
            const isSelected = selectedPreset.id === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => setSelectedPreset(preset)}
                className={`p-4 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-purple-900/60 to-rose-950/40 border-rose-400 shadow-[0_0_25px_rgba(251,113,133,0.3)] ring-1 ring-rose-400'
                    : 'bg-[#1C0D36]/80 hover:bg-[#28124D] border-purple-500/20 hover:border-purple-500/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-rose-400">
                      {preset.category}
                    </span>
                    {isSelected && <Check size={14} className="text-rose-400" />}
                  </div>
                  <h3
                    className="text-base font-bold text-white mb-1"
                    style={{ fontFamily: preset.headingFontFamily }}
                  >
                    {preset.headingFont}
                  </h3>
                  <p className="text-[11px] text-purple-200/70 line-clamp-2">{preset.vibe}</p>
                </div>

                <span className="text-[10px] text-purple-400 mt-3 font-mono">
                  + {preset.bodyFont} body
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Typography Preview Stage */}
        <div
          className="bg-[#1C0D36]/90 border border-purple-500/30 rounded-3xl p-8 lg:p-12 shadow-2xl backdrop-blur-xl space-y-12"
          style={{ fontFamily: selectedPreset.bodyFontFamily }}
        >
          {/* Hero Section Mockup */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <span
              className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs uppercase font-bold tracking-widest text-rose-400"
              style={{ fontFamily: selectedPreset.bodyFontFamily }}
            >
              PhotoMagic Studio by Rozar Khan
            </span>

            <h2
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight"
              style={{ fontFamily: selectedPreset.headingFontFamily }}
            >
              Preserving Royal Unions with{' '}
              <span className="bg-gradient-to-r from-rose-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">
                Cinematic Artistry
              </span>
            </h2>

            <p className="text-base sm:text-lg text-purple-100/80 max-w-2xl mx-auto leading-relaxed">
              Bespoke wedding cinematography, Project BabyBliss portraiture, and handcrafted 12x18
              archival Italian leather albums directed personally by Rozar Khan across Chennai,
              Bangalore, and royal destination palaces.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-rose-500 text-white font-bold text-sm hover:opacity-95 transition-opacity shadow-[0_0_20px_rgba(251,113,133,0.4)]"
                style={{ fontFamily: selectedPreset.headingFontFamily }}
              >
                Reserve Session with Rozar
              </button>
              <button
                className="px-8 py-3.5 rounded-xl bg-[#28124D] border border-purple-500/40 text-purple-100 font-semibold text-sm hover:border-rose-400 hover:text-white transition-colors"
                style={{ fontFamily: selectedPreset.bodyFontFamily }}
              >
                Explore 8K Portfolio
              </button>
            </div>
          </div>

          {/* Cards & Specimen Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-purple-500/20">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-[#0F051D]/70 border border-purple-500/25 space-y-3">
              <span className="text-xs font-mono text-rose-400">01 / WEDDINGS</span>
              <h3
                className="text-xl font-bold text-white"
                style={{ fontFamily: selectedPreset.headingFontFamily }}
              >
                The Royal Heirloom
              </h3>
              <p className="text-xs text-purple-200/75 leading-relaxed">
                3-day comprehensive coverage with 4 senior cinematographers and gold-foiled 12x18
                archival albums.
              </p>
              <div className="pt-2 text-sm font-bold text-white">₹3,50,000</div>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-[#0F051D]/70 border border-purple-500/25 space-y-3">
              <span className="text-xs font-mono text-rose-400">02 / PORTRAITURE</span>
              <h3
                className="text-xl font-bold text-white"
                style={{ fontFamily: selectedPreset.headingFontFamily }}
              >
                Project BabyBliss
              </h3>
              <p className="text-xs text-purple-200/75 leading-relaxed">
                Fine-art studio lighting, newborn styling, and keepsake layflat albums for growing
                families.
              </p>
              <div className="pt-2 text-sm font-bold text-white">₹85,000</div>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-[#0F051D]/70 border border-purple-500/25 space-y-3">
              <span className="text-xs font-mono text-rose-400">03 / TECHNOLOGY</span>
              <h3
                className="text-xl font-bold text-white"
                style={{ fontFamily: selectedPreset.headingFontFamily }}
              >
                AI Proofing & 8K Vault
              </h3>
              <p className="text-xs text-purple-200/75 leading-relaxed">
                Instant face-recognition search, multi-user real-time selection locking, and 60-day
                master downloads.
              </p>
              <div className="pt-2 text-sm font-bold text-purple-300">FastAPI + GPU</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
