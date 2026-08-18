'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const StructuredData = dynamic(
  () => import('../components/StructuredData').then((m) => m.StructuredData),
  { ssr: true },
);

const InquiryForm = dynamic(() => import('../components/InquiryForm').then((m) => m.InquiryForm), {
  loading: () => (
    <div className="p-8 rounded-2xl bg-black/40 border border-amber-500/20 animate-pulse h-96 flex items-center justify-center">
      <span className="font-mono text-xs text-amber-400">Loading Concierge Desk...</span>
    </div>
  ),
});
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
  const [activeTab, setActiveTab] = useState<
    'all' | 'wedding' | 'prewedding' | 'corporate' | 'events'
  >('all');

  const featuredProjects = [
    {
      id: 'proj-1',
      title: 'Chettinad Heritage Wedding',
      subtitle: 'Raj Mahal • Madurai, Tamil Nadu',
      category: 'wedding',
      categoryLabel: 'Wedding Photography',
      frames: '2,458 High-Res Photos',
      image: '/images/hindu_wedding_ceremony.png',
    },
    {
      id: 'proj-2',
      title: 'Backwater Pre-Wedding Shoot',
      subtitle: 'Alleppey & Kochi, Kerala',
      category: 'prewedding',
      categoryLabel: 'Pre-Wedding Shoot',
      frames: '1,820 High-Res Photos',
      image: '/images/prewedding_backwaters.png',
    },
    {
      id: 'proj-3',
      title: 'Corporate Leadership Summit',
      subtitle: 'IT Park • Chennai, Tamil Nadu',
      category: 'corporate',
      categoryLabel: 'Corporate Photography',
      frames: '1,240 High-Res Photos',
      image: '/images/corporate_conference_summit.png',
    },
    {
      id: 'proj-4',
      title: 'Annual Sports & Convocation',
      subtitle: 'Coimbatore Campus, Tamil Nadu',
      category: 'events',
      categoryLabel: 'School & College Event',
      frames: '3,100 High-Res Photos',
      image: '/images/school_annual_sports_day.png',
    },
  ];

  const filteredProjects =
    activeTab === 'all'
      ? featuredProjects
      : featuredProjects.filter((s) => s.category === activeTab);

  const workflowSteps = [
    {
      step: '01',
      stage: 'Consultation & Planning',
      desc: 'Understanding your vision, event schedule, shot list requirements, and venue lighting setup.',
    },
    {
      step: '02',
      stage: 'Live Event Coverage',
      desc: 'Expert photographers & 4K cinematographers capturing candid emotions, tradition, and aerial drone views.',
    },
    {
      step: '03',
      stage: 'Culling & Color Grading',
      desc: 'AI-assisted smart photo selection and precision color correction for natural warm skin tones.',
    },
    {
      step: '04',
      stage: 'Album Design & Final Delivery',
      desc: 'Interactive client proofing portal, 24K gold foil flush-mount albums, and 8K cloud downloads.',
    },
  ];

  const weddingPackages = [
    {
      title: 'Silver Collection',
      price: '₹35,000+',
      desc: 'Ideal for intimate weddings, engagements, and single-day family celebrations.',
      features: [
        'Full Day Event Photography',
        'Lead Candid Photographer',
        'Traditional High-Res Photography',
        '300+ Edited High-Res Photos',
        'Private Online Client Gallery',
        'High-Speed Cloud Downloads',
      ],
      popular: false,
    },
    {
      title: 'Gold Collection',
      price: '₹65,000+',
      desc: 'Our most popular package for multi-ceremony wedding celebrations.',
      features: [
        'Full Wedding & Reception Coverage',
        '2 Lead Candid Photographers + 1 Cinematographer',
        '4K Cinematic Teaser Film (3-5 Mins)',
        'Traditional Videography & Photography',
        '40-Page Premium Flush Mount Album',
        'Drone Aerial Coverage Included',
      ],
      popular: true,
    },
    {
      title: 'Platinum Collection',
      price: '₹1,20,000+',
      desc: 'Complete luxury coverage for multi-day grand weddings and receptions.',
      features: [
        'Multi-Day Haldi, Mehendi, Wedding & Reception',
        'Full Photography & 4K Cinema Crew',
        'Complimentary Pre-Wedding Session',
        '2 Handcrafted Italian Leather Albums',
        '4K Live Streaming to Relatives Worldwide',
        'Lifetime Encrypted Archival Access',
      ],
      popular: false,
    },
  ];

  const additionalPricing = [
    { category: 'Corporate Events & Conferences', starting: 'Starting from ₹15,000' },
    { category: 'School & College Annual Events', starting: 'Starting from ₹12,000' },
    { category: 'Birthday & Family Milestones', starting: 'Starting from ₹10,000' },
    { category: 'Pre-Wedding Outdoor Session', starting: 'Starting from ₹18,000' },
    { category: 'Custom Flush Mount Photo Album', starting: 'Starting from ₹8,000' },
  ];

  const primaryServicesList = [
    'Wedding Photography',
    'Wedding Cinematography',
    'Candid Photography',
    'Traditional Photography',
    'Traditional Videography',
    'Pre-Wedding Shoots',
    'Post-Wedding Shoots',
    'Engagement Photography',
    'Reception Photography',
    'Haldi, Mehendi & Sangeet',
    'Birthday Photography',
    'Baby Shower',
    'Maternity Photography',
    'Newborn Photography',
    'Naming Ceremony',
    'School Photography',
    'School Annual Day Coverage',
    'School Sports Day',
    'Graduation & Convocation',
    'College Events',
    'Corporate Photography',
    'Corporate Events',
    'Conferences',
    'Product Photography',
    'Fashion Photography',
    'Commercial Photography',
    'Interior & Architecture',
    'Drone Photography',
    '4K Live Streaming',
    'Flush Mount Album Design',
    'Premium Photo Printing',
  ];

  const testimonials = [
    {
      quote:
        'PhotoMagic captured our 3-day traditional Chettinad wedding in Madurai with breathtaking candid emotion and vibrant color tones.',
      client: 'Anitha & Karthik',
      event: 'Wedding Photography • Madurai, Tamil Nadu',
    },
    {
      quote:
        'The pre-wedding shoot at Alleppey and our wedding cinematography film in Kochi felt effortlessly elegant and natural.',
      client: 'Rahul & Meera',
      event: 'Wedding & Cinematography • Kochi, Kerala',
    },
    {
      quote:
        'Outstanding corporate event coverage and commercial executive headshots for our Chennai summit.',
      client: 'Dr. Vignesh Kumar',
      event: 'Corporate Photography • Chennai, Tamil Nadu',
    },
    {
      quote:
        'Impeccable sports day and annual day photography coverage. Delivered 3,000+ organized student photos seamlessly.',
      client: "St. Mary's Academy",
      event: 'School Event Coverage • Coimbatore, Tamil Nadu',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F051D] text-[#FFF5F7] flex flex-col selection:bg-purple-600 selection:text-white relative overflow-x-hidden font-body film-grain">
      <StructuredData />
      <Navbar />

      {/* AMBIENT PURPLE & ROSE ATMOSPHERIC LIGHTING */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[180px]" />
        <div className="absolute top-20 -right-40 w-[700px] h-[700px] bg-rose-500/15 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-purple-900/25 rounded-full blur-[180px]" />
      </div>

      {/* HERO SECTION WITH RESPONSIVE MULTI-IMAGE ARCHITECTURE */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-24 overflow-hidden z-10 border-b border-purple-500/20">
        {/* ========================================================================= */}
        {/* 1. PC / DESKTOP VIEW (lg: & xl:): ASYMMETRICAL SPLIT COLLAGE OF MULTIPLE EVENTS */}
        {/* ========================================================================= */}
        <div className="hidden lg:grid absolute inset-0 z-0 grid-cols-12 grid-rows-6 gap-3.5 p-6 opacity-45 pointer-events-none">
          {/* Main Stage (Span 7 cols, 6 rows): Royal Wedding Muhurtham */}
          <div className="relative col-span-7 row-span-6 rounded-3xl overflow-hidden border border-purple-500/35 group shadow-2xl">
            <img
              src="/images/hero_wedding_couple.png"
              alt="Royal Wedding Muhurtham & Couple"
              className="w-full h-full object-cover object-center filter brightness-[0.82] contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F051D] via-transparent to-[#0F051D]/60" />
            <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-[#1C0D36]/90 backdrop-blur-md px-4 py-2 rounded-full border border-purple-500/40 text-[11px] font-bold text-rose-300">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
              ROYAL SOUTH INDIAN WEDDINGS & CINEMA
            </div>
          </div>

          {/* Top Right (Span 5 cols, 3 rows): Project BabyBliss & Fine Art */}
          <div className="relative col-span-5 row-span-3 rounded-2xl overflow-hidden border border-rose-400/35 group shadow-xl">
            <img
              src="/images/babybliss_portrait.jpg"
              alt="Project BabyBliss & Toddler Portraiture"
              className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F051D] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 bg-[#1C0D36]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-rose-400/40 text-[10px] font-bold text-rose-300">
              PROJECT BABYBLISS • HEIRLOOM PORTRAITS
            </div>
          </div>

          {/* Bottom Right Left (Span 3 cols, 3 rows): Grand Destination Pre-Wedding */}
          <div className="relative col-span-3 row-span-3 rounded-2xl overflow-hidden border border-purple-500/30 group shadow-xl">
            <img
              src="/images/prewedding_backwaters.png"
              alt="Destination Pre-Wedding"
              className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F051D] via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 bg-[#1C0D36]/90 backdrop-blur-md px-3 py-1 rounded-full border border-purple-500/40 text-[9px] font-bold text-purple-200">
              DESTINATION UNIONS
            </div>
          </div>

          {/* Bottom Right Right (Span 2 cols, 3 rows): Handcrafted 12x18 Archival Bookmaking */}
          <div className="relative col-span-2 row-span-3 rounded-2xl overflow-hidden border border-purple-500/30 group shadow-xl">
            <img
              src="/images/album_print_craftsmanship.png"
              alt="12x18 Archival Album Craft"
              className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F051D] via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 bg-[#1C0D36]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-purple-500/40 text-[9px] font-bold text-rose-300">
              12x18 ALBUMS
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. TABLET VIEW (md: to lg:): COMBINATION OF EVENTS SPLIT */}
        {/* ========================================================================= */}
        <div className="hidden md:grid lg:hidden absolute inset-0 z-0 grid-cols-2 grid-rows-2 gap-3 p-4 opacity-40 pointer-events-none">
          <div className="relative col-span-1 row-span-2 rounded-2xl overflow-hidden border border-purple-500/30">
            <img
              src="/images/hero_wedding_couple.png"
              alt="Royal Weddings"
              className="w-full h-full object-cover object-center filter brightness-[0.78]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F051D] via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 bg-[#1C0D36]/90 px-3 py-1 rounded-full text-[9px] font-bold text-rose-300">
              ROYAL WEDDINGS
            </div>
          </div>
          <div className="relative col-span-1 row-span-1 rounded-2xl overflow-hidden border border-rose-400/30">
            <img
              src="/images/babybliss_portrait.jpg"
              alt="BabyBliss Studio"
              className="w-full h-full object-cover object-center filter brightness-[0.85]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F051D] via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 bg-[#1C0D36]/90 px-2.5 py-0.5 rounded-full text-[8px] font-bold text-rose-300">
              PROJECT BABYBLISS
            </div>
          </div>
          <div className="relative col-span-1 row-span-1 rounded-2xl overflow-hidden border border-purple-500/30">
            <img
              src="/images/prewedding_backwaters.png"
              alt="Pre-Wedding"
              className="w-full h-full object-cover object-center filter brightness-[0.78]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F051D] via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 bg-[#1C0D36]/90 px-2.5 py-0.5 rounded-full text-[8px] font-bold text-purple-200">
              DESTINATION UNIONS
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. PHONE / MOBILE VIEW (< md:): SINGLE POWERFUL STORYTELLING IMAGE */}
        {/* ========================================================================= */}
        <div className="block md:hidden absolute inset-0 z-0 opacity-45 pointer-events-none">
          <img
            src="/images/hero_wedding_couple.png"
            alt="Rozar Khan Storytelling Portrait"
            className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-115 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F051D]/90 via-[#0F051D]/30 to-[#0F051D]" />
        </div>

        {/* Universal Vignette Overlay */}
        <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

        {/* Location HUD Badges */}
        <div className="hidden lg:flex absolute top-28 left-8 items-center gap-3 px-4 py-2 rounded-xl bg-[#1C0D36]/90 backdrop-blur-xl border border-purple-500/30 text-xs font-mono text-purple-200 shadow-lg">
          <div className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
          <span className="text-[10px] text-rose-300 tracking-widest font-bold uppercase">
            ROZAR KHAN ATELIER
          </span>
          <span className="text-white/20">|</span>
          <span className="text-[10px] tracking-widest uppercase text-purple-200">
            CHENNAI • BANGALORE • KOCHI • DESTINATIONS
          </span>
        </div>

        <div className="hidden lg:flex absolute top-28 right-8 items-center gap-3 px-4 py-2 rounded-xl bg-[#1C0D36]/90 backdrop-blur-xl border border-rose-400/40 text-xs font-mono text-rose-300 shadow-lg">
          <Camera size={14} className="text-rose-400" />
          <span className="text-[10px] tracking-widest uppercase font-bold">
            FINE ART & CINEMATOGRAPHY
          </span>
        </div>

        <Container className="relative z-10 text-center flex flex-col items-center max-w-5xl px-6">
          {/* Hallmark Badge */}
          <div className="mb-6 inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#1C0D36]/90 backdrop-blur-2xl border border-purple-500/40 text-purple-200 font-mono text-[11px] uppercase tracking-[0.2em] shadow-[0_0_25px_rgba(124,58,237,0.3)]">
            <Camera size={14} className="text-rose-400" />
            <span>PhotoMagic by Rozar Khan • South India & Worldwide</span>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
          </div>

          {/* Title with Corporate-Friendly Typography and Calligraphy Accent */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] text-white mb-6 drop-shadow-2xl">
            YOUR STORY
            <br />
            <span className="font-calligraphy font-normal text-5xl sm:text-7xl md:text-8xl lg:text-9xl bg-gradient-to-r from-rose-300 via-purple-300 to-rose-400 bg-clip-text text-transparent normal-case tracking-normal inline-block my-1 drop-shadow-[0_0_35px_rgba(251,113,133,0.4)]">
              Captured with
            </span>
            <br />
            TIMELESS ELEGANCE
          </h1>

          <p className="text-base sm:text-xl text-purple-100/90 max-w-2xl mx-auto mb-10 font-normal leading-relaxed tracking-wide">
            Directed personally by <strong>Rozar Khan</strong>. Documenting royal wedding unions,
            Project BabyBliss portraiture, and handcrafted 12x18 archival albums.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href={ROUTES.PUBLIC.BOOKING}>
              <button className="font-nav text-xs font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-purple-600 to-rose-500 text-white shadow-[0_0_25px_rgba(251,113,133,0.35)] hover:opacity-95 py-4 px-8 rounded-xl transition-all">
                Book Studio Session
              </button>
            </Link>
            <Link href="/portal">
              <button className="font-nav text-xs font-semibold uppercase tracking-[0.18em] bg-[#1C0D36]/90 text-purple-200 border border-purple-500/40 hover:border-rose-400 hover:text-white py-4 px-7 rounded-xl transition-all">
                Client Photo Gallery
              </button>
            </Link>
          </div>
        </Container>
      </section>

      {/* SECTION 01: PORTFOLIO SHOWCASE */}
      <section className="py-32 relative bg-[#141414] border-b border-white/10 z-10">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 border-b border-white/10 pb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-gold-400" />
                <span className="font-mono text-[10px] text-gold-400 uppercase tracking-[0.25em] font-semibold">
                  01 / PORTFOLIO SHOWCASE
                </span>
              </div>
              <h2 className="font-heading text-4xl sm:text-6xl font-bold text-ivory tracking-wide">
                Featured Photography Collections
              </h2>
            </div>
            <Link href={ROUTES.PUBLIC.PORTFOLIO}>
              <Button
                variant="outline"
                size="sm"
                className="font-nav text-xs text-gold-400 flex items-center gap-2 rounded-lg px-5 py-2.5"
              >
                <span>Browse Full Gallery</span>
                <ArrowUpRight size={15} />
              </Button>
            </Link>
          </div>

          {/* Category Filter Controls */}
          <div className="flex flex-wrap gap-3 mb-12 font-nav text-xs">
            {(['all', 'wedding', 'prewedding', 'corporate', 'events'] as const).map((tab) => (
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
                  ? 'All Collections'
                  : tab === 'wedding'
                    ? 'Weddings'
                    : tab === 'prewedding'
                      ? 'Pre-Wedding'
                      : tab === 'corporate'
                        ? 'Corporate'
                        : 'School & Events'}
              </button>
            ))}
          </div>

          {/* Photo Portfolio Grid */}
          <Grid cols={2} className="gap-10">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="group relative rounded-xl overflow-hidden bg-[#1D1D1D] border border-white/10 hover:border-gold-500/50 shadow-museum transition-all duration-500 hover:-translate-y-1 film-case"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out filter contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1D] via-[#1D1D1D]/40 to-transparent opacity-95" />

                  {/* Photo Counter Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-md bg-black/80 backdrop-blur-xl border border-gold-500/40 font-mono text-[10px] font-bold text-gold-400">
                    {proj.frames}
                  </div>

                  {/* Portfolio Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-2">
                    <span className="font-mono text-[9px] uppercase text-gold-400 tracking-[0.25em] font-semibold">
                      {proj.categoryLabel}
                    </span>
                    <h3 className="font-heading text-3xl font-bold text-ivory group-hover:text-gold-300 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-silver font-light">{proj.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </Grid>
        </Container>
      </section>

      {/* SECTION 02: ALL 31 PRIMARY SERVICES */}
      <section className="py-32 relative bg-[#090909] border-b border-white/10 z-10">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-[10px] text-gold-400 uppercase tracking-[0.25em] font-semibold block mb-2">
              02 / OUR SERVICES
            </span>
            <h2 className="font-heading text-4xl sm:text-6xl font-bold text-ivory mb-4">
              Complete Photography & Video Services
            </h2>
            <p className="text-xs text-silver font-mono">
              Professional photography coverage across Tamil Nadu and Kerala for weddings, corporate
              events, schools, and commercial shoots.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {primaryServicesList.map((service, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#141414] border border-white/10 hover:border-gold-500/40 flex items-center gap-3 transition-all duration-300 hover:bg-[#1D1D1D]"
              >
                <div className="w-2 h-2 rounded-full bg-gold-400 flex-shrink-0" />
                <span className="text-xs font-semibold text-ivory font-nav tracking-wide">
                  {service}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 03: WORKFLOW */}
      <section className="py-32 relative bg-[#141414] border-b border-white/10 z-10">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="font-mono text-[10px] text-gold-400 uppercase tracking-[0.25em] font-semibold block mb-2">
              03 / STUDIO WORKFLOW
            </span>
            <h2 className="font-heading text-4xl sm:text-6xl font-bold text-ivory">
              The Photography Experience
            </h2>
          </div>

          <Grid cols={4} className="gap-6">
            {workflowSteps.map((p, idx) => (
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

      {/* SECTION 04: PACKAGES & PRICING */}
      <section className="py-32 relative bg-[#090909] border-b border-white/10 z-10">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="font-mono text-[10px] text-gold-400 uppercase tracking-[0.25em] block mb-2 font-semibold">
              04 / INVESTMENT PACKAGES
            </span>
            <h2 className="font-heading text-4xl sm:text-6xl font-bold text-ivory">
              Wedding & Studio Packages
            </h2>
          </div>

          <Grid cols={3} className="gap-8 mb-16">
            {weddingPackages.map((col, idx) => (
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
                    RECOMMENDED SELECTION
                  </div>
                )}

                <div>
                  <h3 className="font-heading text-3xl font-bold text-ivory mb-2">{col.title}</h3>
                  <div className="font-mono text-lg font-bold text-gold-400 mb-4">{col.price}</div>
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
                    Reserve Date
                  </Button>
                </Link>
              </div>
            ))}
          </Grid>

          {/* Additional Event Pricing Grid */}
          <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-[#141414] border border-white/10 shadow-museum">
            <h3 className="font-heading text-2xl font-bold text-ivory mb-6 text-center">
              Additional Event Pricing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {additionalPricing.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-4 rounded-xl bg-[#1D1D1D] border border-white/5"
                >
                  <span className="text-xs font-semibold text-ivory">{item.category}</span>
                  <span className="font-mono text-xs font-bold text-gold-400">{item.starting}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 05: TESTIMONIALS */}
      <section className="py-32 relative bg-[#141414] border-b border-white/10 z-10">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="font-mono text-[10px] text-gold-400 uppercase tracking-[0.25em] font-semibold block mb-2">
              05 / CLIENT REVIEWS
            </span>
            <h2 className="font-heading text-4xl sm:text-6xl font-bold text-ivory">
              Client Experiences in TN & Kerala
            </h2>
          </div>

          <Grid cols={2} className="gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[#1D1D1D] border border-white/10 hover:border-gold-500/40 flex flex-col justify-between gap-6 shadow-museum transition-all duration-500 film-case"
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

      {/* SECTION 06: FAQ SECTION */}
      <section className="py-32 relative bg-[#090909] border-b border-white/10 z-10">
        <Container className="max-w-4xl">
          <div className="text-center mb-16">
            <span className="font-mono text-[10px] text-gold-400 uppercase tracking-[0.25em] font-semibold block mb-2">
              06 / FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ivory">
              Photography Coverage & FAQ
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-[#141414] border border-white/10">
              <h3 className="font-heading text-lg font-bold text-gold-400 mb-2">
                Which regions in Tamil Nadu & Kerala do you travel to?
              </h3>
              <p className="text-xs text-silver font-light leading-relaxed">
                We regularly cover weddings and events in Madurai, Chennai, Coimbatore, Trichy,
                Salem, Tirunelveli, Nagercoil, Erode, Thanjavur, Kochi, Trivandrum, Kozhikode,
                Thrissur, Kannur, and Palakkad with zero extra travel hassle.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#141414] border border-white/10">
              <h3 className="font-heading text-lg font-bold text-gold-400 mb-2">
                How soon do we receive our high-resolution photos and flush-mount album?
              </h3>
              <p className="text-xs text-silver font-light leading-relaxed">
                You receive high-res digital proofing access via your Private Client Gallery within
                7 days, and your handcrafted 24K gold foil flush-mount album within 3-4 weeks after
                final image selection.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#141414] border border-white/10">
              <h3 className="font-heading text-lg font-bold text-gold-400 mb-2">
                Can we customize our wedding or corporate photography package?
              </h3>
              <p className="text-xs text-silver font-light leading-relaxed">
                Yes! We offer bespoke quotes tailored to your specific event duration, multi-venue
                schedules, aerial drone requirements, and live streaming needs.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 07: INQUIRY FORM */}
      <section className="py-32 relative bg-[#090909] z-10">
        <Container className="max-w-3xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#1D1D1D] border border-gold-500/30 font-mono text-[10px] text-gold-400 uppercase tracking-[0.25em] mb-4">
              <Camera size={14} className="text-gold-400" />
              <span>07 / BOOK STUDIO SESSION</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-6xl font-bold text-ivory mb-4">
              Reserve Your Photography Date
            </h2>
            <p className="text-xs font-mono text-silver max-w-xl mx-auto">
              Inquire regarding availability for weddings, pre-wedding sessions, corporate events,
              and school coverage across Tamil Nadu & Kerala.
            </p>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-[#141414] border border-gold-500/30 shadow-museum relative">
            <InquiryForm />
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
