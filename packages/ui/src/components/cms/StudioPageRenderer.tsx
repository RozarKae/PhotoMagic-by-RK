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

  // Portfolio sample items
  const portfolioItems = [
    {
      id: 'p-1',
      title: 'A Dawn of Sacred Gold in Madurai',
      category: 'weddings',
      categoryName: 'Weddings',
      location: 'Madurai Palace • Tamil Nadu',
      year: '2026',
      src: '/images/hindu_wedding_ceremony.png',
      aspect: 'tall',
      caption: 'Kanjeevaram silk drapes and royal mandap rituals beneath ancient carved pillars.',
    },
    {
      id: 'p-2',
      title: 'Kochi Cathedral Matrimony',
      category: 'weddings',
      categoryName: 'Weddings',
      location: 'Kochi Cathedral • Kerala',
      year: '2026',
      src: '/images/christian_church_wedding.png',
      aspect: 'portrait',
      caption: 'Stained glass sunlight cascading over cathedral lace and timeless vows.',
    },
    {
      id: 'p-3',
      title: 'Misty Dawn Reflections',
      category: 'pre-weddings',
      categoryName: 'Pre-Weddings',
      location: 'Alleppey Backwaters • Kerala',
      year: '2026',
      src: '/images/prewedding_backwaters.png',
      aspect: 'wide',
      caption: 'Early morning canoe reflections in coconut palm waterways.',
    },
    {
      id: 'p-4',
      title: 'The Prelude Ring Exchange',
      category: 'engagements',
      categoryName: 'Engagements',
      location: 'Chennai Heritage Villa • Tamil Nadu',
      year: '2026',
      src: '/images/engagement_ceremony.png',
      aspect: 'square',
      caption: 'Intimate blessings and joyful promises with family elders.',
    },
    {
      id: 'p-5',
      title: 'Intimate Palace Silhouettes',
      category: 'couple-portraits',
      categoryName: 'Couple Portraits',
      location: 'Chettinad Palace • Tamil Nadu',
      year: '2026',
      src: '/images/hero_wedding_couple.png',
      aspect: 'portrait',
      caption: 'Quiet royal grandeur and effortless couple chemistry.',
    },
    {
      id: 'p-6',
      title: 'Sculpted Silk & Gold Couture',
      category: 'fashion',
      categoryName: 'Fashion',
      location: 'Atelier Studio • Chennai',
      year: '2026',
      src: '/images/fashion_editorial.png',
      aspect: 'tall',
      caption: 'High-contrast lighting highlighting intricate metallic textures.',
    },
    {
      id: 'p-7',
      title: 'Project BabyBliss Milestone',
      category: 'baby-kids',
      categoryName: 'Baby / Kids',
      location: 'Chennai Atelier',
      year: '2026',
      src: '/images/babybliss_portrait.jpg',
      aspect: 'square',
      caption: 'Pure warmth, gentle curiosity, and innocent laughter preserved in print.',
    },
    {
      id: 'p-8',
      title: 'The Motherhood Grace',
      category: 'maternity',
      categoryName: 'Maternity',
      location: 'Kovalam Coastal Studio • Tamil Nadu',
      year: '2026',
      src: '/images/maternity_portrait.png',
      aspect: 'portrait',
      caption: 'Empowering maternity portraits sculpted by soft ambient natural light.',
    },
    {
      id: 'p-9',
      title: 'Grand Coastal Sangeet Gala',
      category: 'events',
      categoryName: 'Events',
      location: 'Kovalam Beach Resort • Kerala',
      year: '2026',
      src: '/images/grand_event_celebration.png',
      aspect: 'wide',
      caption: 'Vibrant evening celebrations beneath illuminated coastal palms.',
    },
  ];

  const filteredPortfolio =
    selectedCategoryTab === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategoryTab);

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
            {section.type === 'hero' && (
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
                      onClick={() => setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length)}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                      aria-label="Next"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}

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
                <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                  <button
                    onClick={() => setSelectedCategoryTab('all')}
                    className={`px-4 py-2 rounded-full font-nav text-xs uppercase tracking-wider transition-all ${
                      selectedCategoryTab === 'all'
                        ? 'bg-purple-900 text-white font-bold shadow-md'
                        : 'bg-white dark:bg-[#170C22] text-purple-950/80 border border-purple-200'
                    }`}
                  >
                    All Categories
                  </button>
                  {OFFICIAL_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategoryTab(cat.slug)}
                      className={`px-4 py-2 rounded-full font-nav text-xs uppercase tracking-wider transition-all ${
                        selectedCategoryTab === cat.slug
                          ? 'bg-gradient-to-r from-purple-600 to-rose-500 text-white font-bold shadow-md'
                          : 'bg-white dark:bg-[#170C22] text-purple-950/80 border border-purple-200'
                      }`}
                    >
                      {cat.actualName}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
                  {filteredPortfolio.map((item, idx) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedPhotoIndex(idx)}
                      className={`group relative rounded-3xl overflow-hidden cursor-pointer bg-purple-100 dark:bg-purple-950 border border-purple-200/70 shadow-sm ${
                        item.aspect === 'tall' ? 'sm:row-span-2' : ''
                      } ${item.aspect === 'wide' ? 'sm:col-span-2' : ''}`}
                    >
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-rose-300 font-bold">
                          {item.location}
                        </span>
                        <h3 className="font-hero text-base font-bold text-white mt-0.5 leading-snug">
                          {item.title}
                        </h3>
                        <span className="text-[10px] text-purple-200/70 font-mono mt-1">
                          {item.categoryName} • {item.year}
                        </span>
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

            {/* 13. STORIES LIST SECTION */}
            {section.type === 'stories-list' && (
              <div className="py-12 px-6 max-w-7xl mx-auto w-full flex flex-col gap-10">
                <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                  {['All', 'Weddings', 'Family', 'Fashion', 'Culture', 'Personal'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setStoryFilter(f)}
                      className={`px-5 py-2 rounded-full font-nav text-xs uppercase tracking-wider transition-all ${
                        storyFilter === f
                          ? 'bg-gradient-to-r from-purple-600 to-rose-500 text-white font-bold shadow-md'
                          : 'bg-white dark:bg-[#170C22] text-purple-950/80 border border-purple-200'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {filteredStories.map((story) => (
                    <article
                      key={story.id}
                      className="group flex flex-col rounded-3xl overflow-hidden bg-white dark:bg-[#170C22] border border-purple-200/80 shadow-sm"
                    >
                      <Link
                        href={`/stories/${story.slug}`}
                        className="block relative aspect-[16/10] w-full overflow-hidden bg-purple-100"
                      >
                        <img
                          src={story.coverMedia}
                          alt={story.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-widest text-white bg-purple-950/80 px-3 py-1 rounded-full backdrop-blur-md">
                          {story.category} • {story.year}
                        </div>
                      </Link>
                      <div className="p-8 flex flex-col gap-2">
                        <span className="font-mono text-xs text-rose-600 font-semibold">
                          {story.location}
                        </span>
                        <h2 className="text-2xl font-bold font-hero text-purple-950 dark:text-purple-100">
                          {story.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-purple-900/80 leading-relaxed">
                          {story.minimalContext}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};
