import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export const metadata = {
  title: 'About Studio | PhotoMagic Studio — Photography & Cinematography',
  description:
    'Learn about PhotoMagic Studio, our candid photography philosophy, master photographers, and event coverage across Tamil Nadu & Kerala.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#070709] text-white selection:bg-amber-400 selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-6 max-w-7xl mx-auto text-center">
        <span className="font-nav text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">
          Our Heritage & Photography Philosophy
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-wide text-white mt-4 max-w-4xl mx-auto leading-tight">
          Preserving Timeless Memories with Uncompromising Elegance
        </h1>
        <p className="font-sans text-gray-300 text-lg sm:text-xl font-light max-w-2xl mx-auto mt-6 leading-relaxed">
          PhotoMagic Studio is a premier photography and cinematography studio in Tamil Nadu and
          Kerala dedicated to capturing weddings, candid portraits, corporate events, and milestone
          celebrations.
        </p>
      </section>

      {/* Story & Image Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[4/5] rounded-none overflow-hidden border border-white/10 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80"
            alt="Master Photographer at PhotoMagic Studio"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
        <div className="space-y-8">
          <span className="font-nav text-[10px] uppercase tracking-[0.25em] text-amber-400/90 font-semibold">
            The Atelier Vision
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-light leading-snug">
            "We do not simply document events; we compose living heirlooms meant to transcend
            generations."
          </h2>
          <p className="text-gray-300 font-light leading-relaxed">
            Founded with a passion for high-fashion editorial aesthetics and emotional authentic
            realism, PhotoMagic Studio serves discerning clients across globe-trotting luxury
            destinations, high-profile weddings, and private portrait commissions.
          </p>
          <p className="text-gray-400 font-light leading-relaxed">
            Our approach blends cinematic lighting, bespoke art direction, and meticulous attention
            to nuance, ensuring every photograph exhibits timeless sophistication.
          </p>

          <div className="pt-4 flex gap-6">
            <Link
              href="/portfolio"
              className="font-nav text-xs uppercase tracking-[0.2em] bg-white text-black px-8 py-3.5 hover:bg-amber-300 transition-colors font-medium"
            >
              View Portfolio
            </Link>
            <Link
              href="/book"
              className="font-nav text-xs uppercase tracking-[0.2em] border border-white/30 text-white px-8 py-3.5 hover:border-amber-400 hover:text-amber-400 transition-colors"
            >
              Reserve Session
            </Link>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 px-6 bg-[#0B0B0E] border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-nav text-xs uppercase tracking-[0.25em] text-amber-400">
              Pillars of Excellence
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-white mt-3">
              The PhotoMagic Distinction
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 border border-white/10 bg-[#070709] space-y-4">
              <span className="text-amber-400 font-serif text-2xl">01</span>
              <h4 className="font-serif text-xl text-white">Editorial Precision</h4>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                Every frame is curated with magazine-grade composition, bespoke color science, and
                artistic intent.
              </p>
            </div>

            <div className="p-8 border border-white/10 bg-[#070709] space-y-4">
              <span className="text-amber-400 font-serif text-2xl">02</span>
              <h4 className="font-serif text-xl text-white">Discreet Luxury</h4>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                We prioritize seamless, unobtrusive presence during intimate family moments and
                high-profile galas alike.
              </p>
            </div>

            <div className="p-8 border border-white/10 bg-[#070709] space-y-4">
              <span className="text-amber-400 font-serif text-2xl">03</span>
              <h4 className="font-serif text-xl text-white">Bespoke Heirlooms</h4>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                From hand-bound Italian leather albums to museum-grade archival prints, we create
                lifelong treasures.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
