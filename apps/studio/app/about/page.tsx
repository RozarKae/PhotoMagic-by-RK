import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { STUDIO_PROFILE } from '@photomagic/config';

export const metadata = {
  title: 'About Rozar Khan | PhotoMagic Studio — Fine Art & Cinematography',
  description:
    'Meet Rozar Khan, founder of PhotoMagic by RK. Discover our royal destination wedding coverage, Project BabyBliss, and handcrafted archival bookmaking.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FFF5F7] text-[#1E0A3C] selection:bg-purple-200 selection:text-purple-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-6 max-w-7xl mx-auto text-center">
        <span className="font-nav text-xs uppercase tracking-[0.25em] text-rose-600 font-bold">
          The Artist & The Atelier
        </span>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#1E0A3C] mt-4 max-w-4xl mx-auto leading-tight">
          Preserving Timeless Unions & Heirloom Legacies
        </h1>
        <p className="text-[#4C1D95] text-lg sm:text-xl font-normal max-w-2xl mx-auto mt-6 leading-relaxed">
          <strong>PhotoMagic by RK</strong> is the signature visual atelier founded by{' '}
          <strong>Rozar Khan</strong>, specializing in royal destination weddings, intimate luxury
          ceremonies, and Project BabyBliss portraiture across South India and worldwide.
        </p>
      </section>

      {/* Story & Image Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-purple-200/60 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-purple-200 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80"
            alt="Rozar Khan - Founder & Lead Artist"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-purple-200 shadow-lg">
            <span className="text-xs font-bold text-rose-600 block">Rozar Khan (RK)</span>
            <span className="text-[10px] text-purple-950 font-medium">
              Founder & Lead Visual Director
            </span>
          </div>
        </div>
        <div className="space-y-6">
          <span className="font-nav text-[10px] uppercase tracking-[0.25em] text-rose-600 font-bold">
            The Founder's Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl text-[#1E0A3C] font-extrabold leading-snug">
            "We do not merely take photographs; we compose living heirlooms meant to transcend
            generations."
          </h2>
          <p className="text-[#3B2D54] leading-relaxed">
            Founded by <strong>Rozar Khan</strong>, PhotoMagic Studio was built on the premise that
            wedding photography and family milestones deserve the same meticulous craft as
            high-fashion editorials and fine art gallery retrospectives.
          </p>
          <p className="text-[#6B5B7B] leading-relaxed">
            From the emotional sacred rituals of South Indian Muhurthams to opulent palace unions
            and our signature <strong>Project BabyBliss</strong> series, every frame is crafted with
            cinematic color grading, atmospheric lighting, and archival 12x18 print precision.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              href="/portfolio"
              className="font-nav text-xs uppercase tracking-[0.2em] bg-[#1E0A3C] text-white px-8 py-3.5 hover:bg-purple-900 transition-colors font-bold rounded-xl shadow-md"
            >
              View Portfolio
            </Link>
            <Link
              href="/book"
              className="font-nav text-xs uppercase tracking-[0.2em] bg-gradient-to-r from-purple-600 to-rose-500 text-white px-8 py-3.5 hover:opacity-95 transition-opacity font-bold rounded-xl shadow-[0_4px_15px_rgba(225,29,72,0.25)]"
            >
              Reserve Session with Rozar
            </Link>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 px-6 bg-[#FAF5FF] border-t border-b border-purple-200/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-nav text-xs uppercase tracking-[0.25em] text-rose-600 font-bold">
              Pillars of Excellence
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#1E0A3C] mt-2">
              The Rozar Khan Distinction
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-purple-200/80 bg-white rounded-3xl space-y-3 shadow-md hover:border-rose-400 transition-colors">
              <span className="text-rose-600 font-extrabold text-2xl">01</span>
              <h4 className="text-xl font-bold text-[#1E0A3C]">Cinematic Emotion</h4>
              <p className="text-[#6B5B7B] text-sm leading-relaxed">
                Capturing raw, unscripted tears, joyful laughter, and sacred rituals without
                intrusive disruption.
              </p>
            </div>

            <div className="p-8 border border-purple-200/80 bg-white rounded-3xl space-y-3 shadow-md hover:border-rose-400 transition-colors">
              <span className="text-purple-600 font-extrabold text-2xl">02</span>
              <h4 className="text-xl font-bold text-[#1E0A3C]">Archival Heirloom Books</h4>
              <p className="text-[#6B5B7B] text-sm leading-relaxed">
                Handcrafted 12x18 inch Italian leather albums bound with 24K gold foil stamping
                rated for 200+ years.
              </p>
            </div>

            <div className="p-8 border border-purple-200/80 bg-white rounded-3xl space-y-3 shadow-md hover:border-rose-400 transition-colors">
              <span className="text-rose-600 font-extrabold text-2xl">03</span>
              <h4 className="text-xl font-bold text-[#1E0A3C]">Project BabyBliss</h4>
              <p className="text-[#6B5B7B] text-sm leading-relaxed">
                Bespoke heirloom maternity, newborn, and toddler portraits styled with fine-art
                studio precision.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
