export interface StudioProfile {
  name: string;
  brandName: string;
  founderName: string;
  leadArtist: string;
  artistTagline: string;
  brandBio: string;
  founderStory: string;
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
  };
  social: {
    instagram: string;
    facebook: string;
    youtube: string;
    github: string;
  };
  specialties: string[];
  packages: Array<{
    id: string;
    name: string;
    price: number;
    currency: string;
    badge?: string;
    description: string;
    deliverables: string[];
  }>;
}

export const STUDIO_PROFILE: StudioProfile = {
  name: 'PhotoMagic by RK',
  brandName: 'PhotoMagic Studio by Rozar Khan',
  founderName: 'Rozar Khan',
  leadArtist: 'Rozar Khan (RK)',
  artistTagline: 'Regal Wedding Cinematography, BabyBliss & Archival Fine Art Photography',
  brandBio:
    'Founded by visionary artist Rozar Khan, PhotoMagic by RK crafts breathtaking visual stories across grand destination weddings, intimate luxury ceremonies, baby portraits, and editorial fine art.',
  founderStory:
    'With a deep passion for emotional storytelling, high-speed lighting precision, and bespoke archival printmaking, Rozar Khan brings cinematic grandeur and timeless elegance to every couple and family he documents.',
  foundedYear: 2018,
  contact: {
    phone: '+91 98765 43210',
    whatsapp: '+919876543210',
    email: 'hello@batpaiyancatponnu.online',
    website: 'https://batpaiyancatponnu.online/photomagic',
    address: 'PhotoMagic Atelier, 108 Heritage Blvd',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
  },
  social: {
    instagram: 'https://instagram.com/rozarkhan_photography',
    facebook: 'https://facebook.com/rkaephotography',
    youtube: 'https://youtube.com/@rozarkhan',
    github: 'https://github.com/RozarKae',
  },
  specialties: [
    'Royal Destination Weddings',
    'South Indian Traditional Muhurtham',
    'Project BabyBliss & Toddler Portraits',
    'Editorial Bridal Portraits',
    '12x18 Archival Handcrafted Italian Albums',
    'Cinematic 4K Wedding Films & Color Grading',
  ],
  packages: [
    {
      id: 'pkg-royal-heirloom',
      name: 'The Royal Heirloom Collection',
      price: 350000,
      currency: 'INR',
      badge: 'Signature Masterpiece',
      description: 'The ultimate bespoke experience directed personally by Rozar Khan.',
      deliverables: [
        '3-Day Complete Wedding Coverage (Lead Artist Rozar Khan + 4 Senior Cinematographers)',
        'Handcrafted 12x18 Inch Italian Leather Archival Album (60 Pages, 24K Gold Foil Stamping)',
        'Two 8x12 Inch Parent Keepsake Albums',
        '8K Master Raw Deliverable Vault (Lifetime Cloud Access)',
        '4K Cinematic Wedding Film (25-30 Mins) + 3-Min Instagram Teaser',
        'Same-Day AI Photo Culling & Same-Day Highlight Reel',
      ],
    },
    {
      id: 'pkg-destination-celebration',
      name: 'The Grand Destination Experience',
      price: 240000,
      currency: 'INR',
      badge: 'Most Popular',
      description: 'Full multi-day destination coverage for royal celebrations.',
      deliverables: [
        '2-Day Destination Wedding & Sangeet Coverage (3 Photographers + 2 Cinematographers)',
        '12x15 Inch Velvet Archival Album (40 Pages)',
        'One 8x10 Inch Parent Keepsake Album',
        'Full Resolution Digital Proofing & Selection Vault',
        '4K Highlight Film (15 Mins) + 60-Sec Reel',
      ],
    },
    {
      id: 'pkg-babybliss-portraiture',
      name: 'Project BabyBliss & Family Heirloom',
      price: 85000,
      currency: 'INR',
      badge: 'Bespoke Family',
      description: 'Intimate fine-art toddler, newborn, and maternity portraiture.',
      deliverables: [
        'Half-Day Atelier Studio or In-Home Studio Lighting Setup',
        'Custom Fine Art Props & Heirloom Set Styling',
        '10x10 Inch Silk Fine Art Keepsake Book (20 Pages)',
        '25 Master High-Res Retouched Editorial Portraits',
        'Private Cloud Gallery with High-Speed Download',
      ],
    },
  ],
};
