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
    phone: '7904933234',
    whatsapp: '7904933234',
    email: 'photomagicphotographystudio@gmail.com',
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
// OFFICIAL STUDIO BANKING & UPI CREDENTIALS
// =============================================================================

export const STUDIO_BANKING_DETAILS = {
  accountName: 'Rozar Khan',
  accountNumber: '501000389071617',
  ifscCode: 'HDFC0003734',
  bankName: 'HDFC Bank',
  branch: 'Madurai Heritage / Tamil Nadu',
  upiId: 'rozarkhan@ptyes',
  phoneUpiId: '7904943234@upi',
  hdfcUpiId: '7904943234@okhdfcbank',
  phone: '7904943234',
  email: 'photomagicphotographystudio@gmail.com',
  website: 'https://batpaiyancatponnu.online/photomagic',
};

// =============================================================================
// 10 OFFICIAL PHOTOGRAPHY CATEGORIES (CREATIVE + ACTUAL DUAL NAMES)
// =============================================================================
