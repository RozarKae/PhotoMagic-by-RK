export interface StudioProfile {
  name: string;
  leadArtist: string;
  tagline: string;
  description: string;
  foundedYear: number;
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    city: string;
    state: string;
    country: string;
  };
  social: {
    instagram: string;
    youtube: string;
    facebook?: string;
    googleMaps?: string;
  };
  packages: Array<{
    id: string;
    name: string;
    price: number;
    currency: string;
    badge?: string;
    deliverables: string[];
  }>;
}

export const STUDIO_PROFILE: StudioProfile = {
  name: 'PhotoMagic by RK',
  leadArtist: 'RK',
  tagline: 'Luxury Wedding Cinematography & Archival Heirloom Photography',
  description:
    'Documenting regal South Indian weddings, intimate celebrations, and royal destination unions across Chennai, Bangalore, Udaipur, and worldwide.',
  foundedYear: 2018,
  contact: {
    phone: '+91 98765 43210',
    whatsapp: '+919876543210',
    email: 'hello@batpaiyancatponnu.online',
    address: 'PhotoMagic Atelier, 108 Heritage Avenue',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
  },
  social: {
    instagram: 'https://instagram.com/photomagic_by_rk',
    youtube: 'https://youtube.com/@photomagic_by_rk',
    googleMaps: 'https://maps.google.com/?q=PhotoMagic+Studio',
  },
  packages: [
    {
      id: 'pkg-royal-heirloom',
      name: 'The Royal Heirloom Collection',
      price: 350000,
      currency: 'INR',
      badge: 'Signature Masterpiece',
      deliverables: [
        '3-Day Complete Wedding Coverage (Lead Artist RK + 4 Senior Cinematographers)',
        'Handcrafted 12x18 Inch Italian Leather Archival Album (60 Pages, 24K Gold Foil Stamping)',
        'Two 8x12 Inch Parent Mini-Albums',
        '8K Master Raw Deliverable Vault (Lifetime Cloud Access)',
        '4K Cinematic Wedding Film (25-30 Mins) + 3-Min Instagram Teaser',
        'Same-Day AI Photo Culling & Same-Day Edit Highlight Reel',
      ],
    },
    {
      id: 'pkg-destination-celebration',
      name: 'The Grand Destination Experience',
      price: 240000,
      currency: 'INR',
      badge: 'Most Popular',
      deliverables: [
        '2-Day Destination Wedding & Sangeet Coverage (3 Photographers + 2 Cinematographers)',
        '12x15 Inch Velvet Archival Album (40 Pages)',
        'One 8x10 Inch Parent Keepsake Album',
        'Full Resolution Digital Proofing & Selection Vault',
        '4K Highlight Film (15 Mins) + 60-Sec Reel',
      ],
    },
    {
      id: 'pkg-classic-muhurtham',
      name: 'The Classic Muhurtham & Reception',
      price: 150000,
      currency: 'INR',
      deliverables: [
        'Full Day Traditional Wedding & Evening Reception Coverage',
        '10x14 Inch Silk Layflat Album (30 Pages)',
        'High-Resolution Online Proofing Gallery',
        'Full HD Documentary Edit + Teaser',
      ],
    },
  ],
};
