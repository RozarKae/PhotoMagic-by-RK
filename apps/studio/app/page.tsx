'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { StructuredData } from '../components/StructuredData';
import { InquiryForm } from '../components/InquiryForm';
import { Button, Card, Container, Grid } from '@photomagic/ui';
import {
  Film,
  Camera,
  Clapperboard,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  Globe,
  Clock,
  ShieldCheck,
  Zap,
  Activity,
  Play,
  Tv,
} from 'lucide-react';
import { ROUTES } from '@photomagic/config';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'feature' | 'short' | 'trailers'>('all');

  const featuredProductions = [
    {
      id: 'prod-1',
      title: 'Royal Palace Celebration',
      subtitle: 'City Palace • Udaipur, India',
      category: 'feature',
      categoryLabel: 'Feature Film',
      frames: '2,458 Frames Captured',
      image:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85',
    },
    {
      id: 'prod-2',
      title: 'Editorial Haute Couture',
      subtitle: 'Hôtel de Crillon • Paris, France',
      category: 'short',
      categoryLabel: 'Short Film',
      frames: '1,820 Frames Captured',
      image:
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=85',
    },
    {
      id: 'prod-3',
      title: 'Fine Art Master Portraiture',
      subtitle: 'Private Atelier • Beverly Hills',
      category: 'short',
      categoryLabel: "Director's Cut",
      frames: '1,240 Frames Captured',
      image:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85',
    },
    {
      id: 'prod-4',
      title: 'Private Estate Gala',
      subtitle: 'Villa d’Este • Lake Como, Italy',
      category: 'trailers',
      categoryLabel: 'Trailer Release',
      frames: '3,100 Frames Captured',
      image:
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=85',
    },
  ];

  const filteredProductions =
    activeTab === 'all'
      ? featuredProductions
      : featuredProductions.filter((s) => s.category === activeTab);

  const productionStages = [
    {
      step: '01',
      stage: 'Pre Production',
      desc: 'Creative direction, location scouting, script breakdown, and lighting reconnaissance manifest.',
    },
    {
      step: '02',
      stage: 'Principal Photography',
      desc: 'Discreet multi-camera cinema crews operating with Leica glass and RED digital cinema systems.',
    },
    {
      step: '03',
      stage: 'Post Production & Color Grading',
      desc: 'Frame-by-frame archival color grading in Kodak 35mm tone profiles.',
    },
    {
      step: '04',
      stage: 'Final Cut & Vault Release',
      desc: 'Private screening room premiere and white-glove unboxing of handcrafted leather feature film volumes.',
    },
  ];

  const collections = [
    {
      title: 'Short Film Production',
      price: 'Bespoke Quote',
      desc: 'Designed for intimate milestone sessions and single-day cinematic coverage.',
      features: [
        '6 Hours Unrestricted Cinema Coverage',
        'Lead Director + Assistant Cinematographer',
        'Archival Cloud Vault Access',
        'Private Screening Room Portal',
        '4-Week Final Cut SLA',
      ],
      popular: false,
    },
    {
      title: 'Feature Film Production',
      price: 'Most Requested',
      desc: 'The gold standard for multi-day destination weddings and international galas.',
      features: [
        '10 Hours Multi-Camera Coverage',
        '2 Lead Directors + Full Cinema Crew',
        '48-Hour Official Teaser Trailer',
        '10" Handcrafted Italian Leather Album',
        'Encrypted Lifetime Cloud Vault',
        'Full Commercial & Broadcast Rights',
      ],
      popular: true,
    },
    {
      title: 'Master Blockbuster Collection',
      price: 'Ultimate Legacy',
      desc: 'Complete multi-day royal house and destination estate documentation.',
      features: [
        'Unrestricted Multi-Day Production',
        'Master Director + Full Studio Cinema Unit',
        '14" Master Leather Heirloom Feature Book',
        '2 Parent Replica Handcrafted Albums',
        'Bespoke Orchestral Soundtrack Scoring',
        'White-Glove In-Person Screening Ceremony',
      ],
      popular: false,
    },
  ];

  const testimonials = [
    {
      quote:
        'PhotoMagic captured our Udaipur palace wedding like an Oscar-nominated period film. The screening room presentation was unforgettable.',
      client: 'Eleanor Vance & Julian Montgomery',
      event: 'Royal Palace Production • City Palace, Udaipur',
    },
    {
      quote:
        'The depth, color grading, and editorial precision of our final cut is beyond anything we imagined. Truly Hollywood quality.',
      client: 'Lady Sarah Sterling',
      event: 'Private Estate Gala • Beverly Hills',
    },
  ];

  return (
    <div className="min-h-screen bg-[#090909] text-[#F5F3EF] flex flex-col selection:bg-gold-500 selection:text-black relative overflow-x-hidden font-body film-grain">
      <StructuredData />
      <Navbar />

      {/* AMBIENT CINEMATIC LIGHTING */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald/10 rounded-full blur-[160px]" />
        <div className="absolute top-20 -right-40 w-[700px] h-[700px] bg-gold-500/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-burgundy/20 rounded-full blur-[180px]" />
      </div>

      {/* HERO SECTION: ANAMORPHIC BLOCKBUSTER LANDING */}
      <section className="relative min-h-screen flex items-center justify-center pt-28 pb-24 overflow-hidden z-10 border-b border-white/10 letterbox-frame">
        {/* Full-Screen Hero Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=90"
            alt="Cinematic Film Studio Background"
            className="w-full h-full object-cover object-center scale-105 filter brightness-[0.55] contrast-125 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#090909]/80 via-transparent to-[#090909]" />
          <div className="absolute inset-0 vignette-cinematic" />
        </div>

        {/* Studio HUD Badges */}
        <div className="hidden lg:flex absolute top-28 left-8 items-center gap-3 px-4 py-2 rounded-lg bg-[#141414]/90 backdrop-blur-xl border border-white/10 text-xs font-mono text-silver">
          <div className="w-2 h-2 rounded-full bg-gold-500 animate-ping" />
          <span className="text-[10px] text-gold-400 tracking-widest font-semibold uppercase">
            ARRI & KODAK 35MM GRAIN
          </span>
          <span className="text-white/20">|</span>
          <span className="text-[10px] tracking-widest uppercase">UDAIPUR • PARIS • LAKE COMO</span>
        </div>

        <div className="hidden lg:flex absolute top-28 right-8 items-center gap-3 px-4 py-2 rounded-lg bg-[#141414]/90 backdrop-blur-xl border border-gold-500/30 text-xs font-mono text-gold-400">
          <Clapperboard size={14} className="text-gold-400" />
          <span className="text-[10px] tracking-widest uppercase font-semibold">
            DOLBY CINEMA SCREENING SUITE
          </span>
        </div>

        <Container className="relative z-10 text-center flex flex-col items-center max-w-5xl px-6">
          {/* Hallmark Badge */}
          <div className="mb-6 inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#141414]/90 backdrop-blur-2xl border border-gold-500/40 text-gold-300 font-mono text-[10px] uppercase tracking-[0.25em] shadow-kodakGlow">
            <Film size={14} className="text-gold-400" />
            <span>A24 & Kodak Motion Picture Inspired Studio</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
          </div>

          {/* Large Editorial Title */}
          <h1 className="font-hero text-5xl sm:text-7xl md:text-8xl font-black tracking-[0.06em] leading-[1.02] text-ivory mb-6 drop-shadow-2xl">
            YOUR STORY
            <br />
            <span className="text-gold-gradient font-heading italic font-normal">DESERVES</span>
            <br />
            THE BIG SCREEN
          </h1>

          <p className="text-base sm:text-xl text-silver/90 max-w-2xl mx-auto mb-10 font-light leading-relaxed tracking-wide">
            Every wedding is treated like a blockbuster film. Preserving timeless human moments with
            the craftsmanship, atmosphere, and dignity of cinema.
          </p>

          {/* Primary CTA Button */}
          <div className="flex items-center gap-4">
            <Link href={ROUTES.PUBLIC.BOOKING}>
              <Button
                variant="primary"
                size="lg"
                className="font-nav text-xs font-bold uppercase tracking-[0.25em] bg-[#141414] text-ivory border border-gold-500 shadow-kodakGlow hover:border-gold-400 hover:text-gold-300 py-4 px-8 rounded-lg"
              >
                ▶ Begin Your Journey
              </Button>
            </Link>
            <Link href="/portal">
              <Button
                variant="secondary"
                size="lg"
                className="font-nav text-xs font-semibold uppercase tracking-[0.2em] py-4 px-7 rounded-lg"
              >
                Private Screening Room
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* SECTION 01: FEATURE FILMS & PRODUCTION ARCHIVES */}
      <section className="py-32 relative bg-[#141414] border-b border-white/10 z-10">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 border-b border-white/10 pb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-gold-400" />
                <span className="font-mono text-[10px] text-gold-400 uppercase tracking-[0.25em] font-semibold">
                  01 / CINEMATIC LIBRARY
                </span>
              </div>
              <h2 className="font-heading text-4xl sm:text-6xl font-bold text-ivory tracking-wide">
                Current Productions & Feature Films
              </h2>
            </div>
            <Link href={ROUTES.PUBLIC.PORTFOLIO}>
              <Button
                variant="outline"
                size="sm"
                className="font-nav text-xs text-gold-400 flex items-center gap-2 rounded-lg px-5 py-2.5"
              >
                <span>Browse Full Vault</span>
                <ArrowUpRight size={15} />
              </Button>
            </Link>
          </div>

          {/* Category Filter Controls */}
          <div className="flex flex-wrap gap-3 mb-12 font-nav text-xs">
            {(['all', 'feature', 'short', 'trailers'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-lg uppercase tracking-[0.2em] font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-[#1D1D1D] text-gold-400 border border-gold-500 shadow-kodakGlow font-bold'
                    : 'bg-[#090909] text-silver hover:text-ivory border border-white/10'
                }`}
              >
                {tab === 'all'
                  ? 'All Productions'
                  : tab === 'feature'
                    ? 'Feature Films'
                    : tab === 'short'
                      ? 'Short Films'
                      : 'Trailers'}
              </button>
            ))}
          </div>

          {/* Movie Poster Film Library Grid */}
          <Grid cols={2} className="gap-10">
            {filteredProductions.map((prod) => (
              <div
                key={prod.id}
                className="group relative rounded-xl overflow-hidden bg-[#1D1D1D] border border-white/10 hover:border-gold-500/50 shadow-museum transition-all duration-500 hover:-translate-y-1 film-case"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out filter contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1D] via-[#1D1D1D]/40 to-transparent opacity-95" />

                  {/* Frame Counter Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-md bg-black/80 backdrop-blur-xl border border-gold-500/40 font-mono text-[10px] font-bold text-gold-400">
                    {prod.frames}
                  </div>

                  {/* Poster Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-2">
                    <span className="font-mono text-[9px] uppercase text-gold-400 tracking-[0.25em] font-semibold">
                      {prod.categoryLabel}
                    </span>
                    <h3 className="font-heading text-3xl font-bold text-ivory group-hover:text-gold-300 transition-colors">
                      {prod.title}
                    </h3>
                    <p className="text-xs text-silver font-light">{prod.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </Grid>
        </Container>
      </section>

      {/* SECTION 02: DIRECTORS' VISION & ETHOS */}
      <section className="py-32 relative bg-[#090909] border-b border-white/10 z-10 overflow-hidden">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-md bg-[#1D1D1D] border border-gold-500/30 font-mono text-[10px] text-gold-400 uppercase tracking-[0.25em]">
              <Film size={13} className="text-gold-400" />
              <span>02 / DIRECTORS' PHILOSOPHY</span>
            </div>

            <h2 className="font-heading text-4xl sm:text-6xl font-light text-ivory leading-tight drop-shadow-lg">
              "We are no longer delivering photographs. We are preserving cinematic memories. Every
              wedding is treated like a blockbuster production."
            </h2>

            <div className="w-16 h-[1px] bg-gold-500/40 mx-auto" />

            <p className="text-base text-silver/90 max-w-2xl mx-auto font-light leading-relaxed">
              Inspired by Kodak motion picture, Leica glass, and Dolby Cinema rooms, we craft
              heirloom feature films for families who value timeless art over transient trends.
            </p>
          </div>
        </Container>
      </section>

      {/* SECTION 03: PRODUCTION TIMELINE */}
      <section className="py-32 relative bg-[#141414] border-b border-white/10 z-10">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="font-mono text-[10px] text-gold-400 uppercase tracking-[0.25em] font-semibold block mb-2">
              03 / PRODUCTION WORKFLOW
            </span>
            <h2 className="font-heading text-4xl sm:text-6xl font-bold text-ivory">
              The Production Timeline
            </h2>
          </div>

          <Grid cols={4} className="gap-6">
            {productionStages.map((p, idx) => (
              <div
                key={idx}
                className="p-7 rounded-xl bg-[#1D1D1D] border border-white/10 hover:border-gold-500/40 flex flex-col justify-between gap-6 group transition-all duration-500 hover:-translate-y-1 film-case"
              >
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="font-hero text-2xl font-bold text-gold-400 font-mono">
                    {p.step}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-ivory mb-2 group-hover:text-gold-300 transition-colors">
                    {p.stage}
                  </h3>
                  <p className="text-xs text-silver font-light leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </Grid>
        </Container>
      </section>

      {/* SECTION 04: BESPOKE PRODUCTION SCOPE */}
      <section className="py-32 relative bg-[#090909] border-b border-white/10 z-10">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="font-mono text-[10px] text-gold-400 uppercase tracking-[0.25em] block mb-2 font-semibold">
              04 / BESPOKE PRODUCTIONS
            </span>
            <h2 className="font-heading text-4xl sm:text-6xl font-bold text-ivory">
              Feature Film Packages
            </h2>
          </div>

          <Grid cols={3} className="gap-8">
            {collections.map((col, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-xl flex flex-col justify-between gap-8 transition-all duration-500 relative border shadow-museum ${
                  col.popular
                    ? 'bg-[#1D1D1D] border-gold-500/70 scale-105 z-20 shadow-kodakGlow'
                    : 'bg-[#141414] border-white/10 hover:border-gold-500/30'
                }`}
              >
                {col.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-md bg-gold-500 font-mono text-[9px] font-bold text-black uppercase tracking-[0.2em]">
                    FEATURE FILM SELECTION
                  </div>
                )}

                <div>
                  <h3 className="font-heading text-3xl font-bold text-ivory mb-2">{col.title}</h3>
                  <div className="font-mono text-xs font-bold text-gold-400 mb-4">{col.price}</div>
                  <p className="text-xs text-silver font-light leading-relaxed mb-6">{col.desc}</p>

                  <div className="space-y-3.5 text-xs border-t border-white/10 pt-6">
                    {col.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-3 text-silver font-light">
                        <CheckCircle2 size={15} className="text-gold-400 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link href={ROUTES.PUBLIC.BOOKING}>
                  <Button
                    variant={col.popular ? 'primary' : 'outline'}
                    className="w-full font-nav text-xs font-bold uppercase tracking-[0.2em] py-3.5 rounded-lg"
                  >
                    ▶ Begin Your Journey
                  </Button>
                </Link>
              </div>
            ))}
          </Grid>
        </Container>
      </section>

      {/* SECTION 05: PATRONS OF DISTINCTION */}
      <section className="py-32 relative bg-[#141414] border-b border-white/10 z-10">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="font-mono text-[10px] text-gold-400 uppercase tracking-[0.25em] font-semibold block mb-2">
              05 / REVIEWS & RECOGNITION
            </span>
            <h2 className="font-heading text-4xl sm:text-6xl font-bold text-ivory">
              Patrons of Distinction
            </h2>
          </div>

          <Grid cols={2} className="gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-8 rounded-xl bg-[#1D1D1D] border border-white/10 hover:border-gold-500/40 flex flex-col justify-between gap-6 shadow-museum transition-all duration-500 film-case"
              >
                <p className="font-heading text-xl italic text-silver leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="border-t border-white/10 pt-4">
                  <h4 className="font-mono font-bold text-xs text-gold-400">{t.client}</h4>
                  <span className="text-xs text-silver/70 font-mono">{t.event}</span>
                </div>
              </div>
            ))}
          </Grid>
        </Container>
      </section>

      {/* SECTION 06: STUDIO CONCIERGE TERMINAL */}
      <section className="py-32 relative bg-[#090909] z-10">
        <Container className="max-w-3xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-md bg-[#1D1D1D] border border-gold-500/30 font-mono text-[10px] text-gold-400 uppercase tracking-[0.25em] mb-4">
              <Camera size={14} className="text-gold-400" />
              <span>06 / STUDIO CONCIERGE</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-6xl font-bold text-ivory mb-4">
              Commence Your Production
            </h2>
            <p className="text-xs font-mono text-silver max-w-xl mx-auto">
              Inquire regarding availability for royal wedding commissions, private studio ateliers,
              or international feature film assignments.
            </p>
          </div>

          <div className="p-8 sm:p-12 rounded-2xl bg-[#141414] border border-gold-500/30 shadow-museum relative">
            <InquiryForm />
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
