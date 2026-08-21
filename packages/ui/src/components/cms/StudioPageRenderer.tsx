'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { WebsitePage, BuilderPage, BuilderSection, BuilderElement } from '@photomagic/types';
import {
  STUDIO_PROFILE,
  OFFICIAL_CATEGORIES,
  DEFAULT_PACKAGES,
  CMS_SERVICES,
  CMS_STORIES,
  CMS_TESTIMONIALS,
  CMS_PORTFOLIO_ITEMS,
  CUSTOM_PACKAGE_RATES,
  calculateCustomPackageDiscount,
} from '@photomagic/config';
import { formatCurrency } from '@photomagic/shared';
import {
  Calendar,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Quote,
  Star,
  CheckCircle2,
  SlidersHorizontal,
  Plus,
  Trash2,
  Copy,
  Eye,
  Shuffle,
  Shield,
  Maximize2,
  X,
  Phone,
  MessageCircle,
  Mail,
  Instagram,
  Facebook,
  MapPin,
  Send,
  ShieldCheck,
  Compass,
  Heart,
  Film,
  Tag,
} from 'lucide-react';

export interface StudioPageRendererProps {
  page: WebsitePage | BuilderPage;
  mode?: 'public' | 'builder';
  selectedSectionId?: string | null;
  selectedElementId?: string | null;
  onSelectSection?: (sectionId: string) => void;
  onSelectElement?: (sectionId: string, elementId: string) => void;
  onMoveSection?: (sectionIndex: number, direction: 'up' | 'down') => void;
  onDuplicateSection?: (section: BuilderSection) => void;
  onDeleteSection?: (sectionId: string) => void;
}

export const StudioPageRenderer: React.FC<StudioPageRendererProps> = ({
  page,
  mode = 'public',
  selectedSectionId,
  selectedElementId,
  onSelectSection,
  onSelectElement,
  onMoveSection,
  onDuplicateSection,
  onDeleteSection,
}) => {
  const isBuilder = mode === 'builder';

  // Hero carousel state
  const heroImages = [
    {
      src: '/images/hero_wedding_couple.png',
      caption: 'The Royal Union • Madurai Heritage Palace',
      alt: 'Couple Portrait - PhotoMagic Studios by RK',
    },
    {
      src: '/images/hindu_wedding_ceremony.png',
      caption: 'Sacred Mandap Rituals • Chennai Muhurtham',
      alt: 'Traditional Wedding Ceremony - PhotoMagic Studios by RK',
    },
    {
      src: '/images/prewedding_backwaters.png',
      caption: 'Misty Dawn Reflections • Alleppey Backwaters',
      alt: 'Pre-Wedding Shoot - PhotoMagic Studios by RK',
    },
    {
      src: '/images/fashion_editorial.png',
      caption: 'Ethnic Couture Silhouette • Atelier Studio',
      alt: 'Fashion Editorial - PhotoMagic Studios by RK',
    },
    {
      src: '/images/babybliss_portrait.jpg',
      caption: 'Project BabyBliss • Pure Innocence',
      alt: 'Baby Portrait - PhotoMagic Studios by RK',
    },
  ];

  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Portfolio state
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [watermarkActive, setWatermarkActive] = useState<boolean>(true);
  const [shuffleKey, setShuffleKey] = useState<number>(0);

  // Stories filter state
  const [storyFilter, setStoryFilter] = useState<string>('All');

  // Interactive booking state
  const [bookStep, setBookStep] = useState<number>(1);
  const [bookCategory, setBookCategory] = useState<string>('weddings');
  const [bookDate, setBookDate] = useState<string>('');
  const [bookDays, setBookDays] = useState<number>(1);
  const [bookVenue, setBookVenue] = useState<string>('');
  const [bookCity, setBookCity] = useState<string>('Chennai');
  const [bookPkg, setBookPkg] = useState<string>('pkg-obsidian');
  const [bookName, setBookName] = useState<string>('');
  const [bookPhone, setBookPhone] = useState<string>('');
  const [bookEmail, setBookEmail] = useState<string>('');
  const [bookSubmitted, setBookSubmitted] = useState<boolean>(false);

  // Contact form state
  const [contactName, setContactName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactMessage, setContactMessage] = useState<string>('');
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);

  // Auto rotate hero slides
  useEffect(() => {
    if (isBuilder) return; // Freeze auto-rotation inside editor for stable editing
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length, isBuilder]);

  // Comprehensive Portfolio Categories with Counts
  const portfolioCategories = [
    { slug: 'all', label: 'All Curations', count: CMS_PORTFOLIO_ITEMS.length },
    {
      slug: 'weddings',
      label: 'Weddings',
      count: CMS_PORTFOLIO_ITEMS.filter((i) => i.category === 'weddings').length,
    },
    {
      slug: 'engagements',
      label: 'Engagements',
      count: CMS_PORTFOLIO_ITEMS.filter((i) => i.category === 'engagements').length,
    },
    {
      slug: 'baby-shower',
      label: 'Baby Shower (Valaikappu)',
      count: CMS_PORTFOLIO_ITEMS.filter((i) => i.category === 'baby-shower').length,
    },
    {
      slug: '1st-birthday',
      label: '1st Birthday',
      count: CMS_PORTFOLIO_ITEMS.filter((i) => i.category === '1st-birthday').length,
    },
    {
      slug: 'baby-kids',
      label: 'Baby / Kids',
      count: CMS_PORTFOLIO_ITEMS.filter((i) => i.category === 'baby-kids').length,
    },
    {
      slug: 'pre-weddings',
      label: 'Pre-Weddings',
      count: CMS_PORTFOLIO_ITEMS.filter((i) => i.category === 'pre-weddings').length,
    },
    {
      slug: 'couple-portraits',
      label: 'Couple Portraits',
      count: CMS_PORTFOLIO_ITEMS.filter((i) => i.category === 'couple-portraits').length,
    },
    {
      slug: 'maternity',
      label: 'Maternity',
      count: CMS_PORTFOLIO_ITEMS.filter((i) => i.category === 'maternity').length,
    },
    {
      slug: 'fashion',
      label: 'Fashion & Couture',
      count: CMS_PORTFOLIO_ITEMS.filter((i) => i.category === 'fashion').length,
    },
    {
      slug: 'events',
      label: 'Events & Culture',
      count: CMS_PORTFOLIO_ITEMS.filter((i) => i.category === 'events').length,
    },
    {
      slug: 'product',
      label: 'Product & Jewelry',
      count: CMS_PORTFOLIO_ITEMS.filter((i) => i.category === 'product').length,
    },
    {
      slug: 'commercial',
      label: 'Commercial & Summits',
      count: CMS_PORTFOLIO_ITEMS.filter((i) => i.category === 'commercial').length,
    },
  ];

  const filteredPortfolio =
    selectedCategoryTab === 'all'
      ? CMS_PORTFOLIO_ITEMS
      : CMS_PORTFOLIO_ITEMS.filter((item) => item.category === selectedCategoryTab);

  const visualJourneys = [
    {
      num: '01',
      title: 'Wildlife & Still Life',
      desc: 'Mastering patience, instinctive timing, and observing the natural world without artificial interference.',
      icon: <Compass size={24} className="text-purple-600 dark:text-purple-400" />,
    },
    {
      num: '02',
      title: 'Architecture & Geometry',
      desc: 'Understanding structural light, shadow choreography, symmetry, and how spaces frame human emotion.',
      icon: <Eye size={24} className="text-rose-600 dark:text-rose-400" />,
    },
    {
      num: '03',
      title: 'Indian Festivals & Celebrations',
      desc: 'Discovering the soul of cultural vibrancy—sacred fires, temple silks, golden jewelry, and familial bonding.',
      icon: <Sparkles size={24} className="text-gold-500 dark:text-gold-400" />,
    },
    {
      num: '04',
      title: 'Couture & Fashion Narratives',
      desc: 'Translating form, high-fashion silhouettes, and texture into editorial fine art.',
      icon: <Film size={24} className="text-purple-600 dark:text-purple-400" />,
    },
    {
      num: '05',
      title: 'Innocence & Family Heritage',
      desc: 'Honoring newborn innocence, maternal elegance, and milestone moments meant to transcend generations.',
      icon: <Heart size={24} className="text-rose-600 dark:text-rose-400" />,
    },
  ];

  const filteredStories =
    storyFilter === 'All' ? CMS_STORIES : CMS_STORIES.filter((s) => s.category === storyFilter);

  return (
    <div className={`w-full flex flex-col theme-${page.theme || 'lavender'}`}>
      {page.sections.map((section, sIdx) => {
        const isSectionSelected = isBuilder && selectedSectionId === section.id;

        return (
          <section
            key={section.id}
            onClick={(e) => {
              if (isBuilder && onSelectSection) {
                e.stopPropagation();
                onSelectSection(section.id);
              }
            }}
            className={`relative transition-all duration-200 ${
              isBuilder
                ? isSectionSelected
                  ? 'ring-2 ring-purple-600 ring-offset-2 z-20'
                  : 'hover:ring-1 hover:ring-purple-300'
                : ''
            }`}
          >
            {/* Builder Hover Toolbar */}
            {isBuilder && (
              <div className="absolute top-3 right-3 opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity bg-black/85 backdrop-blur-md rounded-xl p-1.5 flex items-center gap-1.5 z-40 text-white shadow-xl">
                <span className="text-[9px] font-mono text-purple-300 font-bold px-1.5 uppercase">
                  {section.name || section.type}
                </span>
                {onMoveSection && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onMoveSection(sIdx, 'up');
                      }}
                      disabled={sIdx === 0}
                      className="p-1 hover:bg-white/20 rounded disabled:opacity-20"
                      title="Move Section Up"
                    >
                      <ChevronUp size={13} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onMoveSection(sIdx, 'down');
                      }}
                      disabled={sIdx === page.sections.length - 1}
                      className="p-1 hover:bg-white/20 rounded disabled:opacity-20"
                      title="Move Section Down"
                    >
                      <ChevronDown size={13} />
                    </button>
                  </>
                )}
                {onDuplicateSection && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDuplicateSection(section);
                    }}
                    className="p-1 hover:bg-white/20 rounded"
                    title="Duplicate Section"
                  >
                    <Copy size={13} />
                  </button>
                )}
                {onDeleteSection && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSection(section.id);
                    }}
                    className="p-1 hover:bg-rose-600 rounded text-rose-400 hover:text-white"
                    title="Delete Section"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            )}

            {/* 1. HERO SECTION */}
            {section.type === 'hero' &&
              (section.id === 'sec-home-hero' || page.id === 'home' ? (
                <div className="relative h-[90vh] min-h-[620px] w-full overflow-hidden bg-[#0A0412] text-white flex items-center justify-center">
                  {heroImages.map((img, idx) => (
                    <div
                      key={idx}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        idx === currentHeroIndex
                          ? 'opacity-100 z-10 scale-100'
                          : 'opacity-0 z-0 scale-105'
                      }`}
                      style={{ transition: 'opacity 1.2s ease, transform 6s ease' }}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover object-center brightness-[0.75] contrast-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0412] via-transparent to-[#0A0412]/60" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0412]/50 via-transparent to-[#0A0412]/50" />
                    </div>
                  ))}

                  <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-6 mt-12">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 dark:bg-purple-950/60 backdrop-blur-md border border-white/20 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                      <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gold-300 font-semibold">
                        PhotoMagic Studios by RK
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      <h1 className="font-hero text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] drop-shadow-lg">
                        Moments Through Our Eyes
                      </h1>
                      <p className="font-tamil text-sm sm:text-lg text-purple-200/90 font-medium tracking-wide mt-1">
                        {STUDIO_PROFILE.tamilStatement}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                      <Link href="/book">
                        <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-rose-500 to-purple-600 hover:opacity-95 text-white font-nav text-xs sm:text-sm font-bold uppercase tracking-[0.22em] shadow-[0_8px_30px_rgba(225,29,72,0.35)] transition-all flex items-center gap-3">
                          <Calendar size={16} />
                          <span>Check Your Date</span>
                        </button>
                      </Link>
                      <Link href="/portfolio">
                        <button className="px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-nav text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] backdrop-blur-md border border-white/25 transition-all flex items-center gap-2">
                          <span>Explore Stories</span>
                          <ArrowRight size={15} />
                        </button>
                      </Link>
                    </div>

                    <div className="flex items-center gap-4 mt-6 text-xs text-white/70 font-mono">
                      <button
                        onClick={() =>
                          setCurrentHeroIndex(
                            (prev) => (prev - 1 + heroImages.length) % heroImages.length,
                          )
                        }
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        aria-label="Previous"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <span className="tracking-wider text-[11px] truncate max-w-xs sm:max-w-md">
                        {heroImages[currentHeroIndex].caption}
                      </span>
                      <button
                        onClick={() =>
                          setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length)
                        }
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        aria-label="Next"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative pt-32 pb-16 px-6 max-w-5xl mx-auto text-center flex flex-col items-center gap-4">
                  {section.elements.find((el) => el.type === 'badge' || el.id.includes('sub')) && (
                    <span className="font-nav text-[10px] uppercase tracking-[0.28em] text-rose-600 dark:text-rose-400 font-bold block mb-1">
                      {section.elements.find((el) => el.type === 'badge' || el.id.includes('sub'))
                        ?.content?.text || 'PHOTOMAGIC STUDIOS BY RK'}
                    </span>
                  )}

                  <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-purple-950 dark:text-purple-50 leading-tight">
                    {section.elements.find((el) => el.type === 'heading')?.content?.text ||
                      page.title}
                  </h1>

                  {section.elements.find((el) => el.type === 'tamil-text') && (
                    <p className="font-tamil text-sm sm:text-base text-purple-800 dark:text-purple-300 font-medium">
                      {section.elements.find((el) => el.type === 'tamil-text')?.content?.text ||
                        STUDIO_PROFILE.tamilStatement}
                    </p>
                  )}

                  {section.elements.find((el) => el.type === 'text' && !el.id.includes('sub')) && (
                    <p className="text-xs sm:text-sm text-purple-900/80 dark:text-purple-300/80 max-w-2xl leading-relaxed mt-2">
                      {
                        section.elements.find((el) => el.type === 'text' && !el.id.includes('sub'))
                          ?.content?.text
                      }
                    </p>
                  )}
                </div>
              ))}

            {/* 2. PHILOSOPHY SECTION */}
            {section.type === 'philosophy' && (
              <div className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-5 relative">
                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-purple-200/80 dark:border-purple-900/40 shadow-museum">
                      <img
                        src="/images/hindu_wedding_ceremony.png"
                        alt="PhotoMagic Philosophy"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 dark:bg-[#170C22]/90 backdrop-blur-md border border-purple-200/60 dark:border-purple-800/40 shadow-lg">
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-rose-600 dark:text-rose-400 font-bold block">
                          Studio Philosophy
                        </span>
                        <p className="font-hero text-xs font-bold text-purple-950 dark:text-purple-100 mt-1">
                          "Knowing what to add, what to remove, and what to intentionally skip."
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7 flex flex-col gap-6">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span className="font-nav text-[10px] uppercase tracking-[0.25em] text-rose-600 dark:text-rose-400 font-bold">
                        The PhotoMagic Perspective
                      </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-purple-950 dark:text-purple-50 tracking-tight leading-tight">
                      Photography for Indian Celebrations, Families, People, Fashion & Stories
                    </h2>

                    <p className="text-sm sm:text-base text-purple-900/80 dark:text-purple-200/80 leading-relaxed font-normal">
                      {STUDIO_PROFILE.founderStory}
                    </p>

                    <p className="text-sm sm:text-base text-purple-900/80 dark:text-purple-200/80 leading-relaxed font-normal">
                      {STUDIO_PROFILE.photographyPhilosophy}
                    </p>

                    <div className="p-6 rounded-2xl bg-purple-100/50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/50 flex items-start gap-4 shadow-sm">
                      <Quote size={28} className="text-rose-500 flex-shrink-0 mt-1" />
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-rose-600 dark:text-rose-400 font-bold">
                          The Desired Reaction
                        </span>
                        <p className="text-sm sm:text-base font-semibold text-purple-950 dark:text-purple-100 italic mt-1 leading-snug">
                          "{STUDIO_PROFILE.clientReactionQuote}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. CATEGORIES SECTION */}
            {section.type === 'categories' && (
              <div className="py-24 px-6 bg-purple-50/50 dark:bg-[#12071E]/50 border-t border-b border-purple-200/60 dark:border-purple-900/40">
                <div className="max-w-7xl mx-auto flex flex-col gap-12">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                      <span className="font-nav text-[10px] uppercase tracking-[0.25em] text-rose-600 dark:text-rose-400 font-bold block">
                        Portfolio Categories
                      </span>
                      <h2 className="text-3xl sm:text-4xl font-extrabold text-purple-950 dark:text-purple-50 mt-1">
                        Curated Photographic Realms
                      </h2>
                      <p className="text-xs sm:text-sm text-purple-800 dark:text-purple-300 mt-2 max-w-xl">
                        Every celebration and milestone carries its own distinct atmosphere. Explore
                        our 10 official categories.
                      </p>
                    </div>

                    <Link href="/portfolio">
                      <button className="px-5 py-2.5 rounded-xl border border-purple-300 dark:border-purple-700 text-xs font-nav font-bold uppercase tracking-wider text-purple-900 dark:text-purple-200 hover:bg-purple-100 flex items-center gap-2">
                        <span>View Full Portfolio</span>
                        <ArrowUpRight size={14} />
                      </button>
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                    {OFFICIAL_CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/portfolio?category=${cat.slug}`}
                        className="group flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-[#170C22] border border-purple-200/70 dark:border-purple-800/40 shadow-sm hover:shadow-museum hover:border-rose-400 transition-all duration-300"
                      >
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-purple-100 dark:bg-purple-950">
                          <img
                            src={cat.heroMedia}
                            alt={cat.creativeName}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <span className="absolute bottom-2.5 left-2.5 font-mono text-[9px] uppercase tracking-wider text-white bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                            {cat.actualName}
                          </span>
                        </div>

                        <div className="p-4 flex flex-col flex-1 justify-between">
                          <div>
                            <h3 className="font-hero text-sm font-bold text-purple-950 dark:text-purple-100 group-hover:text-rose-600 transition-colors leading-snug">
                              {cat.creativeName}
                            </h3>
                            <p className="text-[11px] text-purple-800/80 dark:text-purple-300/80 mt-1 line-clamp-2">
                              {cat.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. STORIES PREVIEW */}
            {section.type === 'stories-preview' && (
              <div className="py-24 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col gap-12">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-purple-200/60 dark:border-purple-900/40 pb-6">
                    <div>
                      <span className="font-nav text-[10px] uppercase tracking-[0.25em] text-rose-600 dark:text-rose-400 font-bold block">
                        Visual Stories & Journals
                      </span>
                      <h2 className="text-3xl sm:text-4xl font-extrabold text-purple-950 dark:text-purple-50 mt-1">
                        Show Me How You See Life
                      </h2>
                    </div>

                    <Link href="/stories">
                      <button className="px-5 py-2.5 rounded-xl border border-purple-300 dark:border-purple-700 text-xs font-nav font-bold uppercase tracking-wider text-purple-900 dark:text-purple-200 flex items-center gap-2">
                        <span>All Visual Stories</span>
                        <ArrowRight size={14} />
                      </button>
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {CMS_STORIES.slice(0, 4).map((story) => (
                      <Link
                        key={story.id}
                        href={`/stories/${story.slug}`}
                        className="group flex flex-col rounded-3xl overflow-hidden bg-white dark:bg-[#170C22] border border-purple-200/70 dark:border-purple-800/40 shadow-sm hover:shadow-museum transition-all"
                      >
                        <div className="relative aspect-[16/9] w-full overflow-hidden">
                          <img
                            src={story.coverMedia}
                            alt={story.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-widest text-white bg-purple-950/70 px-2.5 py-1 rounded-full backdrop-blur-md">
                            {story.category} • {story.year}
                          </div>
                        </div>

                        <div className="p-6 flex flex-col gap-2">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-rose-600 dark:text-rose-400 font-semibold">
                            {story.location}
                          </span>
                          <h3 className="text-xl font-bold font-hero text-purple-950 dark:text-purple-100 group-hover:text-rose-600 transition-colors">
                            {story.title}
                          </h3>
                          <p className="text-xs text-purple-900/80 dark:text-purple-300/80 line-clamp-2">
                            {story.minimalContext}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 5. PACKAGES PREVIEW */}
            {section.type === 'packages-preview' && (
              <div className="py-24 px-6 bg-purple-50/50 dark:bg-[#12071E]/50 border-t border-b border-purple-200/60 dark:border-purple-900/40">
                <div className="max-w-7xl mx-auto flex flex-col gap-12">
                  <div className="text-center max-w-2xl mx-auto">
                    <span className="font-nav text-[10px] uppercase tracking-[0.25em] text-rose-600 dark:text-rose-400 font-bold block">
                      Investment Collections
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-purple-950 dark:text-purple-50 mt-1">
                      Curated Photography Collections
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
                    {DEFAULT_PACKAGES.map((pkg) => (
                      <div
                        key={pkg.id}
                        className={`flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-[#170C22] border transition-all relative ${
                          pkg.featured
                            ? 'border-purple-600 dark:border-purple-500 shadow-museum'
                            : 'border-purple-200/80 dark:border-purple-800/40'
                        }`}
                      >
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-wider text-rose-600 dark:text-rose-400 font-bold">
                            {pkg.creativeTier}
                          </span>
                          <h3 className="text-base font-bold font-hero text-purple-950 dark:text-purple-100 mt-1">
                            {pkg.name}
                          </h3>
                          <div className="text-2xl font-extrabold text-purple-900 dark:text-purple-200 font-mono mt-2 mb-3">
                            {pkg.formattedPrice}
                          </div>
                          <p className="text-[11px] text-purple-800/80 dark:text-purple-300/80 leading-relaxed mb-4">
                            {pkg.description}
                          </p>
                        </div>

                        <Link href={`/book?package=${pkg.id}`}>
                          <button className="w-full py-2 rounded-xl bg-purple-100 dark:bg-purple-900/60 font-nav text-[10px] font-bold uppercase tracking-wider text-purple-950 dark:text-white">
                            Reserve Collection
                          </button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 6. CUSTOM PACKAGE CTA BANNER */}
            {section.type === 'custom-package-cta' && (
              <div className="py-20 px-6 max-w-7xl mx-auto">
                <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-950 via-purple-900 to-[#1F0736] text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-museum">
                  <div className="flex flex-col gap-3 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal size={16} className="text-gold-400" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400 font-bold">
                        Bespoke Photography Architecture
                      </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold font-hero text-white tracking-tight">
                      Choose on Your Own Preference
                    </h2>
                    <p className="text-sm text-purple-200/80 leading-relaxed">
                      Build your own collection with candid photographers, 4K cinema, drone, and
                      handcrafted albums with dynamic 5%–20% combination savings.
                    </p>
                  </div>

                  <Link href="/packages#customize">
                    <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-600 text-white font-nav text-xs font-bold uppercase tracking-[0.2em] shadow-lg">
                      Build Custom Collection
                    </button>
                  </Link>
                </div>
              </div>
            )}

            {/* 7. CREDIBILITY SECTION */}
            {section.type === 'credibility' && (
              <div className="py-16 px-6 max-w-7xl mx-auto border-t border-purple-200/60 dark:border-purple-900/40">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                  <div className="flex flex-col items-center p-6 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/40">
                    <span className="font-hero text-4xl sm:text-5xl font-extrabold text-purple-950 dark:text-purple-100 font-mono">
                      3+
                    </span>
                    <span className="font-nav text-xs uppercase tracking-[0.2em] text-rose-600 dark:text-rose-400 font-bold mt-2">
                      Years of Dedicated Artistry
                    </span>
                  </div>

                  <div className="flex flex-col items-center p-6 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/40">
                    <span className="font-hero text-4xl sm:text-5xl font-extrabold text-purple-950 dark:text-purple-100 font-mono">
                      50+
                    </span>
                    <span className="font-nav text-xs uppercase tracking-[0.2em] text-rose-600 dark:text-rose-400 font-bold mt-2">
                      Grand Celebrations & Events
                    </span>
                  </div>

                  <div className="flex flex-col items-center p-6 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/40">
                    <span className="font-hero text-4xl sm:text-5xl font-extrabold text-purple-950 dark:text-purple-100 font-mono">
                      1,000,000+
                    </span>
                    <span className="font-nav text-xs uppercase tracking-[0.2em] text-rose-600 dark:text-rose-400 font-bold mt-2">
                      Photographs Captured
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 8. TESTIMONIALS SECTION */}
            {section.type === 'testimonials' && (
              <div className="py-24 px-6 bg-purple-50/50 dark:bg-[#12071E]/50 border-t border-b border-purple-200/60 dark:border-purple-900/40">
                <div className="max-w-7xl mx-auto flex flex-col gap-12">
                  <div className="text-center max-w-2xl mx-auto">
                    <span className="font-nav text-[10px] uppercase tracking-[0.25em] text-rose-600 dark:text-rose-400 font-bold block">
                      Client Chronicles
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-purple-950 dark:text-purple-50 mt-1">
                      Words From Our Families
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {CMS_TESTIMONIALS.map((t) => (
                      <div
                        key={t.id}
                        className="p-6 rounded-3xl bg-white dark:bg-[#170C22] border border-purple-200/80 dark:border-purple-800/40 shadow-sm flex flex-col justify-between"
                      >
                        <div>
                          <p className="text-xs text-purple-950 dark:text-purple-100 italic leading-relaxed mb-3">
                            "{t.quote}"
                          </p>
                          {t.tamilQuote && (
                            <p className="font-tamil text-[11px] text-purple-800/90 dark:text-purple-300/90 font-medium leading-relaxed mb-3">
                              "{t.tamilQuote}"
                            </p>
                          )}
                        </div>

                        <div className="pt-3 border-t border-purple-100 dark:border-purple-900/40 flex flex-col">
                          <span className="font-hero text-xs font-bold text-purple-950 dark:text-purple-100">
                            {t.clientName}
                          </span>
                          <span className="font-mono text-[10px] text-rose-600 dark:text-rose-400">
                            {t.event} • {t.location}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 9. FINAL CTA SECTION */}
            {section.type === 'final-cta' && (
              <div className="py-24 px-6 max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
                <span className="font-nav text-xs uppercase tracking-[0.3em] text-rose-600 dark:text-rose-400 font-bold">
                  Reserve Your Chapter
                </span>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-purple-950 dark:text-purple-50 tracking-tight leading-tight">
                  Let Us Record Your Event on Our Timeline
                </h2>
                <p className="text-sm sm:text-base text-purple-900/80 dark:text-purple-200/80 max-w-xl leading-relaxed">
                  Based in South India. Available across India for weddings, pre-weddings,
                  celebrations, and family milestones.
                </p>

                <div className="pt-4">
                  <Link href="/book">
                    <button className="px-10 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-rose-500 to-purple-600 text-white font-nav text-sm font-bold uppercase tracking-[0.2em] shadow-lg flex items-center gap-3">
                      <Calendar size={16} />
                      <span>Check Your Date Availability</span>
                    </button>
                  </Link>
                </div>
              </div>
            )}

            {/* 10. ABOUT JOURNEY SECTION */}
            {section.type === 'about-journey' && (
              <div className="py-24 px-6 bg-purple-50/50 dark:bg-[#12071E]/50 border-t border-b border-purple-200/60 dark:border-purple-900/40">
                <div className="max-w-7xl mx-auto flex flex-col gap-12">
                  <div className="text-center max-w-2xl mx-auto">
                    <span className="font-nav text-[10px] uppercase tracking-[0.25em] text-rose-600 dark:text-rose-400 font-bold block">
                      The Five Foundations
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-purple-950 dark:text-purple-50 mt-1">
                      How Our Perspective Was Forged
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {visualJourneys.map((j) => (
                      <div
                        key={j.num}
                        className="p-6 rounded-3xl bg-white dark:bg-[#170C22] border border-purple-200/80 dark:border-purple-800/40 shadow-sm flex flex-col justify-between"
                      >
                        <div>
                          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 flex items-center justify-center mb-4">
                            {j.icon}
                          </div>
                          <span className="font-mono text-xs font-bold text-rose-600 dark:text-rose-400">
                            {j.num}
                          </span>
                          <h4 className="text-base font-bold text-purple-950 dark:text-purple-100 font-hero mt-1 mb-2">
                            {j.title}
                          </h4>
                          <p className="text-xs text-purple-800/80 dark:text-purple-300/80 leading-relaxed">
                            {j.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 11. PORTFOLIO GRID SECTION */}
            {section.type === 'portfolio-grid' && (
              <div className="py-12 px-6 max-w-7xl mx-auto w-full">
                {/* Category Navigation Pills with Counts */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                  {portfolioCategories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategoryTab(cat.slug)}
                      className={`px-4 py-2 rounded-full font-nav text-[11px] sm:text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                        selectedCategoryTab === cat.slug
                          ? 'bg-gradient-to-r from-purple-700 via-rose-600 to-purple-700 text-white font-bold shadow-md ring-2 ring-rose-400/30'
                          : 'bg-white dark:bg-[#170C22] text-purple-950/80 dark:text-purple-200 border border-purple-200/80 dark:border-purple-800/60 hover:border-rose-400'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full ${
                          selectedCategoryTab === cat.slug
                            ? 'bg-white/20 text-white'
                            : 'bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300'
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Asymmetric Fine Art Masonry Gallery */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[320px]">
                  {filteredPortfolio.map((item, idx) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedPhotoIndex(idx)}
                      className={`group relative rounded-3xl overflow-hidden cursor-pointer bg-purple-100 dark:bg-purple-950 border border-purple-200/70 dark:border-purple-800/50 shadow-sm hover:shadow-museum transition-all duration-500 ${
                        item.aspect === 'tall' ? 'sm:row-span-2' : ''
                      } ${item.aspect === 'wide' ? 'sm:col-span-2' : ''}`}
                    >
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-75 group-hover:opacity-95 transition-opacity" />

                      {/* Floating Category Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-white/90 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                          {item.categoryName}
                        </span>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end z-10">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-rose-300 font-bold">
                          {item.location} • {item.year}
                        </span>
                        <h3 className="font-hero text-base sm:text-lg font-bold text-white mt-1 leading-snug drop-shadow-sm">
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-purple-200/80 line-clamp-2 mt-1 font-normal">
                          {item.caption}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 12. SERVICES LIST SECTION */}
            {section.type === 'services-list' && (
              <div className="py-12 px-6 max-w-7xl mx-auto w-full flex flex-col gap-12">
                {CMS_SERVICES.map((service, idx) => (
                  <div
                    key={service.id}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#170C22] border border-purple-200/80 shadow-sm"
                  >
                    <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden bg-purple-100">
                      <img
                        src={service.heroMedia}
                        alt={service.creativeName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="lg:col-span-7 flex flex-col gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-rose-600 font-bold">
                        {service.actualName}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold font-hero text-purple-950 dark:text-purple-50">
                        {service.creativeName}
                      </h2>
                      <p className="text-xs sm:text-sm text-purple-900/80 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="pt-3">
                        <Link href={`/services/${service.slug}`}>
                          <button className="px-6 py-2.5 rounded-xl bg-purple-700 text-white font-nav text-xs font-bold uppercase tracking-wider">
                            Explore Service Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 14. BOOKING WIZARD SECTION */}
            {section.type === 'booking-wizard' && (
              <div className="py-12 px-6 max-w-4xl mx-auto w-full">
                <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#170C22] border border-purple-200/80 dark:border-purple-800/40 shadow-museum flex flex-col gap-8">
                  {bookSubmitted ? (
                    <div className="text-center py-12 flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                        <CheckCircle2 size={32} />
                      </div>
                      <h3 className="text-2xl font-bold font-hero text-purple-950 dark:text-purple-50">
                        Date Inquiry Transmitted
                      </h3>
                      <p className="text-xs sm:text-sm text-purple-800 dark:text-purple-300 max-w-md">
                        Thank you, {bookName || 'Celebration Host'}. Rozar Khan and the PhotoMagic
                        concierge will verify timeline availability and reach out via WhatsApp at{' '}
                        {bookPhone || 'your number'}.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between border-b border-purple-100 dark:border-purple-900/40 pb-4">
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-widest text-rose-600 font-bold">
                            Step {bookStep} of 4
                          </span>
                          <h3 className="text-xl font-bold font-hero text-purple-950 dark:text-purple-50 mt-0.5">
                            {bookStep === 1 && 'Select Celebration Type'}
                            {bookStep === 2 && 'Event Date & Location'}
                            {bookStep === 3 && 'Preferred Package Collection'}
                            {bookStep === 4 && 'Your Contact Coordinates'}
                          </h3>
                        </div>
                        <span className="font-mono text-xs text-purple-400">
                          {bookStep * 25}% Complete
                        </span>
                      </div>

                      {bookStep === 1 && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {OFFICIAL_CATEGORIES.slice(0, 8).map((cat) => (
                            <button
                              key={cat.id}
                              onClick={() => setBookCategory(cat.slug)}
                              className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                                bookCategory === cat.slug
                                  ? 'bg-purple-900 text-white border-purple-900 shadow-md font-bold'
                                  : 'bg-purple-50/50 dark:bg-purple-950/30 border-purple-200/70 text-purple-950 dark:text-purple-200'
                              }`}
                            >
                              <span className="text-xs font-hero">{cat.actualName}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {bookStep === 2 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-mono text-purple-900 dark:text-purple-200 font-semibold">
                              Primary Event Date
                            </label>
                            <input
                              type="date"
                              value={bookDate}
                              onChange={(e) => setBookDate(e.target.value)}
                              className="p-3 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/40 dark:bg-purple-950/30 text-xs font-mono text-purple-950 dark:text-white"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-mono text-purple-900 dark:text-purple-200 font-semibold">
                              City / Region
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Chennai, Madurai, Kochi"
                              value={bookCity}
                              onChange={(e) => setBookCity(e.target.value)}
                              className="p-3 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/40 dark:bg-purple-950/30 text-xs text-purple-950 dark:text-white"
                            />
                          </div>
                        </div>
                      )}

                      {bookStep === 3 && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {DEFAULT_PACKAGES.slice(0, 3).map((pkg) => (
                            <div
                              key={pkg.id}
                              onClick={() => setBookPkg(pkg.id)}
                              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                                bookPkg === pkg.id
                                  ? 'bg-purple-900 text-white border-purple-900 shadow-md font-bold'
                                  : 'bg-purple-50/50 dark:bg-purple-950/30 border-purple-200/70 text-purple-950 dark:text-purple-200'
                              }`}
                            >
                              <span className="font-mono text-[9px] uppercase tracking-wider block opacity-75">
                                {pkg.creativeTier}
                              </span>
                              <h4 className="text-sm font-bold font-hero mt-1">{pkg.name}</h4>
                              <span className="font-mono text-base font-extrabold block mt-2">
                                {pkg.formattedPrice}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {bookStep === 4 && (
                        <div className="flex flex-col gap-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="Your Full Name"
                              value={bookName}
                              onChange={(e) => setBookName(e.target.value)}
                              className="p-3 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/40 dark:bg-purple-950/30 text-xs text-purple-950 dark:text-white"
                            />
                            <input
                              type="tel"
                              placeholder="WhatsApp Number (e.g. 7904943234)"
                              value={bookPhone}
                              onChange={(e) => setBookPhone(e.target.value)}
                              className="p-3 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/40 dark:bg-purple-950/30 text-xs font-mono text-purple-950 dark:text-white"
                            />
                          </div>
                          <input
                            type="email"
                            placeholder="Email Address"
                            value={bookEmail}
                            onChange={(e) => setBookEmail(e.target.value)}
                            className="p-3 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/40 dark:bg-purple-950/30 text-xs font-mono text-purple-950 dark:text-white"
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-purple-100 dark:border-purple-900/40">
                        {bookStep > 1 ? (
                          <button
                            onClick={() => setBookStep((prev) => prev - 1)}
                            className="px-5 py-2.5 rounded-xl border border-purple-200 text-xs font-nav font-bold uppercase tracking-wider text-purple-900 dark:text-purple-200"
                          >
                            Back
                          </button>
                        ) : (
                          <div />
                        )}

                        {bookStep < 4 ? (
                          <button
                            onClick={() => setBookStep((prev) => prev + 1)}
                            className="px-6 py-2.5 rounded-xl bg-purple-800 hover:bg-purple-700 text-white font-nav text-xs font-bold uppercase tracking-wider shadow-md"
                          >
                            Continue
                          </button>
                        ) : (
                          <button
                            onClick={() => setBookSubmitted(true)}
                            className="px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-rose-500 to-purple-600 text-white font-nav text-xs font-bold uppercase tracking-wider shadow-lg"
                          >
                            Lock Inquiry on Timeline
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* 15. CONTACT CONCIERGE SECTION */}
            {section.type === 'contact-concierge' && (
              <div className="py-12 px-6 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  <div className="lg:col-span-5 flex flex-col gap-6">
                    <div className="p-8 rounded-3xl bg-white dark:bg-[#170C22] border border-purple-200/80 dark:border-purple-800/40 shadow-sm flex flex-col gap-6">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-rose-600 font-bold">
                        Direct Studio Coordinates
                      </span>

                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 flex items-center justify-center text-purple-700 dark:text-purple-300 flex-shrink-0">
                          <Phone size={20} />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-purple-400 block">
                            Phone / WhatsApp
                          </span>
                          <a
                            href="tel:7904943234"
                            className="text-base font-bold font-mono text-purple-950 dark:text-purple-100 hover:text-rose-600"
                          >
                            7904943234
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 flex items-center justify-center text-purple-700 dark:text-purple-300 flex-shrink-0">
                          <Instagram size={20} />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-purple-400 block">
                            Instagram
                          </span>
                          <a
                            href="https://instagram.com/rkae_photgraphs"
                            target="_blank"
                            rel="noreferrer"
                            className="text-base font-bold font-mono text-purple-950 dark:text-purple-100 hover:text-rose-600"
                          >
                            @rkae_photgraphs
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 flex items-center justify-center text-purple-700 dark:text-purple-300 flex-shrink-0">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-purple-400 block">
                            Regions Covered
                          </span>
                          <span className="text-xs font-semibold text-purple-950 dark:text-purple-100">
                            Tamil Nadu · Pondicherry · Kerala · India
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#170C22] border border-purple-200/80 dark:border-purple-800/40 shadow-sm flex flex-col gap-6">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-rose-600 font-bold">
                        Studio Concierge Direct Inquiry
                      </span>

                      {contactSubmitted ? (
                        <div className="text-center py-10 flex flex-col items-center gap-3">
                          <CheckCircle2 size={32} className="text-emerald-500" />
                          <h4 className="text-xl font-bold font-hero text-purple-950 dark:text-purple-50">
                            Message Received
                          </h4>
                          <p className="text-xs text-purple-800 dark:text-purple-300">
                            Thank you. Rozar Khan will respond promptly.
                          </p>
                        </div>
                      ) : (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            setContactSubmitted(true);
                          }}
                          className="flex flex-col gap-4"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="Your Name"
                              required
                              value={contactName}
                              onChange={(e) => setContactName(e.target.value)}
                              className="p-3.5 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/30 dark:bg-purple-950/20 text-xs text-purple-950 dark:text-white"
                            />
                            <input
                              type="tel"
                              placeholder="WhatsApp / Phone (7904943234)"
                              required
                              value={contactPhone}
                              onChange={(e) => setContactPhone(e.target.value)}
                              className="p-3.5 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/30 dark:bg-purple-950/20 text-xs font-mono text-purple-950 dark:text-white"
                            />
                          </div>

                          <input
                            type="email"
                            placeholder="Email Address"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            className="p-3.5 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/30 dark:bg-purple-950/20 text-xs font-mono text-purple-950 dark:text-white"
                          />

                          <textarea
                            placeholder="Tell us about your celebration, wedding dates, or commission vision..."
                            rows={4}
                            required
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            className="p-3.5 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/30 dark:bg-purple-950/20 text-xs text-purple-950 dark:text-white"
                          />

                          <button
                            type="submit"
                            className="py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-rose-500 to-purple-600 text-white font-nav text-xs font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
                          >
                            <Send size={14} />
                            <span>Transmit Message</span>
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        );
      })}

      {/* FULL INTERACTIVE FINE ART LIGHTBOX MODAL */}
      {selectedPhotoIndex !== null && filteredPortfolio[selectedPhotoIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-fadeIn"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between w-full z-10 max-w-7xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-rose-400 bg-rose-950/80 px-3 py-1 rounded-full border border-rose-800/60">
                {filteredPortfolio[selectedPhotoIndex].categoryName}
              </span>
              <span className="text-white/60 font-mono text-xs">
                {selectedPhotoIndex + 1} / {filteredPortfolio.length}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setWatermarkActive(!watermarkActive)}
                className={`p-2 rounded-xl border text-xs font-mono transition-colors flex items-center gap-1.5 ${
                  watermarkActive
                    ? 'bg-purple-950/80 border-purple-700 text-purple-200'
                    : 'bg-white/10 border-white/20 text-white/60'
                }`}
                title="Toggle Studio Watermark"
              >
                <Shield size={14} />
                <span className="hidden sm:inline">Watermark</span>
              </button>

              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Central Image Viewport with Nav Arrows */}
          <div
            className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() =>
                setSelectedPhotoIndex(
                  (prev) => (prev! - 1 + filteredPortfolio.length) % filteredPortfolio.length,
                )
              }
              className="absolute left-2 sm:left-6 z-20 p-3.5 rounded-full bg-black/60 hover:bg-purple-900/90 text-white border border-white/20 backdrop-blur-md transition-all"
              aria-label="Previous Photo"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="relative max-h-[75vh] max-w-5xl w-full h-full flex items-center justify-center">
              <img
                src={filteredPortfolio[selectedPhotoIndex].src}
                alt={filteredPortfolio[selectedPhotoIndex].title}
                className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
              />

              {/* Cultural Watermark Stamp */}
              {watermarkActive && (
                <div className="absolute bottom-6 right-6 pointer-events-none bg-black/70 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 flex flex-col items-end">
                  <span className="font-hero text-xs font-bold text-white tracking-wider">
                    PhotoMagic Studios by RK
                  </span>
                  <span className="font-tamil text-[10px] text-rose-300 font-medium">
                    இல்லத்தின் இன்ப நிகழ்வுகள், விழிகளின் வழியே
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() =>
                setSelectedPhotoIndex((prev) => (prev! + 1) % filteredPortfolio.length)
              }
              className="absolute right-2 sm:right-6 z-20 p-3.5 rounded-full bg-black/60 hover:bg-purple-900/90 text-white border border-white/20 backdrop-blur-md transition-all"
              aria-label="Next Photo"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Bottom Caption & Action Bar */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto w-full z-10 bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-rose-400 font-bold block">
                {filteredPortfolio[selectedPhotoIndex].location} •{' '}
                {filteredPortfolio[selectedPhotoIndex].year}
              </span>
              <h4 className="text-base sm:text-lg font-bold font-hero text-white mt-0.5">
                {filteredPortfolio[selectedPhotoIndex].title}
              </h4>
              <p className="text-xs text-white/70 max-w-2xl mt-1">
                {filteredPortfolio[selectedPhotoIndex].caption}
              </p>
            </div>

            <Link href="/book">
              <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-rose-500 to-purple-600 hover:opacity-95 text-white font-nav text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2 whitespace-nowrap">
                <Calendar size={14} />
                <span>Inquire For This Style</span>
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
