import { CmsService } from '@photomagic/types';

export const CMS_SERVICES: CmsService[] = [
  {
    id: 'srv-wedding',
    creativeName: 'Sacred Vows & Regal Unions',
    actualName: 'Wedding Photography & Cinematography',
    slug: 'wedding-photography',
    shortSummary:
      'Immersive candid coverage, timeless traditional rituals, 4K wedding films, and bespoke archival Italian albums across Tamil Nadu, Kerala, and pan-India destinations.',
    description:
      'From sacred Muhurtham ceremonies and intricate Haldi rituals to high-energy Sangeets and opulent palace receptions, our team preserves the authentic emotion and cultural magnificence of Indian weddings.',
    heroMedia: '/images/hindu_wedding_ceremony.png',
    gallery: [
      '/images/hindu_wedding_ceremony.png',
      '/images/christian_church_wedding.png',
      '/images/nikkah_ceremony.png',
      '/images/drone_aerial_wedding.png',
    ],
    featuredWork: [
      {
        title: 'Madurai Chettinad Mandap Vows',
        location: 'Madurai, Tamil Nadu',
        image: '/images/hindu_wedding_ceremony.png',
        caption: 'A sacred golden dawn ceremony steeped in heritage silk and temple jewelry.',
      },
      {
        title: 'Kochi Cathedral Matrimony',
        location: 'Kochi, Kerala',
        image: '/images/christian_church_wedding.png',
        caption: 'Stained glass sunlight cascading over timeless vows and cathedral lace.',
      },
    ],
    packages: ['pkg-moonstone', 'pkg-jade', 'pkg-obsidian', 'pkg-florentine', 'pkg-solitaire'],
    testimonials: ['t1', 't2', 't4'],
    ctaText: 'Check Your Wedding Date',
    seoTitle: 'Wedding Photography & Cinematography | PhotoMagic Studios by RK',
    seoDescription:
      'Royal South Indian wedding photography, 4K cinema films and heirloom albums across Chennai, Madurai, Coimbatore, and Kochi by PhotoMagic Studios by RK.',
    status: 'published',
  },
  {
    id: 'srv-prewedding',
    creativeName: 'Cinematic Couple Escapes',
    actualName: 'Pre-Wedding & Post-Wedding Shoots',
    slug: 'pre-wedding-shoots',
    shortSummary:
      'Editorial outdoor shoots in Alleppey backwaters, Chettinad palaces, Nilgiri tea hills, and Kovalam sunsets.',
    description:
      'Tailored cinematic sessions capturing natural intimacy and chemistry in breathtaking natural and architectural backdrops before your big day.',
    heroMedia: '/images/prewedding_backwaters.png',
    gallery: [
      '/images/prewedding_backwaters.png',
      '/images/hero_wedding_couple.png',
      '/images/drone_aerial_wedding.png',
    ],
    featuredWork: [
      {
        title: 'Alleppey Sunrise Drift',
        location: 'Alleppey Backwaters, Kerala',
        image: '/images/prewedding_backwaters.png',
        caption: 'Misty water reflections and quiet romantic poetry at first light.',
      },
    ],
    packages: ['pkg-jade', 'pkg-obsidian'],
    testimonials: ['t2'],
    ctaText: 'Reserve Couple Shoot',
    seoTitle: 'Pre-Wedding Photography | PhotoMagic Studios by RK',
    seoDescription:
      'Cinematic pre-wedding and post-wedding outdoor photo shoots across South India by PhotoMagic Studios by RK.',
    status: 'published',
  },
  {
    id: 'srv-babybliss',
    creativeName: 'Innocence & Heirloom Moments',
    actualName: 'Baby, Kids & Milestone Portraiture',
    slug: 'baby-kids-portraiture',
    shortSummary:
      'Gentle, heartfelt toddler portraits, naming ceremonies, 1st birthday milestones, and Project BabyBliss heirloom albums.',
    description:
      'Capturing the innocence, gentle curiosity, and unfiltered joy of babies and children in peaceful atelier lighting or comfort of your home.',
    heroMedia: '/images/babybliss_portrait.jpg',
    gallery: ['/images/babybliss_portrait.jpg', '/images/baby_milestone.png'],
    featuredWork: [
      {
        title: 'Project BabyBliss Atelier Session',
        location: 'Chennai Atelier, Tamil Nadu',
        image: '/images/babybliss_portrait.jpg',
        caption: 'Gentle morning light and pure innocence preserved in archival print.',
      },
    ],
    packages: ['pkg-moonstone'],
    testimonials: ['t3'],
    ctaText: 'Book Baby Session',
    seoTitle: 'Baby & Kids Photography | PhotoMagic Studios by RK',
    seoDescription:
      'Heirloom baby portraits and milestone photography in South India by PhotoMagic Studios by RK.',
    status: 'published',
  },
  {
    id: 'srv-fashion',
    creativeName: 'Haute Couture & Form',
    actualName: 'Fashion & Editorial Photography',
    slug: 'fashion-editorial',
    shortSummary:
      'High-fashion runway aesthetics, ethnic couture lookbooks, silk textile narratives, and commercial campaigns.',
    description:
      'Editorial lighting, high-contrast monochrome, and vibrant color balance crafted for designers, models, and contemporary Indian fashion brands.',
    heroMedia: '/images/fashion_editorial.png',
    gallery: ['/images/fashion_editorial.png', '/images/hero_wedding_couple.png'],
    featuredWork: [
      {
        title: 'Silk & Gold Textile Editorial',
        location: 'Chennai Studio, Tamil Nadu',
        image: '/images/fashion_editorial.png',
        caption: 'Sculpted lighting accentuating traditional Kanjeevaram weaves.',
      },
    ],
    packages: ['pkg-obsidian', 'pkg-solitaire'],
    testimonials: ['t4'],
    ctaText: 'Commission Fashion Editorial',
    seoTitle: 'Fashion & Editorial Photography | PhotoMagic Studios by RK',
    seoDescription: 'Contemporary fashion and couture photography by PhotoMagic Studios by RK.',
    status: 'published',
  },
  {
    id: 'srv-events',
    creativeName: 'Grand Celebrations & Gatherings',
    actualName: 'Family & Corporate Events',
    slug: 'events-commercial',
    shortSummary:
      'Comprehensive visual documentation for milestone anniversaries, housewarmings, cultural galas, and corporate summits.',
    description:
      'Fast-paced, discreet, multi-angle coverage ensuring every keynote, handshake, ritual, and candid celebration is crystal clear.',
    heroMedia: '/images/grand_event_celebration.png',
    gallery: [
      '/images/grand_event_celebration.png',
      '/images/corporate_conference_summit.png',
      '/images/drone_aerial_wedding.png',
    ],
    featuredWork: [
      {
        title: 'Annual Leadership Convention',
        location: 'Chennai Convention Center',
        image: '/images/corporate_conference_summit.png',
        caption: 'High-speed event coverage capturing executive poise and audience vibrancy.',
      },
    ],
    packages: ['pkg-moonstone', 'pkg-jade'],
    testimonials: ['t1'],
    ctaText: 'Check Event Date',
    seoTitle: 'Event & Commercial Photography | PhotoMagic Studios by RK',
    seoDescription: 'Professional event and corporate photography by PhotoMagic Studios by RK.',
    status: 'published',
  },
];

// =============================================================================
// CMS DYNAMIC STORIES (CINEMATIC VISUAL JOURNAL & MAGAZINE)
// =============================================================================
