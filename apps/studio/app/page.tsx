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
    <div className="p-8 rounded-2xl bg-purple-50/50 border border-purple-200 animate-pulse h-96 flex items-center justify-center">
      <span className="font-mono text-xs text-purple-700">Loading Concierge Desk...</span>
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
import { ROUTES, STUDIO_PROFILE } from '@photomagic/config';

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
      title: 'Project BabyBliss & Heirloom',
      subtitle: 'Atelier Studio • Chennai, Tamil Nadu',
      category: 'events',
      categoryLabel: 'Baby & Family Portraiture',
      frames: '120 Curated Frames',
      image: '/images/babybliss_portrait.jpg',
    },
    {
      id: 'proj-4',
      title: 'Corporate Leadership Summit',
      subtitle: 'IT Park • Chennai, Tamil Nadu',
      category: 'corporate',
      categoryLabel: 'Corporate Photography',
      frames: '1,240 High-Res Photos',
      image: '/images/corporate_conference_summit.png',
    },
  ];

  const filteredProjects =
    activeTab === 'all'
      ? featuredProjects
      : featuredProjects.filter((s) => s.category === activeTab);

  const workflowSteps = [
    {
      step: '01',
      stage: 'Consultation & Vision Planning',
      desc: 'Understanding your emotional narrative, event schedule, lighting requirements, and bespoke shot list.',
    },
    {
      step: '02',
      stage: 'Cinematic Live Coverage',
      desc: 'Expert master photographers & 4K cinematographers capturing authentic smiles, sacred rituals, and aerial drone views.',
    },
    {
      step: '03',
      stage: 'AI-Powered Smart Culling',
      desc: 'Instant face-recognition tagging, multi-user real-time shortlisting, and natural warm skin tone grading.',
    },
    {
      step: '04',
      stage: '12x18 Archival Book Delivery',
      desc: 'Interactive client proofing portal, 24K gold foil Italian leather albums, and permanent 8K cloud vault access.',
    },
  ];

  const weddingPackages = [
    {
      title: 'The Classic Muhurtham',
      price: '₹1,50,000',
      desc: 'Full day traditional wedding & evening reception coverage with layflat silk album.',
      features: [
        'Full Day Wedding & Reception Coverage',
        'Lead Candid Photographer + Traditional Master',
        '10x14 Inch Silk Layflat Archival Album (30 Pages)',
        'Private Client Digital Proofing Gallery',
        'High-Speed 4K Digital Vault Access',
        'WhatsApp Realtime Shortlisting Sync',
      ],
      popular: false,
    },
    {
      title: 'The Grand Destination',
      price: '₹2,40,000',
      desc: 'Our most sought-after signature package for multi-day grand destination celebrations.',
      features: [
        '2-Day Destination Wedding & Sangeet Coverage',
        '3 Photographers + 2 Senior Cinematographers',
        '4K Cinematic Wedding Film (15 Mins) + 60-Sec Reel',
        '12x15 Inch Velvet Archival Album (40 Pages)',
        'One 8x10 Inch Parent Keepsake Album',
        'Drone Aerial Cinema Coverage Included',
      ],
      popular: true,
    },
    {
      title: 'The Royal Heirloom',
      price: '₹3,50,000',
      desc: 'The pinnacle luxury experience directed personally by Rozar Khan with master 8K deliverables.',
      features: [
        '3-Day Complete Wedding Directed by Rozar Khan',
        '4 Senior Cinematographers + Aerial Drone Masters',
        '12x18 Handcrafted Italian Leather Album (24K Gold Stamping)',
        'Two 8x12 Inch Parent Keepsake Albums',
        '8K Master Raw Deliverable Lifetime Vault',
        'Same-Day AI Photo Culling & Highlight Reel',
      ],
      popular: false,
    },
  ];

  const additionalPricing = [
    { category: 'Project BabyBliss & Toddler Shoot', starting: 'Starting from ₹85,000' },
    { category: 'Corporate Events & Conferences', starting: 'Starting from ₹25,000' },
    { category: 'School & College Annual Events', starting: 'Starting from ₹20,000' },
    { category: 'Pre-Wedding Outdoor Session', starting: 'Starting from ₹35,000' },
    { category: 'Custom 12x18 Flush Mount Album', starting: 'Starting from ₹18,000' },
  ];

  const primaryServicesList = [
    'Royal Wedding Photography',
    'Cinematic 4K Wedding Films',
    'Project BabyBliss & Toddlers',
    'South Indian Muhurtham',
    'Pre-Wedding & Post-Wedding',
    'Haldi, Mehendi & Sangeet',
    'Christian Church Weddings',
    'Nikkah & Reception Celebrations',
    '12x18 Handcrafted Archival Albums',
    'AI Face Recognition Proofing',
    '8K Master Raw Cloud Vault',
    'Corporate Conferences & Summits',
  ];

  const testimonials = [
    {
      quote:
        'Rozar Khan captured our 3-day traditional wedding with breathtaking candid emotion and vibrant, natural skin tones. The 12x18 album is a true masterpiece.',
      client: 'Arifa Bivi & Julian',
      event: 'Destination Wedding • Udaipur Lake Palace',
    },
    {
      quote:
        'The Project BabyBliss session for our daughter was pure magic! Rozar was so gentle, patient, and the resulting heirloom prints are priceless.',
      client: 'Kavitha & Arvind',
      event: 'Project BabyBliss • Chennai Atelier',
    },
    {
      quote:
        'Outstanding destination wedding cinematography in Kochi. The 4K teaser film felt like a high-end cinema release.',
      client: 'Rahul & Meera',
      event: 'Destination Wedding • Kochi, Kerala',
    },
    {
      quote:
        'The AI photo gallery made selecting our 60 favorite photos so easy for our entire family across different cities.',
      client: 'Priya & Vignesh',
      event: 'Grand Reception • Chennai, Tamil Nadu',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF5F7] text-[#1E0A3C] flex flex-col selection:bg-purple-200 selection:text-purple-900 relative overflow-x-hidden font-body film-grain">
      <StructuredData />
      <Navbar />

      {/* AMBIENT PURPLE & ROSE PASTEL LIGHTING */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-300/25 rounded-full blur-[180px]" />
        <div className="absolute top-20 -right-40 w-[700px] h-[700px] bg-rose-300/30 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-purple-200/35 rounded-full blur-[180px]" />
      </div>

      {/* HERO SECTION WITH RESPONSIVE MULTI-IMAGE ARCHITECTURE */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-24 overflow-hidden z-10 border-b border-purple-200/60">
        {/* ========================================================================= */}
        {/* 1. PC / DESKTOP VIEW (lg: & xl:): ASYMMETRICAL SPLIT COLLAGE */}
        {/* ========================================================================= */}
        <div className="hidden lg:grid absolute inset-0 z-0 grid-cols-12 grid-rows-6 gap-3.5 p-6 opacity-80 pointer-events-none">
          {/* Main Stage (Span 7 cols, 6 rows): Royal Wedding Muhurtham */}
          <div className="relative col-span-7 row-span-6 rounded-3xl overflow-hidden border border-purple-200 shadow-2xl">
            <img
              src="/images/hero_wedding_couple.png"
              alt="Royal Wedding Muhurtham & Couple"
              className="w-full h-full object-cover object-center filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFF5F7] via-transparent to-[#FFF5F7]/40" />
            <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-purple-200 text-[11px] font-bold text-rose-600 shadow-md">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              ROYAL SOUTH INDIAN WEDDINGS & CINEMA
            </div>
          </div>

          {/* Top Right (Span 5 cols, 3 rows): Project BabyBliss & Fine Art */}
          <div className="relative col-span-5 row-span-3 rounded-2xl overflow-hidden border border-rose-200 shadow-xl">
            <img
              src="/images/babybliss_portrait.jpg"
              alt="Project BabyBliss & Toddler Portraiture"
              className="w-full h-full object-cover object-center filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFF5F7] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-rose-200 text-[10px] font-bold text-rose-600 shadow-md">
              PROJECT BABYBLISS • HEIRLOOM PORTRAITS
            </div>
          </div>

          {/* Bottom Right Left (Span 3 cols, 3 rows): Grand Destination Pre-Wedding */}
          <div className="relative col-span-3 row-span-3 rounded-2xl overflow-hidden border border-purple-200 shadow-xl">
            <img
              src="/images/prewedding_backwaters.png"
              alt="Destination Pre-Wedding"
              className="w-full h-full object-cover object-center filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFF5F7] via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-purple-200 text-[9px] font-bold text-purple-900 shadow-md">
              DESTINATION UNIONS
            </div>
          </div>

          {/* Bottom Right Right (Span 2 cols, 3 rows): Handcrafted 12x18 Archival Bookmaking */}
          <div className="relative col-span-2 row-span-3 rounded-2xl overflow-hidden border border-purple-200 shadow-xl">
            <img
              src="/images/album_print_craftsmanship.png"
              alt="12x18 Archival Album Craft"
              className="w-full h-full object-cover object-center filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFF5F7] via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-purple-200 text-[9px] font-bold text-rose-600 shadow-md">
              12x18 ALBUMS
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. TABLET VIEW (md: to lg:): COMBINATION OF EVENTS SPLIT */}
        {/* ========================================================================= */}
        <div className="hidden md:grid lg:hidden absolute inset-0 z-0 grid-cols-2 grid-rows-2 gap-3 p-4 opacity-75 pointer-events-none">
          <div className="relative col-span-1 row-span-2 rounded-2xl overflow-hidden border border-purple-200">
            <img
              src="/images/hero_wedding_couple.png"
              alt="Royal Weddings"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFF5F7] via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 bg-white/95 px-3 py-1 rounded-full text-[9px] font-bold text-rose-600 shadow-md">
              ROYAL WEDDINGS
            </div>
          </div>
          <div className="relative col-span-1 row-span-1 rounded-2xl overflow-hidden border border-rose-200">
            <img
              src="/images/babybliss_portrait.jpg"
              alt="BabyBliss Studio"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFF5F7] via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 bg-white/95 px-2.5 py-0.5 rounded-full text-[8px] font-bold text-rose-600 shadow-md">
              PROJECT BABYBLISS
            </div>
          </div>
          <div className="relative col-span-1 row-span-1 rounded-2xl overflow-hidden border border-purple-200">
            <img
              src="/images/prewedding_backwaters.png"
              alt="Pre-Wedding"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFF5F7] via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 bg-white/95 px-2.5 py-0.5 rounded-full text-[8px] font-bold text-purple-900 shadow-md">
              DESTINATION UNIONS
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. PHONE / MOBILE VIEW (< md:): SINGLE POWERFUL STORYTELLING IMAGE */}
        {/* ========================================================================= */}
        <div className="block md:hidden absolute inset-0 z-0 opacity-75 pointer-events-none">
          <img
            src="/images/hero_wedding_couple.png"
            alt="Rozar Khan Storytelling Portrait"
            className="w-full h-full object-cover object-center filter contrast-105 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5F7]/90 via-[#FFF5F7]/40 to-[#FFF5F7]" />
        </div>

        {/* Location HUD Badges */}
        <div className="hidden lg:flex absolute top-28 left-8 items-center gap-3 px-4 py-2 rounded-xl bg-white/95 backdrop-blur-xl border border-purple-200 text-xs font-mono text-purple-950 shadow-md">
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span className="text-[10px] text-rose-600 tracking-widest font-bold uppercase">
            ROZAR KHAN ATELIER
          </span>
          <span className="text-purple-300">|</span>
          <span className="text-[10px] tracking-widest uppercase text-purple-900 font-medium">
            CHENNAI • BANGALORE • KOCHI • DESTINATIONS
          </span>
        </div>

        <div className="hidden lg:flex absolute top-28 right-8 items-center gap-3 px-4 py-2 rounded-xl bg-white/95 backdrop-blur-xl border border-purple-200 text-xs font-mono text-rose-600 shadow-md">
          <Camera size={14} className="text-rose-600" />
          <span className="text-[10px] tracking-widest uppercase font-bold">
            FINE ART & CINEMATOGRAPHY
          </span>
        </div>

        <Container className="relative z-10 text-center flex flex-col items-center max-w-5xl px-6">
          {/* Hallmark Badge */}
          <div className="mb-6 inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/95 backdrop-blur-2xl border border-purple-200 text-purple-950 font-mono text-[11px] uppercase tracking-[0.2em] shadow-[0_4px_20px_rgba(124,58,237,0.12)]">
            <Camera size={14} className="text-rose-600" />
            <span className="font-bold">PhotoMagic by Rozar Khan • South India & Worldwide</span>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          </div>

          {/* Title with Calligraphy Accent on Captured with */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.08] text-[#1E0A3C] mb-6 drop-shadow-sm">
            YOUR STORY
            <br />
            <span className="font-calligraphy font-normal text-5xl sm:text-7xl md:text-8xl lg:text-9xl bg-gradient-to-r from-rose-600 via-purple-600 to-rose-500 bg-clip-text text-transparent normal-case tracking-normal inline-block my-1 drop-shadow-[0_4px_20px_rgba(225,29,72,0.25)]">
              Captured with
            </span>
            <br />
            TIMELESS ELEGANCE
          </h1>

          <p className="text-base sm:text-xl text-[#4C1D95] max-w-2xl mx-auto mb-10 font-normal leading-relaxed tracking-wide">
            Directed personally by <strong>Rozar Khan</strong>. Documenting royal wedding unions,
            Project BabyBliss heirloom portraiture, and handcrafted 12x18 archival albums.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href={ROUTES.PUBLIC.BOOKING}>
              <button className="font-nav text-xs font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-purple-600 to-rose-500 text-white shadow-[0_4px_20px_rgba(225,29,72,0.30)] hover:opacity-95 py-4 px-8 rounded-xl transition-all">
                Book Studio Session
              </button>
            </Link>
            <Link href="/portal">
              <button className="font-nav text-xs font-semibold uppercase tracking-[0.18em] bg-white text-purple-950 border border-purple-200 hover:border-rose-400 hover:text-rose-600 py-4 px-7 rounded-xl transition-all shadow-sm">
                Client Photo Gallery
              </button>
            </Link>
          </div>
        </Container>
      </section>

      {/* SECTION 01: PORTFOLIO SHOWCASE */}
      <section className="py-28 relative bg-white border-b border-purple-200/60 z-10">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6 border-b border-purple-100 pb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="font-mono text-[10px] text-rose-600 uppercase tracking-[0.25em] font-bold">
                  01 / PORTFOLIO SHOWCASE
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E0A3C] tracking-tight">
                Featured Photography Collections
              </h2>
            </div>
            <Link href={ROUTES.PUBLIC.PORTFOLIO}>
              <button className="font-nav text-xs font-bold text-purple-900 hover:text-rose-600 flex items-center gap-2 rounded-xl px-5 py-2.5 border border-purple-200 bg-[#FAF5FF] hover:border-rose-300 transition-all">
                <span>Browse Full Gallery</span>
                <ArrowUpRight size={15} />
              </button>
            </Link>
          </div>

          {/* Category Filter Controls */}
          <div className="flex flex-wrap gap-2.5 mb-12 font-nav text-xs">
            {(['all', 'wedding', 'prewedding', 'corporate', 'events'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl uppercase tracking-[0.18em] font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-600 to-rose-500 text-white shadow-[0_4px_15px_rgba(225,29,72,0.25)] font-bold'
                    : 'bg-[#FAF5FF] text-purple-900/80 hover:text-purple-950 border border-purple-200/70 hover:bg-white'
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
                        : 'BabyBliss & Events'}
              </button>
            ))}
          </div>

          {/* Photo Portfolio Grid */}
          <Grid cols={2} className="gap-8">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="group relative rounded-3xl overflow-hidden bg-[#FAF5FF] border border-purple-200 hover:border-rose-400 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E0A3C]/95 via-[#1E0A3C]/30 to-transparent opacity-90" />

                  {/* Photo Counter Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-purple-200 font-mono text-[10px] font-bold text-rose-600 shadow-sm">
                    {proj.frames}
                  </div>

                  {/* Portfolio Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-1.5 text-white">
                    <span className="font-mono text-[10px] uppercase text-rose-300 tracking-[0.2em] font-bold">
                      {proj.categoryLabel}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-rose-200 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-purple-200 font-light">{proj.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </Grid>
        </Container>
      </section>

      {/* SECTION 02: ALL 31 PRIMARY SERVICES */}
      <section className="py-28 relative bg-[#FAF5FF] border-b border-purple-200/60 z-10">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-[10px] text-rose-600 uppercase tracking-[0.25em] font-bold block mb-2">
              02 / OUR SERVICES
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E0A3C] mb-4">
              Complete Photography & Video Services
            </h2>
            <p className="text-xs text-[#6B5B7B] font-mono">
              Professional photography coverage across Chennai, Bangalore, Kochi, and worldwide
              destinations.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {primaryServicesList.map((service, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white border border-purple-200/80 hover:border-rose-400 flex items-center gap-3 transition-all duration-200 hover:shadow-md shadow-sm"
              >
                <div className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" />
                <span className="text-xs font-semibold text-purple-950 font-nav tracking-wide">
                  {service}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 03: WORKFLOW */}
      <section className="py-28 relative bg-white border-b border-purple-200/60 z-10">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-[10px] text-rose-600 uppercase tracking-[0.25em] font-bold block mb-2">
              03 / STUDIO WORKFLOW
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E0A3C]">
              The Photography Experience
            </h2>
          </div>

          <Grid cols={4} className="gap-6">
            {workflowSteps.map((p, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-[#FAF5FF] border border-purple-200/80 hover:border-rose-400 flex flex-col justify-between gap-6 group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 shadow-sm"
              >
                <div className="flex justify-between items-center border-b border-purple-200/60 pb-3">
                  <span className="font-mono text-2xl font-extrabold text-rose-600">{p.step}</span>
                  <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1E0A3C] mb-2 group-hover:text-purple-700 transition-colors">
                    {p.stage}
                  </h3>
                  <p className="text-xs text-[#6B5B7B] leading-relaxed font-normal">{p.desc}</p>
                </div>
              </div>
            ))}
          </Grid>
        </Container>
      </section>

      {/* SECTION 04: PACKAGES & PRICING */}
      <section className="py-28 relative bg-[#FAF5FF] border-b border-purple-200/60 z-10">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-[10px] text-rose-600 uppercase tracking-[0.25em] block mb-2 font-bold">
              04 / INVESTMENT PACKAGES
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E0A3C]">
              Wedding & Studio Packages
            </h2>
          </div>

          <Grid cols={3} className="gap-8 mb-16">
            {weddingPackages.map((col, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-3xl flex flex-col justify-between gap-8 transition-all duration-300 relative border ${
                  col.popular
                    ? 'bg-white border-2 border-rose-400 shadow-[0_15px_40px_rgba(225,29,72,0.15)] scale-105 z-20'
                    : 'bg-white border-purple-200/80 shadow-md hover:border-purple-400'
                }`}
              >
                {col.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-rose-500 font-mono text-[9px] font-bold text-white uppercase tracking-[0.2em] shadow-md">
                    SIGNATURE MASTERPIECE
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-extrabold text-[#1E0A3C] mb-2">{col.title}</h3>
                  <div className="font-mono text-2xl font-black text-rose-600 mb-4">
                    {col.price}
                  </div>
                  <p className="text-xs text-[#6B5B7B] leading-relaxed mb-6">{col.desc}</p>

                  <div className="space-y-3.5 text-xs border-t border-purple-100 pt-6">
                    {col.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-3 text-purple-950 font-medium">
                        <CheckCircle2 size={16} className="text-rose-500 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link href={ROUTES.PUBLIC.BOOKING}>
                  <button
                    className={`w-full font-nav text-xs font-bold uppercase tracking-[0.2em] py-3.5 rounded-xl transition-all ${
                      col.popular
                        ? 'bg-gradient-to-r from-purple-600 to-rose-500 text-white shadow-[0_4px_15px_rgba(225,29,72,0.25)] hover:opacity-95'
                        : 'bg-[#FAF5FF] text-purple-950 border border-purple-200 hover:bg-purple-100'
                    }`}
                  >
                    Reserve Date
                  </button>
                </Link>
              </div>
            ))}
          </Grid>

          {/* Additional Event Pricing Grid */}
          <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-white border border-purple-200/80 shadow-md">
            <h3 className="text-xl font-bold text-[#1E0A3C] mb-6 text-center">
              Additional Event Pricing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {additionalPricing.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-4 rounded-2xl bg-[#FAF5FF] border border-purple-100"
                >
                  <span className="text-xs font-bold text-[#1E0A3C]">{item.category}</span>
                  <span className="font-mono text-xs font-bold text-rose-600">{item.starting}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 05: TESTIMONIALS */}
      <section className="py-28 relative bg-white border-b border-purple-200/60 z-10">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-[10px] text-rose-600 uppercase tracking-[0.25em] font-bold block mb-2">
              05 / CLIENT REVIEWS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E0A3C]">
              Client Experiences in South India
            </h2>
          </div>

          <Grid cols={2} className="gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#FAF5FF] border border-purple-200/80 hover:border-rose-400 flex flex-col justify-between gap-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <p className="text-base italic text-purple-950 font-normal leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="border-t border-purple-200/60 pt-4">
                  <h4 className="font-bold text-xs text-rose-600">{t.client}</h4>
                  <span className="text-xs text-[#6B5B7B] font-mono">{t.event}</span>
                </div>
              </div>
            ))}
          </Grid>
        </Container>
      </section>

      {/* SECTION 06: FAQ */}
      <section className="py-28 relative bg-[#FAF5FF] border-b border-purple-200/60 z-10">
        <Container className="max-w-4xl">
          <div className="text-center mb-16">
            <span className="font-mono text-[10px] text-rose-600 uppercase tracking-[0.25em] font-bold block mb-2">
              06 / FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E0A3C]">
              Photography Coverage & FAQ
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-white border border-purple-200/80 shadow-sm">
              <h3 className="text-base font-bold text-purple-950 mb-2">
                Which regions in Tamil Nadu, Kerala, & worldwide do you travel to?
              </h3>
              <p className="text-xs text-[#6B5B7B] leading-relaxed">
                We regularly cover weddings and events in Chennai, Bangalore, Madurai, Coimbatore,
                Kochi, Trivandrum, Udaipur, Jaipur, and international destinations with zero travel
                friction.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-purple-200/80 shadow-sm">
              <h3 className="text-base font-bold text-purple-950 mb-2">
                How soon do we receive our high-resolution photos and handcrafted 12x18 album?
              </h3>
              <p className="text-xs text-[#6B5B7B] leading-relaxed">
                You receive digital raw proofing access via your Private Client Portal within 7
                days, and your handcrafted 12x18 Italian leather album within 3-4 weeks after final
                image selection locking.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-purple-200/80 shadow-sm">
              <h3 className="text-base font-bold text-purple-950 mb-2">
                Can we customize our wedding or baby portraiture package?
              </h3>
              <p className="text-xs text-[#6B5B7B] leading-relaxed">
                Yes! We offer bespoke quotes tailored to your specific ceremony duration, multi-day
                venue schedules, Project BabyBliss studio sessions, and aerial drone cinema.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 07: INQUIRY FORM */}
      <section className="py-28 relative bg-white z-10">
        <Container className="max-w-3xl">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 font-mono text-[10px] text-rose-600 uppercase tracking-[0.2em] mb-4 shadow-sm">
              <Camera size={14} className="text-rose-600" />
              <span>07 / BOOK STUDIO SESSION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E0A3C] mb-4">
              Reserve Your Photography Date
            </h2>
            <p className="text-xs font-mono text-[#6B5B7B] max-w-xl mx-auto">
              Inquire regarding availability for weddings, Project BabyBliss sessions, corporate
              events, and destination shoots.
            </p>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-[#FAF5FF] border border-purple-200/90 shadow-xl relative">
            <InquiryForm />
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
