import {
  PhotographyCategory,
  CmsService,
  CmsStory,
  CmsPackage,
  CmsTestimonial,
} from '@photomagic/types';

export interface StudioProfile {
  name: string;
  brandName: string;
  brandLine: string;
  tamilStatement: string;
  founderName: string;
  leadArtist: string;
  artistTagline: string;
  positioning: string;
  brandBio: string;
  founderStory: string;
  photographyPhilosophy: string;
  technicalPhilosophy: string;
  clientReactionQuote: string;
  foundedYear: number;
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    website: string;
    address: string;
    city: string;
    state: string;
    country: string;
    regionsServed: string;
  };
  social: {
    instagram: string;
    instagramHandle: string;
    facebook: string;
    youtube: string;
  };
  credibility: {
    yearsExperience: string;
    eventsCovered: string;
    photosCaptured: string;
  };
  specialties: string[];
}

export const STUDIO_PROFILE: StudioProfile = {
  name: 'PhotoMagic Studios by RK',
  brandName: 'PhotoMagic Studios by RK',
  brandLine: 'Moments Through Our Eyes',
  tamilStatement: 'இல்லத்தின் இன்ப நிகழ்வுகள், விழிகளின் வழியே',
  founderName: 'Rozar Khan',
  leadArtist: 'Rozar Khan (RK)',
  artistTagline: 'Moments Through Our Eyes • Fine Art Photography & Cinema',
  positioning:
    'Photography for Indian celebrations, families, people, fashion and stories. Based in South India. Available across India.',
  brandBio:
    'PhotoMagic Studios by RK is a contemporary creative photography atelier crafting emotive visual art for Indian celebrations, families, people, fashion and stories across South India and beyond.',
  founderStory:
    'The founder’s journey began with a natural obsession to capture life—first exploring wildlife, still life, and architectural geometry. Soon, the vivid richness of Indian festivals and cultural celebrations revealed photography’s true power. That evolution led naturally into weddings, fashion editorials, and the innocent grace of Indian babies—uniting into an unmistakable artistic vision of beauty.',
  photographyPhilosophy:
    'Photography is an art form where the photographer sees the world from a distinct perspective—helping people embody the best version of themselves while preserving their moments as historical generational treasures.',
  technicalPhilosophy:
    'Perfect photography is not merely about adding elements. It is about knowing what to include, what to remove, what to intentionally skip, and how the artist behind the lens stays effortlessly natural so the subjects in front feel radiant, confident, and free.',
  clientReactionQuote:
    'All our tension, pressure, struggle and the wait — worth it. We received more than we expected.',
  foundedYear: 2021,
  contact: {
    phone: '7904943234',
    whatsapp: '7904943234',
    email: 'hello@batpaiyancatponnu.online',
    website: 'https://batpaiyancatponnu.online/photomagic',
    address: 'PhotoMagic Creative Studio',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    regionsServed: 'Tamil Nadu · Pondicherry · Kerala · Across India',
  },
  social: {
    instagram: 'https://instagram.com/rkae_photgraphs',
    instagramHandle: 'rkae_photgraphs',
    facebook: 'https://facebook.com/rozarkhan',
    youtube: 'https://youtube.com/@rozarkhan',
  },
  credibility: {
    yearsExperience: '3+ Years',
    eventsCovered: '50+ Events',
    photosCaptured: '1,000,000+ Photographs Captured',
  },
  specialties: [
    'Indian Celebrations & Weddings',
    'Pre-Wedding & Couple Portraits',
    'Haute Couture & Fashion Stories',
    'Baby, Kids & Milestone Innocence',
    'Maternity & Family Heritage',
    'Bespoke Handcrafted Archival Albums',
  ],
};

// =============================================================================
// 10 OFFICIAL PHOTOGRAPHY CATEGORIES (CREATIVE + ACTUAL DUAL NAMES)
// =============================================================================

export const OFFICIAL_CATEGORIES: PhotographyCategory[] = [
  {
    id: 'cat-weddings',
    creativeName: 'Sacred Vows & Heritage Allure',
    actualName: 'Weddings',
    slug: 'weddings',
    order: 1,
    heroMedia: '/images/hindu_wedding_ceremony.png',
    description:
      'Opulent South Indian Muhurthams, royal mandap rituals, cathedral walks, and joyful Nikkah ceremonies captured with cinema precision.',
    portfolioCount: 420,
    featuredStorySlug: 'chettinad-heritage-vows',
    sampleImages: [
      '/images/hindu_wedding_ceremony.png',
      '/images/christian_church_wedding.png',
      '/images/nikkah_ceremony.png',
    ],
  },
  {
    id: 'cat-engagements',
    creativeName: 'The Prelude Promise',
    actualName: 'Engagements',
    slug: 'engagements',
    order: 2,
    heroMedia: '/images/engagement_ceremony.png',
    description:
      'The vibrant ring exchanges, auspicious blessings, and intimate familial excitement leading up to the grand celebration.',
    portfolioCount: 210,
    sampleImages: ['/images/engagement_ceremony.png', '/images/hindu_wedding_ceremony.png'],
  },
  {
    id: 'cat-preweddings',
    creativeName: 'Cinematic Escapes',
    actualName: 'Pre-Weddings',
    slug: 'pre-weddings',
    order: 3,
    heroMedia: '/images/prewedding_backwaters.png',
    description:
      'Scenic destination portraits from Alleppey misty backwaters and Munnar hills to coastal Kovalam sunsets.',
    portfolioCount: 185,
    sampleImages: ['/images/prewedding_backwaters.png', '/images/drone_aerial_wedding.png'],
  },
  {
    id: 'cat-portraits',
    creativeName: 'Intimate Silhouettes',
    actualName: 'Couple Portraits',
    slug: 'couple-portraits',
    order: 4,
    heroMedia: '/images/hero_wedding_couple.png',
    description:
      'Editorial, fashion-forward portraits celebrating authentic chemistry, natural light, and quiet romantic elegance.',
    portfolioCount: 160,
    sampleImages: ['/images/hero_wedding_couple.png', '/images/prewedding_backwaters.png'],
  },
  {
    id: 'cat-fashion',
    creativeName: 'Haute Couture & Form',
    actualName: 'Fashion',
    slug: 'fashion',
    order: 5,
    heroMedia: '/images/fashion_editorial.png',
    description:
      'Editorial runway aesthetics, ethnic couture showcases, silk textile narratives, and high-contrast studio portraiture.',
    portfolioCount: 140,
    sampleImages: ['/images/fashion_editorial.png', '/images/hero_wedding_couple.png'],
  },
  {
    id: 'cat-baby',
    creativeName: 'Innocence in Bloom',
    actualName: 'Baby / Kids',
    slug: 'baby-kids',
    order: 6,
    heroMedia: '/images/babybliss_portrait.jpg',
    description:
      'Pure warmth and playful innocence—newborn heirloom portraits, 1st birthday milestones, and toddler laughter.',
    portfolioCount: 195,
    sampleImages: ['/images/babybliss_portrait.jpg', '/images/baby_milestone.png'],
  },
  {
    id: 'cat-maternity',
    creativeName: 'The Motherhood Aura',
    actualName: 'Maternity',
    slug: 'maternity',
    order: 7,
    heroMedia: '/images/maternity_portrait.png',
    description:
      'Graceful, empowering maternity sessions celebrating the divine beginning of new life with soft atmospheric lighting.',
    portfolioCount: 110,
    sampleImages: ['/images/maternity_portrait.png', '/images/babybliss_portrait.jpg'],
  },
  {
    id: 'cat-events',
    creativeName: 'Grand Celebrations & Milestones',
    actualName: 'Events',
    slug: 'events',
    order: 8,
    heroMedia: '/images/grand_event_celebration.png',
    description:
      'Sangeet galas, milestone birthdays, housewarming rituals, and cultural celebrations rich with motion and life.',
    portfolioCount: 230,
    sampleImages: [
      '/images/grand_event_celebration.png',
      '/images/corporate_conference_summit.png',
    ],
  },
  {
    id: 'cat-commercial',
    creativeName: 'Architectural & Brand Visions',
    actualName: 'Commercial',
    slug: 'commercial',
    order: 9,
    heroMedia: '/images/corporate_conference_summit.png',
    description:
      'Precision architectural spaces, luxury hospitality retreats, and brand storytelling with crisp visual hierarchy.',
    portfolioCount: 95,
    sampleImages: ['/images/corporate_conference_summit.png', '/images/drone_aerial_wedding.png'],
  },
  {
    id: 'cat-product',
    creativeName: 'Curated Objects & Details',
    actualName: 'Product',
    slug: 'product',
    order: 10,
    heroMedia: '/images/product_minimal.png',
    description:
      'Jewelry macros, luxury timepieces, artisanal crafts, and heirloom objects documented with tactile precision.',
    portfolioCount: 80,
    sampleImages: ['/images/product_minimal.png', '/images/fashion_editorial.png'],
  },
];

// =============================================================================
// 5 LUXURY STONE / METAL / CRAFTSMANSHIP PACKAGES
// =============================================================================

export const DEFAULT_PACKAGES: CmsPackage[] = [
  {
    id: 'pkg-moonstone',
    name: 'The Moonstone Anthology',
    creativeTier: 'Tier 1 • Essentials Collection',
    description:
      'Curated essential coverage for intimate single-session ceremonies and milestone rituals.',
    price: 42000,
    currency: 'INR',
    formattedPrice: '₹42,000',
    coverageDays: 1,
    components: [
      '1 Lead Candid Photographer',
      '1 Traditional Master Photographer',
      'Full Day Coverage (Up to 8 Hours)',
      'Digital Private Proofing Vault (300+ Color Graded Photos)',
      'High-Speed Online Download Access',
    ],
    deliverables: [
      '300+ Master Color-Graded Digital Images',
      'Private Web Proofing Gallery',
      'Delivery within 14 Business Days',
    ],
    complimentaryItems: ['Social Media Highlight Reel (30 sec)'],
    media: '/images/hindu_wedding_ceremony.png',
    featured: false,
    status: 'published',
  },
  {
    id: 'pkg-jade',
    name: 'The Jade Heirloom',
    creativeTier: 'Tier 2 • Signature Collection',
    description:
      'Comprehensive two-event coverage including wedding ceremony, reception, and custom archival book.',
    price: 71500,
    currency: 'INR',
    formattedPrice: '₹71,500',
    coverageDays: 1,
    components: [
      '2 Candid Photographers + 1 Traditional Photographer',
      '1 Traditional Cinematographer',
      '10x14 Handcrafted Silk Layflat Album (30 Pages)',
      'Full Day Coverage (Muhurtham + Reception)',
      'Private Cloud Proofing Gallery with Selection Lock',
    ],
    deliverables: [
      '600+ Master Color-Graded Photos',
      '10x14 Archival Silk Layflat Album (30 Pages / 120 Selected Photos)',
      'Full Length Traditional Video Cut (60 Mins)',
      'Delivery within 21 Business Days',
    ],
    complimentaryItems: ['Pre-wedding Couple Portrait Consultation', '1 Mini Keepsake Frame'],
    media: '/images/prewedding_backwaters.png',
    featured: false,
    status: 'published',
    badge: 'Popular Choice',
  },
  {
    id: 'pkg-obsidian',
    name: 'The Obsidian Grandeur',
    creativeTier: 'Tier 3 • Premium Cinema Collection',
    description:
      'Multi-team cinematic photo and 4K film experience for multi-day grand wedding celebrations.',
    price: 95000,
    currency: 'INR',
    formattedPrice: '₹95,000',
    coverageDays: 2,
    components: [
      '2 Lead Candid Photographers + 2 Traditional Photographers',
      '2 Senior 4K Cinematographers',
      '12x15 Inch Velvet Hardcover Archival Album (40 Pages)',
      '4K Cinematic Highlight Film (10–12 Mins)',
      'Drone Aerial Cinema Coverage',
      'Private 8K Cloud Vault Access',
    ],
    deliverables: [
      '1,000+ Master High-Res Photos',
      '12x15 Velvet Flush-Mount Archival Album (40 Pages)',
      '4K Cinematic Wedding Film + 60-Sec Instagram Teaser',
      'Full HD Traditional Video Documentary (90 Mins)',
      'Delivery within 25 Business Days',
    ],
    complimentaryItems: ['Aerial Drone Cinema Included', 'One 8x10 Inch Parent Keepsake Book'],
    media: '/images/christian_church_wedding.png',
    featured: true,
    status: 'published',
    badge: 'Most Recommended',
  },
  {
    id: 'pkg-florentine',
    name: 'The Florentine Royal',
    creativeTier: 'Tier 4 • Luxury Heritage Collection',
    description:
      'Expansive 3-day royal coverage with full cinema crew, Italian leather album, and parent albums.',
    price: 125000,
    currency: 'INR',
    formattedPrice: '₹1,25,000',
    coverageDays: 3,
    components: [
      '3 Senior Candid Photographers + 2 Traditional Masters',
      '3 4K Cinematographers + Aerial Drone Specialist',
      '12x18 Handcrafted Italian Leather Album with 24K Gold Stamping (50 Pages)',
      'Two 8x12 Inch Parent Keepsake Albums',
      '4K Cinematic Film (20 Mins) + 2 Teasers',
      'Same-Day AI Photo Culling Preview',
    ],
    deliverables: [
      '1,500+ High-Resolution Master Edited Photos',
      '12x18 Handcrafted Italian Leather Album (50 Pages / 200 Photos)',
      'Two 8x12 Inch Parent Keepsake Velvet Books',
      '4K Cinematic Film + Raw Footage Archive',
      'Permanent Lifetime Cloud Vault',
    ],
    complimentaryItems: [
      'Complimentary Pre-Wedding Shoot Session',
      'Same-Day AI Photo Preview Reel',
    ],
    media: '/images/nikkah_ceremony.png',
    featured: false,
    status: 'published',
  },
  {
    id: 'pkg-solitaire',
    name: 'The Solitaire Imperial',
    creativeTier: 'Tier 5 • Bespoke Masterpiece Collection',
    description:
      'The pinnacle luxury experience directed personally by Rozar Khan for landmark celebrations across India.',
    price: 149000,
    currency: 'INR',
    formattedPrice: '₹1,49,000+',
    coverageDays: 3,
    components: [
      'Directed Personally by Rozar Khan (RK)',
      'Full Multi-Day Cinema Team (4 Photographers + 3 Cinematographers + Dual Drone)',
      '12x18 Bespoke Italian Leather Album in Handcrafted Velvet Box (60 Pages)',
      'Three Parent & Keepsake Archival Albums',
      'Master 8K Deliverables & Complete Raw Vault',
      'Next-Day AI Culling & Highlight Teaser',
    ],
    deliverables: [
      'Unlimited Master Retouched High-Res Photos',
      '12x18 Master Leather Album + 3 Keepsake Parent Albums',
      '8K/4K Master Cinema Film (30 Mins) + 3 Instagram Teasers',
      'Complete Raw Footages on High-Speed Encrypted SSD',
      'VIP Atelier Priority Support',
    ],
    complimentaryItems: [
      'Full Destination Pre-Wedding Shoot with 4K Video',
      'Custom 24x36 Canvas Wall Art Gallery Print',
      'Personalized USB Wooden Keepsake Box',
    ],
    media: '/images/drone_aerial_wedding.png',
    featured: false,
    status: 'published',
    badge: 'Flagship Atelier',
  },
];

// =============================================================================
// CUSTOM PACKAGE COMPONENT PRICING & RULES
// =============================================================================

export const CUSTOM_PACKAGE_RATES = {
  traditionalPhotographyPerDay: 11999,
  traditionalVideoPerDay: 14950,
  candidPhotographyPerDay: 18000,
  candidVideoPerDay: 18900,
  dronePerDay: 13990,
  albumStandard: 8999,
  albumLuxuryLeather: 10999,
  albumHeirloomGold: 12999,
  additionalAlbum: 6500,
  preWeddingSession: 22000,
  postWeddingSession: 20000,
  familyMilestoneAddon: 15000,
};

/**
 * Progressive Combination Discount Matrix (5% to 20%)
 */
export function calculateCustomPackageDiscount(
  rawTotal: number,
  componentCount: number,
): {
  percentage: number;
  discountAmount: number;
  finalTotal: number;
} {
  let percentage = 0;
  if (rawTotal >= 140000 || componentCount >= 8) {
    percentage = 20;
  } else if (rawTotal >= 110000 || componentCount >= 6) {
    percentage = 15;
  } else if (rawTotal >= 80000 || componentCount >= 4) {
    percentage = 10;
  } else if (rawTotal >= 50000 || componentCount >= 3) {
    percentage = 5;
  }

  const discountAmount = Math.round((rawTotal * percentage) / 100);
  const finalTotal = rawTotal - discountAmount;

  return {
    percentage,
    discountAmount,
    finalTotal,
  };
}

// =============================================================================
// CMS DYNAMIC SERVICES
// =============================================================================

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

export const CMS_STORIES: CmsStory[] = [
  {
    id: 'story-madurai-heritage',
    title: 'A Dawn of Sacred Gold in Madurai',
    slug: 'dawn-of-sacred-gold-madurai',
    category: 'Weddings',
    location: 'Madurai Palace, Tamil Nadu',
    year: '2026',
    coverMedia: '/images/hindu_wedding_ceremony.png',
    minimalContext:
      'Between the resonant beats of the Nadaswaram and cascading marigold petals, Karthik and Deepa celebrated their ancestral Muhurtham beneath 300-year-old carved teak pillars.',
    mediaItems: [
      {
        url: '/images/hindu_wedding_ceremony.png',
        caption: 'The sacred Thali moment surrounded by three generations of family.',
        type: 'image',
        aspect: 'cinematic',
      },
      {
        url: '/images/hero_wedding_couple.png',
        caption: 'Quiet royal portraits in the palace corridor before the evening reception.',
        type: 'image',
        aspect: 'portrait',
      },
    ],
    featured: true,
    published: true,
    seoTitle: 'Madurai Sacred Gold Wedding Story | PhotoMagic Studios by RK',
    seoDescription:
      'Visual story of a traditional heritage wedding in Madurai by PhotoMagic Studios by RK.',
  },
  {
    id: 'story-alleppey-mist',
    title: 'Drifting Through the Alleppey Waters',
    slug: 'drifting-through-alleppey-waters',
    category: 'Weddings',
    location: 'Alleppey Backwaters, Kerala',
    year: '2026',
    coverMedia: '/images/prewedding_backwaters.png',
    minimalContext:
      'Gliding through coconut groves in wooden canoes at dawn, capturing honest laughter and quiet anticipation before the wedding week began.',
    mediaItems: [
      {
        url: '/images/prewedding_backwaters.png',
        caption: 'Morning mist over the palm-fringed lagoons.',
        type: 'image',
        aspect: 'cinematic',
      },
      {
        url: '/images/drone_aerial_wedding.png',
        caption: 'Aerial panorama of the secluded backwater heritage resort.',
        type: 'image',
        aspect: 'landscape',
      },
    ],
    featured: true,
    published: true,
    seoTitle: 'Alleppey Backwaters Couple Story | PhotoMagic Studios by RK',
    seoDescription:
      'Romantic pre-wedding photography story in Alleppey, Kerala by PhotoMagic Studios by RK.',
  },
  {
    id: 'story-babybliss-chennai',
    title: 'Innocence in Sunlight: Maya’s First Steps',
    slug: 'innocence-in-sunlight-mayas-first-steps',
    category: 'Family',
    location: 'Chennai Atelier, Tamil Nadu',
    year: '2026',
    coverMedia: '/images/babybliss_portrait.jpg',
    minimalContext:
      'Warm natural window light, heirloom cotton swaddles, and the pure curiosity of little Maya turning one year old.',
    mediaItems: [
      {
        url: '/images/babybliss_portrait.jpg',
        caption: 'A gentle smile capturing childhood innocence.',
        type: 'image',
        aspect: 'square',
      },
      {
        url: '/images/baby_milestone.png',
        caption: 'Tender family heirloom moments.',
        type: 'image',
        aspect: 'portrait',
      },
    ],
    featured: false,
    published: true,
    seoTitle: 'Maya BabyBliss Milestone Story | PhotoMagic Studios by RK',
    seoDescription: 'Baby portraiture story from PhotoMagic Studios by RK Project BabyBliss.',
  },
  {
    id: 'story-haute-couture',
    title: 'The Modern Silk Silhouette',
    slug: 'modern-silk-silhouette',
    category: 'Fashion',
    location: 'Kovalam Studio, Tamil Nadu',
    year: '2026',
    coverMedia: '/images/fashion_editorial.png',
    minimalContext:
      'An experimental study of sculptural gold borders, structured silk drapes, and high-fashion geometric shadow play.',
    mediaItems: [
      {
        url: '/images/fashion_editorial.png',
        caption: 'Contrast and texture in contemporary Indian ethnic fashion.',
        type: 'image',
        aspect: 'portrait',
      },
    ],
    featured: true,
    published: true,
    seoTitle: 'Modern Silk Silhouette Fashion Story | PhotoMagic Studios by RK',
    seoDescription: 'Editorial fashion shoot by PhotoMagic Studios by RK.',
  },
];

// =============================================================================
// CMS MULTILINGUAL TESTIMONIALS (ENGLISH, TAMIL & TANGLISH)
// =============================================================================

export const CMS_TESTIMONIALS: CmsTestimonial[] = [
  {
    id: 't1',
    clientName: 'Siddharth & Ananya',
    event: 'Grand Muhurtham & Reception',
    date: 'February 2026',
    location: 'Chennai, Tamil Nadu',
    quote:
      'All our tension, pressure, struggle and the wait — worth it. We received more than we expected. RK and his team were so calm, respectful, and invisible during the rituals. The album quality is breathtaking.',
    tamilQuote:
      'எங்கள் எல்லா டென்ஷன், கவலை மற்றும் காத்திருப்புக்கும் முழுமையான பலன் கிடைத்தது. நாங்கள் எதிர்பார்த்ததை விட மிகச் சிறப்பான நினைவுகள் கிடைத்தன.',
    language: 'mixed',
    mediaUrl: '/images/hindu_wedding_ceremony.png',
    rating: 5,
  },
  {
    id: 't2',
    clientName: 'Mathew & Sherin',
    event: 'Cathedral Wedding & Alleppey Pre-Wedding',
    date: 'January 2026',
    location: 'Kochi, Kerala',
    quote:
      'The 4K cinematic film made our entire family cry happy tears. Their direction was completely natural—no awkward posing. PhotoMagic captured the soul of our wedding.',
    tamilQuote: 'ரொம்ப நேச்சுரலா, சினிமா மாதிரி அழகான ஃப்ரேம்கள். Best photography team!',
    language: 'tanglish',
    mediaUrl: '/images/christian_church_wedding.png',
    rating: 5,
  },
  {
    id: 't3',
    clientName: 'Dr. Vignesh & Priyadharshini',
    event: 'Project BabyBliss & 1st Birthday',
    date: 'March 2026',
    location: 'Madurai, Tamil Nadu',
    quote:
      'Babies are so unpredictable, but the patience RK showed was incredible. The handcrafted leather book is now our family heirloom that we will cherish forever.',
    tamilQuote: 'குழந்தைகளின் அழகான தருணங்களை இவ்வளவு மென்மையாக பதிவு செய்ததற்கு மிக்க நன்றி.',
    language: 'mixed',
    mediaUrl: '/images/babybliss_portrait.jpg',
    rating: 5,
  },
  {
    id: 't4',
    clientName: 'Faizal & Yasmin',
    event: 'Nikkah & Reception Gala',
    date: 'December 2025',
    location: 'Trivandrum, Kerala',
    quote:
      'The colors, lighting, and drone shots of the venue were unmatched. Truly luxury photography with genuine South Indian warmth.',
    language: 'en',
    mediaUrl: '/images/nikkah_ceremony.png',
    rating: 5,
  },
];
