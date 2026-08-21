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
    instagramHandle: 'rkae_photographs',
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

// =============================================================================
// COMPREHENSIVE CMS PORTFOLIO GALLERY (65+ SOUTH INDIAN FINE ART ITEMS)
// =============================================================================

export interface PortfolioGalleryItem {
  id: string;
  title: string;
  category: string;
  categoryName: string;
  location: string;
  year: string;
  src: string;
  aspect: 'portrait' | 'landscape' | 'tall' | 'wide' | 'square';
  caption: string;
}

export const CMS_PORTFOLIO_ITEMS: PortfolioGalleryItem[] = [
  // --- WEDDINGS (18 ITEMS) ---
  {
    id: 'w-1',
    title: 'A Dawn of Sacred Gold in Madurai',
    category: 'weddings',
    categoryName: 'Weddings',
    location: 'Madurai Heritage Mandapam • Tamil Nadu',
    year: '2026',
    src: '/images/hindu_wedding_ceremony.png',
    aspect: 'tall',
    caption: 'Kanjeevaram silk drapes and royal mandap rituals beneath ancient carved pillars.',
  },
  {
    id: 'w-2',
    title: 'The Sacred Knot • Mangalsutra Tying & Akshadhai Shower',
    category: 'weddings',
    categoryName: 'Weddings',
    location: 'Kapaleeshwarar Temple Hall • Chennai',
    year: '2026',
    src: '/images/temple_muhurtham_wedding.png',
    aspect: 'wide',
    caption:
      'Emotional moment of the three sacred knots tied amidst a shower of yellow akshadhai rice.',
  },
  {
    id: 'w-3',
    title: 'The Royal Oonjal Swing of Madurai',
    category: 'weddings',
    categoryName: 'Weddings',
    location: 'Heritage Courtyard • Madurai',
    year: '2026',
    src: '/images/oonjal_swing_ceremony.png',
    aspect: 'wide',
    caption: 'Joyful laughter on the flower-draped teakwood swing with traditional Oonjal songs.',
  },
  {
    id: 'w-4',
    title: 'Cathedral Vows & St. Thomas Altar Blessing',
    category: 'weddings',
    categoryName: 'Weddings',
    location: 'St. Thomas Basilica • Chennai',
    year: '2026',
    src: '/images/christian_church_wedding.png',
    aspect: 'portrait',
    caption: 'Stained glass sunlight cascading over ivory Kasavu silk and delicate lace veil.',
  },
  {
    id: 'w-5',
    title: 'Regal Emerald Nikahnama Covenant',
    category: 'weddings',
    categoryName: 'Weddings',
    location: 'Grand Ballroom • Kochi',
    year: '2026',
    src: '/images/nikkah_ceremony.png',
    aspect: 'wide',
    caption:
      'Intimate signature of the marriage contract in royal emerald green silks and gold embroidery.',
  },
  {
    id: 'w-6',
    title: 'Twilight Floral Mandala Mandap from Above',
    category: 'weddings',
    categoryName: 'Weddings',
    location: 'Kumarakom Lake Resort • Kerala',
    year: '2026',
    src: '/images/drone_aerial_wedding.png',
    aspect: 'wide',
    caption:
      'Bird’s-eye perspective of the illuminated waterfront mandap encircled by floating candles.',
  },
  {
    id: 'w-7',
    title: 'Chettinad Courtyard Royal Muhurtham',
    category: 'weddings',
    categoryName: 'Weddings',
    location: 'Chidambara Vilas • Chettinad',
    year: '2026',
    src: '/images/hero_wedding_couple.png',
    aspect: 'tall',
    caption:
      'Burma teak pillars and Athangudi tiles framing timeless South Indian bridal grandeur.',
  },
  {
    id: 'w-8',
    title: 'Laughter at the Nalangu Manjal Ritual',
    category: 'weddings',
    categoryName: 'Weddings',
    location: 'Heritage Villa • Thanjavur',
    year: '2026',
    src: '/images/haldi_mehendi_celebration.png',
    aspect: 'wide',
    caption: 'Playful turmeric paste blessing and marigold shower with cousins and sisters.',
  },
  {
    id: 'w-9',
    title: 'Auspicious Sacred Agni Homam',
    category: 'weddings',
    categoryName: 'Weddings',
    location: 'Mylapore • Chennai',
    year: '2026',
    src: '/images/temple_muhurtham_wedding.png',
    aspect: 'square',
    caption: 'Holy fire chants and offerings for generational prosperity.',
  },
  {
    id: 'w-10',
    title: 'Varmala Floral Garland Exchange',
    category: 'weddings',
    categoryName: 'Weddings',
    location: 'Heritage Palace • Pondicherry',
    year: '2026',
    src: '/images/hindu_wedding_ceremony.png',
    aspect: 'portrait',
    caption: 'Fragrant tuberose and lotus garlands exchanged during the auspicious muhurtham hour.',
  },
  {
    id: 'w-11',
    title: 'The Royal Tanjore Reception Gala',
    category: 'weddings',
    categoryName: 'Weddings',
    location: 'Grand Chola Ballroom • Chennai',
    year: '2026',
    src: '/images/grand_event_celebration.png',
    aspect: 'wide',
    caption: 'Golden chandeliers and couture evening silhouettes.',
  },
  {
    id: 'w-12',
    title: 'Temple Bell Reverberations & Pattu Silks',
    category: 'weddings',
    categoryName: 'Weddings',
    location: 'Brihadeeswara Temple Precincts • Thanjavur',
    year: '2026',
    src: '/images/hero_wedding_couple.png',
    aspect: 'tall',
    caption: 'Ancient stone sanctum backdrop framing bridal devotion and heritage silks.',
  },
  {
    id: 'w-13',
    title: 'The Talambralu Pearl & Turmeric Cascade',
    category: 'weddings',
    categoryName: 'Weddings',
    location: 'Convention Center • Coimbatore',
    year: '2026',
    src: '/images/temple_muhurtham_wedding.png',
    aspect: 'portrait',
    caption: 'Joyful showers of yellow turmeric pearls poured in playful celebration.',
  },
  {
    id: 'w-14',
    title: 'Kovalam Coastal Sunset Vows',
    category: 'weddings',
    categoryName: 'Weddings',
    location: 'Kovalam Beach Mandapam • Kerala',
    year: '2026',
    src: '/images/drone_aerial_wedding.png',
    aspect: 'wide',
    caption: 'Ocean breeze and crashing Arabian Sea waves blessing the sacred vows.',
  },
  {
    id: 'w-15',
    title: 'The Quiet Heritage Bridal Glow',
    category: 'weddings',
    categoryName: 'Weddings',
    location: 'Heritage Atelier • Chennai',
    year: '2026',
    src: '/images/hindu_wedding_ceremony.png',
    aspect: 'portrait',
    caption: 'Intricate temple gold jhumkas, nethi chutti, and serene bridal emotion.',
  },
  {
    id: 'w-16',
    title: 'The Saptapadi Seven Sacred Steps',
    category: 'weddings',
    categoryName: 'Weddings',
    location: 'Padmanabhaswamy Temple Hall • Trivandrum',
    year: '2026',
    src: '/images/temple_muhurtham_wedding.png',
    aspect: 'tall',
    caption: 'Seven sacred steps taken together around the agni for lifelong companionship.',
  },
  {
    id: 'w-17',
    title: 'The Sacred Kasi Yatra Blessing',
    category: 'weddings',
    categoryName: 'Weddings',
    location: 'Brahmin Sabha • Trichy',
    year: '2026',
    src: '/images/oonjal_swing_ceremony.png',
    aspect: 'wide',
    caption: 'Traditional palm leaf umbrella and walking stick ritual welcome.',
  },
  {
    id: 'w-18',
    title: 'Candlelit Chettinad Sangeet Nights',
    category: 'weddings',
    categoryName: 'Weddings',
    location: 'Chettinad Mansion • Karaikudi',
    year: '2026',
    src: '/images/grand_event_celebration.png',
    aspect: 'wide',
    caption: 'Hundreds of brass diyas lighting up a joyful evening of traditional dance and music.',
  },

  // --- ENGAGEMENTS (22 ITEMS) ---
  {
    id: 'e-1',
    title: 'The Golden Nichayathartham Covenant',
    category: 'engagements',
    categoryName: 'Engagements',
    location: 'Chennai Heritage Villa • Tamil Nadu',
    year: '2026',
    src: '/images/engagement_ceremony.png',
    aspect: 'wide',
    caption:
      'Auspicious ring exchange and thali blessing amidst jasmine garlands and elders’ smiles.',
  },
  {
    id: 'e-2',
    title: 'Mustard Silk & Emerald Temple Jewels Prelude',
    category: 'engagements',
    categoryName: 'Engagements',
    location: 'Madurai Heritage Hall • Tamil Nadu',
    year: '2026',
    src: '/images/engagement_ceremony.png',
    aspect: 'tall',
    caption: 'A radiant bride adorned in mustard Kanjeevaram silk and antique gold temple jewelry.',
  },
  {
    id: 'e-3',
    title: 'Laughing Haldi & Manjal Nalangu Courtyard Shower',
    category: 'engagements',
    categoryName: 'Engagements',
    location: 'Heritage Courtyard • Madurai',
    year: '2026',
    src: '/images/haldi_mehendi_celebration.png',
    aspect: 'wide',
    caption: 'Joyous turmeric application and marigold petal showers with family and cousins.',
  },
  {
    id: 'e-4',
    title: 'The Sacred Coconut & Betel Leaf Presentation',
    category: 'engagements',
    categoryName: 'Engagements',
    location: 'Coimbatore Heritage Sabha • Tamil Nadu',
    year: '2026',
    src: '/images/engagement_ceremony.png',
    aspect: 'square',
    caption: 'Traditional silver thali with sacred fruits, betel leaves, and gold blessings.',
  },
  {
    id: 'e-5',
    title: 'The Intimate Ring Exchange in French Pondicherry',
    category: 'engagements',
    categoryName: 'Engagements',
    location: 'French Quarter Villa • Pondicherry',
    year: '2026',
    src: '/images/hero_wedding_couple.png',
    aspect: 'portrait',
    caption: 'Cobblestone colonial corridors and quiet promise under bougainvillea.',
  },
  {
    id: 'e-6',
    title: 'Chettinad Athangudi Tile Nichayathartham',
    category: 'engagements',
    categoryName: 'Engagements',
    location: 'Kanadukathan Palace • Chettinad',
    year: '2026',
    src: '/images/engagement_ceremony.png',
    aspect: 'wide',
    caption: 'Handmade geometric tile patterns framing the formal engagement covenant.',
  },
  {
    id: 'e-7',
    title: 'The Oonjal Engagement Prelude',
    category: 'engagements',
    categoryName: 'Engagements',
    location: 'Chennai Seaside Lawn • Tamil Nadu',
    year: '2026',
    src: '/images/oonjal_swing_ceremony.png',
    aspect: 'wide',
    caption: 'Prelude swing rituals with family singing auspicious Carnatic verses.',
  },
  {
    id: 'e-8',
    title: 'Golden Hour Engagement Portraits in Mahabalipuram',
    category: 'engagements',
    categoryName: 'Engagements',
    location: 'Shore Temple Beach • Mahabalipuram',
    year: '2026',
    src: '/images/prewedding_backwaters.png',
    aspect: 'tall',
    caption: 'Dramatic coastal sunset light framing the newly engaged couple.',
  },
  {
    id: 'e-9',
    title: 'The Saree Gifting & Akshadhai Blessing',
    category: 'engagements',
    categoryName: 'Engagements',
    location: 'Trichy Heritage Hall • Tamil Nadu',
    year: '2026',
    src: '/images/engagement_ceremony.png',
    aspect: 'portrait',
    caption: 'Presentation of the bridal engagement silk saree with elders’ sacred rice blessings.',
  },
  {
    id: 'e-10',
    title: 'The Bride’s Joyful Nalangu Turmeric Glow',
    category: 'engagements',
    categoryName: 'Engagements',
    location: 'Tanjore Courtyard • Tamil Nadu',
    year: '2026',
    src: '/images/haldi_mehendi_celebration.png',
    aspect: 'square',
    caption: 'Unfiltered laughter and candid joy during the pre-wedding turmeric ceremony.',
  },
  {
    id: 'e-11',
    title: 'The Emerald & Gold Ring Macro',
    category: 'engagements',
    categoryName: 'Engagements',
    location: 'Atelier Studio • Chennai',
    year: '2026',
    src: '/images/product_minimal.png',
    aspect: 'wide',
    caption: 'Macro focus on handcrafted uncut emerald engagement ring on raw silk.',
  },
  {
    id: 'e-12',
    title: 'Reading of the Sacred Lagna Patrika',
    category: 'engagements',
    categoryName: 'Engagements',
    location: 'Mylapore Sabha • Chennai',
    year: '2026',
    src: '/images/engagement_ceremony.png',
    aspect: 'portrait',
    caption: 'Formal recitation of the wedding muhurtham date and family lineage.',
  },
  {
    id: 'e-13',
    title: 'The Floral Arch Ring Exchange',
    category: 'engagements',
    categoryName: 'Engagements',
    location: 'Kovalam Bay • Kerala',
    year: '2026',
    src: '/images/drone_aerial_wedding.png',
    aspect: 'wide',
    caption: 'Lush tropical floral arch against golden evening waters.',
  },
  {
    id: 'e-14',
    title: 'Couple’s First Laugh Beneath Jasmine Chandelier',
    category: 'engagements',
    categoryName: 'Engagements',
    location: 'Heritage Resort • Chennai',
    year: '2026',
    src: '/images/hero_wedding_couple.png',
    aspect: 'portrait',
    caption: 'Candid intimacy under cascading white Madurai malli blooms.',
  },
  {
    id: 'e-15',
    title: 'Family Sandalwood & Rosewater Welcome',
    category: 'engagements',
    categoryName: 'Engagements',
    location: 'Palani Heritage Hall • Tamil Nadu',
    year: '2026',
    src: '/images/engagement_ceremony.png',
    aspect: 'tall',
    caption: 'Traditional welcoming of groom’s family with silver rosewater sprinkler.',
  },
  {
    id: 'e-16',
    title: 'The Mehendi Pattern Intricacy',
    category: 'engagements',
    categoryName: 'Engagements',
    location: 'Chennai Studio • Tamil Nadu',
    year: '2026',
    src: '/images/nikkah_ceremony.png',
    aspect: 'square',
    caption: 'Fine bridal mehendi details with peacock and temple architecture motifs.',
  },
  {
    id: 'e-17',
    title: 'Golden Twilight Vows by the Backwaters',
    category: 'engagements',
    categoryName: 'Engagements',
    location: 'Alleppey Lagoon • Kerala',
    year: '2026',
    src: '/images/prewedding_backwaters.png',
    aspect: 'wide',
    caption: 'Peaceful lakeside engagement shoot in traditional silk attire.',
  },
  {
    id: 'e-18',
    title: 'The Sisters’ Marigold Shower Surprise',
    category: 'engagements',
    categoryName: 'Engagements',
    location: 'Madurai Mandapam • Tamil Nadu',
    year: '2026',
    src: '/images/haldi_mehendi_celebration.png',
    aspect: 'portrait',
    caption: 'Joyful burst of yellow and orange petals caught in mid-air.',
  },
  {
    id: 'e-19',
    title: 'The Royal Chettinad Verandah Portrait',
    category: 'engagements',
    categoryName: 'Engagements',
    location: 'Karaikudi Palace • Chettinad',
    year: '2026',
    src: '/images/hero_wedding_couple.png',
    aspect: 'tall',
    caption: 'Regal symmetry and quiet anticipation of the wedding journey.',
  },
  {
    id: 'e-20',
    title: 'The Auspicious Gold Thali Blessing Circle',
    category: 'engagements',
    categoryName: 'Engagements',
    location: 'Chennai Heritage Hall • Tamil Nadu',
    year: '2026',
    src: '/images/engagement_ceremony.png',
    aspect: 'wide',
    caption: 'Elders passing the sacred engagement tray with blessings for harmony.',
  },
  {
    id: 'e-21',
    title: 'Sunset Silk Reflection on the Verandah',
    category: 'engagements',
    categoryName: 'Engagements',
    location: 'Pondicherry Villa • Tamil Nadu',
    year: '2026',
    src: '/images/fashion_editorial.png',
    aspect: 'portrait',
    caption: 'Warm golden sunlight bouncing off the intricate zardozi embroidery.',
  },
  {
    id: 'e-22',
    title: 'The Sacred Exchange & Sealed Promise',
    category: 'engagements',
    categoryName: 'Engagements',
    location: 'Chennai Atelier • Tamil Nadu',
    year: '2026',
    src: '/images/engagement_ceremony.png',
    aspect: 'square',
    caption: 'Hands joined in unity with sacred temple rings.',
  },

  // --- BABY SHOWER / VALAIKAPPU / SEEMANTHAM (5 ITEMS) ---
  {
    id: 'bs-1',
    title: 'Valaikappu • The Green Silk & Glass Bangles Tradition',
    category: 'baby-shower',
    categoryName: 'Baby Shower',
    location: 'Heritage Home • Chennai, Tamil Nadu',
    year: '2026',
    src: '/images/valaikappu_baby_shower.png',
    aspect: 'wide',
    caption:
      'The expectant mother in rich green silk adorned with dozens of colorful glass bangles and jasmine.',
  },
  {
    id: 'bs-2',
    title: 'Elders’ Sacred Turmeric & Sandalwood Blessing',
    category: 'baby-shower',
    categoryName: 'Baby Shower',
    location: 'Madurai Ancestral Home • Tamil Nadu',
    year: '2026',
    src: '/images/valaikappu_baby_shower.png',
    aspect: 'tall',
    caption:
      'Emotional blessings from grandmothers offering silver thali prayers for mother and child.',
  },
  {
    id: 'bs-3',
    title: 'The Fragrant Jasmine Braid & Motherhood Glow',
    category: 'baby-shower',
    categoryName: 'Baby Shower',
    location: 'Atelier Studio • Chennai',
    year: '2026',
    src: '/images/maternity_portrait.png',
    aspect: 'portrait',
    caption: 'Cascading Madurai malli braided into hair, symbol of purity and maternal grace.',
  },
  {
    id: 'bs-4',
    title: 'Traditional Silver Pooja Thali & Auspicious Seemantham',
    category: 'baby-shower',
    categoryName: 'Baby Shower',
    location: 'Thanjavur Home • Tamil Nadu',
    year: '2026',
    src: '/images/valaikappu_baby_shower.png',
    aspect: 'square',
    caption: 'Diyas, betel leaves, turmeric cones, and fresh lotus petals for the Vedic ceremony.',
  },
  {
    id: 'bs-5',
    title: 'The Seven Rice Varieties & Family Feast',
    category: 'baby-shower',
    categoryName: 'Baby Shower',
    location: 'Chettinad Heritage Hall • Tamil Nadu',
    year: '2026',
    src: '/images/grand_event_celebration.png',
    aspect: 'wide',
    caption: 'Traditional South Indian Seemantham culinary spread honoring the expectant mother.',
  },

  // --- 1ST BIRTHDAY & BABY MILESTONES (6 ITEMS) ---
  {
    id: 'b-1',
    title: 'Aarav’s Grand 1st Birthday & Custom Cake Celebration',
    category: '1st-birthday',
    categoryName: '1st Birthday',
    location: 'Chennai Grand Banquet • Tamil Nadu',
    year: '2026',
    src: '/images/first_birthday_celebration.png',
    aspect: 'wide',
    caption:
      'Baby in royal blue silk dhoti clapping with laughing parents in front of floral cake arch.',
  },
  {
    id: 'b-2',
    title: 'Traditional Pattu Veshti & Gold Arana Kayiru 1st Year Milestone',
    category: '1st-birthday',
    categoryName: '1st Birthday',
    location: 'Chennai Atelier • Tamil Nadu',
    year: '2026',
    src: '/images/baby_milestone.png',
    aspect: 'wide',
    caption:
      'Traditional miniature silk veshti and gold waist chain seated amidst marigold and lotus petals.',
  },
  {
    id: 'b-3',
    title: 'Project BabyBliss • 6-Month Cradle with Jasmine Blossoms',
    category: 'baby-kids',
    categoryName: 'Baby / Kids',
    location: 'Chennai Atelier • Tamil Nadu',
    year: '2026',
    src: '/images/babybliss_portrait.jpg',
    aspect: 'square',
    caption:
      'Pure warmth, gentle curiosity, and sweet laughter swaddled in mustard-green silk in a teak cradle.',
  },
  {
    id: 'b-4',
    title: 'Annaprasana • Sacred First Rice Blessing',
    category: 'baby-kids',
    categoryName: 'Baby / Kids',
    location: 'Guruvayur Temple Hall • Kerala',
    year: '2026',
    src: '/images/baby_milestone.png',
    aspect: 'portrait',
    caption: 'First taste of sacred payasam on silver spoon amidst family prayers.',
  },
  {
    id: 'b-5',
    title: 'Thottil • Handcrafted Teak Cradle Naming Ceremony',
    category: 'baby-kids',
    categoryName: 'Baby / Kids',
    location: 'Madurai Heritage Home • Tamil Nadu',
    year: '2026',
    src: '/images/babybliss_portrait.jpg',
    aspect: 'tall',
    caption: 'Whispering the sacred name into baby’s ears in flower-draped cradle.',
  },
  {
    id: 'b-6',
    title: 'The Joyful Cake Smash in Silk Kurta',
    category: '1st-birthday',
    categoryName: '1st Birthday',
    location: 'Chennai Studio • Tamil Nadu',
    year: '2026',
    src: '/images/first_birthday_celebration.png',
    aspect: 'square',
    caption: 'Cute toddler messy cake exploration with gold-foil balloons.',
  },

  // --- PRE-WEDDINGS & COUPLE PORTRAITS (6 ITEMS) ---
  {
    id: 'pw-1',
    title: 'Misty Dawn Reflections • Alleppey Backwaters',
    category: 'pre-weddings',
    categoryName: 'Pre-Weddings',
    location: 'Alleppey Backwaters • Kerala',
    year: '2026',
    src: '/images/prewedding_backwaters.png',
    aspect: 'wide',
    caption: 'Early morning canoe reflections in coconut palm waterways.',
  },
  {
    id: 'pw-2',
    title: 'Intimate Palace Silhouettes • Chettinad Corridors',
    category: 'couple-portraits',
    categoryName: 'Couple Portraits',
    location: 'Chettinad Palace • Tamil Nadu',
    year: '2026',
    src: '/images/hero_wedding_couple.png',
    aspect: 'tall',
    caption: 'Quiet royal grandeur and effortless couple chemistry.',
  },
  {
    id: 'pw-3',
    title: 'Shore Temple Sunset Silhouettes',
    category: 'pre-weddings',
    categoryName: 'Pre-Weddings',
    location: 'Mahabalipuram Sea Shore • Tamil Nadu',
    year: '2026',
    src: '/images/drone_aerial_wedding.png',
    aspect: 'wide',
    caption: 'Ancient stone shore monolithic carvings against glowing sunset tides.',
  },
  {
    id: 'pw-4',
    title: 'Tea Garden Romance in Munnar Highlands',
    category: 'pre-weddings',
    categoryName: 'Pre-Weddings',
    location: 'Munnar Tea Estate • Kerala',
    year: '2026',
    src: '/images/prewedding_backwaters.png',
    aspect: 'portrait',
    caption: 'Misty emerald hills, warm woolens, and morning dew romance.',
  },
  {
    id: 'pw-5',
    title: 'Pastel French Quarter Whispers',
    category: 'couple-portraits',
    categoryName: 'Couple Portraits',
    location: 'White Town • Pondicherry',
    year: '2026',
    src: '/images/hero_wedding_couple.png',
    aspect: 'square',
    caption: 'Vibrant yellow arches and vintage colonial doorways.',
  },
  {
    id: 'pw-6',
    title: 'Twilight Canoe Voyage on Vembanad Lake',
    category: 'pre-weddings',
    categoryName: 'Pre-Weddings',
    location: 'Kumarakom • Kerala',
    year: '2026',
    src: '/images/prewedding_backwaters.png',
    aspect: 'wide',
    caption: 'Silhouetted couple drifting under warm purple evening skies.',
  },

  // --- MATERNITY (4 ITEMS) ---
  {
    id: 'm-1',
    title: 'The Motherhood Grace • Soft Ambient Light Portrait',
    category: 'maternity',
    categoryName: 'Maternity',
    location: 'Kovalam Coastal Studio • Tamil Nadu',
    year: '2026',
    src: '/images/maternity_portrait.png',
    aspect: 'portrait',
    caption: 'Empowering maternity portraits sculpted by soft ambient natural light.',
  },
  {
    id: 'm-2',
    title: 'Pastel Lilac & Rose Gold Silk Draped Motherhood',
    category: 'maternity',
    categoryName: 'Maternity',
    location: 'Chennai Atelier • Tamil Nadu',
    year: '2026',
    src: '/images/maternity_portrait.png',
    aspect: 'tall',
    caption: 'Serene expectant mother holding her baby bump in morning sunbeams.',
  },
  {
    id: 'm-3',
    title: 'Golden Hour Motherhood by the Bay',
    category: 'maternity',
    categoryName: 'Maternity',
    location: 'ECR Beach • Chennai',
    year: '2026',
    src: '/images/maternity_portrait.png',
    aspect: 'wide',
    caption: 'Gentle sea breezes and flowing silk drapery celebrating life.',
  },
  {
    id: 'm-4',
    title: 'The Sacred First Motherhood Embrace',
    category: 'maternity',
    categoryName: 'Maternity',
    location: 'Madurai Studio • Tamil Nadu',
    year: '2026',
    src: '/images/maternity_portrait.png',
    aspect: 'square',
    caption: 'Fine-art black-and-gold silhouette celebrating maternity.',
  },

  // --- FASHION & COUTURE (4 ITEMS) ---
  {
    id: 'f-1',
    title: 'Sculpted Silk & Gold Couture',
    category: 'fashion',
    categoryName: 'Fashion',
    location: 'Atelier Studio • Chennai',
    year: '2026',
    src: '/images/fashion_editorial.png',
    aspect: 'tall',
    caption:
      'High-contrast lighting highlighting intricate metallic textures in ruby-red Kanjeevaram gown.',
  },
  {
    id: 'f-2',
    title: 'Temple Gold & Modern Silhouettes',
    category: 'fashion',
    categoryName: 'Fashion',
    location: 'Atelier Studio • Chennai',
    year: '2026',
    src: '/images/fashion_editorial.png',
    aspect: 'portrait',
    caption: 'Fine antique gold jewelry paired with contemporary silk drapes.',
  },
  {
    id: 'f-3',
    title: 'Architectural Shadow & Silk Drape',
    category: 'fashion',
    categoryName: 'Fashion',
    location: 'Kovalam Studio • Tamil Nadu',
    year: '2026',
    src: '/images/fashion_editorial.png',
    aspect: 'wide',
    caption: 'Dramatic geometry and deep amber highlights in haute couture.',
  },
  {
    id: 'f-4',
    title: 'Heirloom Brocade Fine Art',
    category: 'fashion',
    categoryName: 'Fashion',
    location: 'Chennai Atelier • Tamil Nadu',
    year: '2026',
    src: '/images/fashion_editorial.png',
    aspect: 'square',
    caption: 'High-definition macro textures of gold zari weaving.',
  },

  // --- EVENTS & CULTURAL CELEBRATIONS (5 ITEMS) ---
  {
    id: 'ev-1',
    title: 'Grand Heritage Mandapam Diya Lighting',
    category: 'events',
    categoryName: 'Events',
    location: 'Madurai Mandapam • Tamil Nadu',
    year: '2026',
    src: '/images/grand_event_celebration.png',
    aspect: 'wide',
    caption: 'Hundreds of glowing oil lamps and floating rose urulis in cultural celebration.',
  },
  {
    id: 'ev-2',
    title: 'Grand Coastal Sangeet Gala',
    category: 'events',
    categoryName: 'Events',
    location: 'Kovalam Beach Resort • Kerala',
    year: '2026',
    src: '/images/grand_event_celebration.png',
    aspect: 'wide',
    caption: 'Vibrant evening celebrations beneath illuminated coastal palms.',
  },
  {
    id: 'ev-3',
    title: 'Classical Bharatanatyam Arangetram Debut',
    category: 'events',
    categoryName: 'Events',
    location: 'Music Academy • Chennai',
    year: '2026',
    src: '/images/fashion_editorial.png',
    aspect: 'tall',
    caption: 'Dynamic stage performance with temple jewelry and ghungroo bells.',
  },
  {
    id: 'ev-4',
    title: 'Grahapravesam Traditional Housewarming Puja',
    category: 'events',
    categoryName: 'Events',
    location: 'Heritage Home • Coimbatore',
    year: '2026',
    src: '/images/grand_event_celebration.png',
    aspect: 'portrait',
    caption: 'Boiling milk ceremony and traditional floral kolam entrance.',
  },
  {
    id: 'ev-5',
    title: 'Sashtiapthapoorthi 60th Wedding Milestone',
    category: 'events',
    categoryName: 'Events',
    location: 'Thirukadaiyur Temple Hall • Tamil Nadu',
    year: '2026',
    src: '/images/oonjal_swing_ceremony.png',
    aspect: 'wide',
    caption: 'Six decades of love honored with family Oonjal and Kalasa abhishekam.',
  },

  // --- COMMERCIAL & PRODUCT (4 ITEMS) ---
  {
    id: 'c-1',
    title: 'Temple Gold & Uncut Ruby Heritage Necklace',
    category: 'product',
    categoryName: 'Product',
    location: 'Atelier Macro Studio • Chennai',
    year: '2026',
    src: '/images/product_minimal.png',
    aspect: 'wide',
    caption: 'Tactile macro craftsmanship of South Indian temple jewellery on slate.',
  },
  {
    id: 'c-2',
    title: 'Tech & Leadership Summit Keynote',
    category: 'commercial',
    categoryName: 'Commercial',
    location: 'Chennai Convention Centre • Tamil Nadu',
    year: '2026',
    src: '/images/corporate_conference_summit.png',
    aspect: 'wide',
    caption: 'High-profile leadership address with dynamic LED stage backdrop.',
  },
  {
    id: 'c-3',
    title: 'Artisanal Temple Jhumkas & Bangles',
    category: 'product',
    categoryName: 'Product',
    location: 'Chennai Atelier • Tamil Nadu',
    year: '2026',
    src: '/images/product_minimal.png',
    aspect: 'square',
    caption: 'Intricate Lakshmi motifs and ruby drops in high-contrast light.',
  },
  {
    id: 'c-4',
    title: 'Luxury Heritage Resort Aerial View',
    category: 'commercial',
    categoryName: 'Commercial',
    location: 'Kumarakom • Kerala',
    year: '2026',
    src: '/images/drone_aerial_wedding.png',
    aspect: 'landscape',
    caption: 'Architectural aerial perspective for luxury hospitality brand.',
  },
];
