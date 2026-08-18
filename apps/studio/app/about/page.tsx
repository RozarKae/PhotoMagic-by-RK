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
    <main className="min-h-screen bg-[#070709] text-white selection:bg-amber-400 selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-6 max-w-7xl mx-auto text-center">
        <span className="font-nav text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">
          The Artist & The Atelier
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-wide text-white mt-4 max-w-4xl mx-auto leading-tight">
          Preserving Timeless Unions & Heirloom Legacies
        </h1>
        <p className="font-sans text-gray-300 text-lg sm:text-xl font-light max-w-2xl mx-auto mt-6 leading-relaxed">
          <strong>PhotoMagic by RK</strong> is the signature visual atelier founded by{' '}
          <strong>Rozar Khan</strong>, specializing in royal destination weddings, intimate luxury
          ceremonies, and Project BabyBliss portraiture across South India and worldwide.
        </p>
      </section>

      {/* Story & Image Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80"
            alt="Rozar Khan - Founder & Lead Artist"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
            <span className="text-xs font-serif font-bold text-amber-400">Rozar Khan (RK)</span>
            <span className="block text-[10px] text-gray-400 font-mono">
              Founder & Lead Visual Director
            </span>
          </div>
        </div>
        <div className="space-y-8">
          <span className="font-nav text-[10px] uppercase tracking-[0.25em] text-amber-400/90 font-semibold">
            The Founder's Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-light leading-snug">
            "We do not merely take photographs; we compose living heirlooms meant to transcend
            generations."
          </h2>
          <p className="text-gray-300 font-light leading-relaxed">
            Founded by <strong>Rozar Khan</strong>, PhotoMagic Studio was built on the premise that
            wedding photography and family milestones deserve the same meticulous craft as
            high-fashion editorials and fine art gallery retrospectives.
          </p>
          <p className="text-gray-400 font-light leading-relaxed">
            From the emotional sacred rituals of South Indian Muhurthams to opulent palace unions
            and our signature <strong>Project BabyBliss</strong> series, every frame is crafted with
            cinematic color grading, atmospheric lighting, and archival 12x18 print precision.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              href="/portfolio"
              className="font-nav text-xs uppercase tracking-[0.2em] bg-white text-black px-8 py-3.5 hover:bg-amber-300 transition-colors font-medium rounded-xl"
            >
              View Portfolio
            </Link>
            <Link
              href="/book"
              className="font-nav text-xs uppercase tracking-[0.2em] border border-white/30 text-white px-8 py-3.5 hover:border-amber-400 hover:text-amber-400 transition-colors rounded-xl"
            >
              Reserve Session with Rozar
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
              The Rozar Khan Distinction
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 border border-white/10 bg-[#070709] rounded-2xl space-y-4">
              <span className="text-amber-400 font-serif text-2xl">01</span>
              <h4 className="font-serif text-xl text-white">Cinematic Emotion</h4>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                Capturing raw, unscripted tears, joyful laughter, and regal rituals without
                intrusive disruption.
              </p>
            </div>

            <div className="p-8 border border-white/10 bg-[#070709] rounded-2xl space-y-4">
              <span className="text-amber-400 font-serif text-2xl">02</span>
              <h4 className="font-serif text-xl text-white">Archival Heirloom Books</h4>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                Handcrafted 12x18 inch Italian leather albums bound with 24K gold foil stamping
                rated for 200+ years.
              </p>
            </div>

            <div className="p-8 border border-white/10 bg-[#070709] rounded-2xl space-y-4">
              <span className="text-amber-400 font-serif text-2xl">03</span>
              <h4 className="font-serif text-xl text-white">Project BabyBliss</h4>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
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
