import { CmsPackage } from '@photomagic/types';

export type PackageItem = CmsPackage;

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
