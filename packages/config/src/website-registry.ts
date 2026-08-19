import { WebsitePage, WebsiteSnapshot, PhotoMagicSectionType } from '@photomagic/types';
import {
  STUDIO_PROFILE,
  OFFICIAL_CATEGORIES,
  DEFAULT_PACKAGES,
  CMS_SERVICES,
  CMS_STORIES,
  CMS_TESTIMONIALS,
} from './studio-data';

// =============================================================================
// CANONICAL INITIAL PAGE DEFINITIONS (SOURCE OF TRUTH FOR SEED & CMS)
// =============================================================================

export const INITIAL_WEBSITE_PAGES: WebsitePage[] = [
  // 1. HOME
  {
    id: 'home',
    slug: '/',
    title: 'Home • Master Showcase',
    description:
      'Moments Through Our Eyes (இல்லத்தின் இன்ப நிகழ்வுகள், விழிகளின் வழியே) - PhotoMagic Studios by RK master homepage.',
    status: 'published',
    theme: 'lavender',
    mode: 'light',
    preset: 'modern-editorial',
    version: 1,
    createdAt: '2026-08-19T00:00:00.000Z',
    updatedAt: '2026-08-19T00:00:00.000Z',
    publishedAt: '2026-08-19T00:00:00.000Z',
    sections: [
      {
        id: 'sec-home-hero',
        name: 'Cinematic Rotating Hero',
        type: 'hero',
        background: '#0A0412',
        textColor: '#FFFFFF',
        paddingTop: '80px',
        paddingBottom: '80px',
        elements: [
          {
            id: 'el-home-hero-badge',
            type: 'badge',
            content: { text: 'PHOTOMAGIC STUDIOS BY RK' },
            styles: { color: '#F59E0B', goldAccent: true },
          },
          {
            id: 'el-home-hero-title',
            type: 'heading',
            content: { text: 'Moments Through Our Eyes', level: 1 },
            styles: { fontSize: '64px', fontWeight: '800', color: '#FFFFFF' },
          },
          {
            id: 'el-home-hero-tamil',
            type: 'tamil-text',
            content: { text: STUDIO_PROFILE.tamilStatement },
            styles: { fontSize: '18px', color: '#E9D5FF' },
          },
          {
            id: 'el-home-hero-cta-primary',
            type: 'button',
            content: { text: 'Check Your Date', url: '/book' },
            styles: { backgroundColor: '#E11D48', color: '#FFFFFF', borderRadius: '16px' },
          },
          {
            id: 'el-home-hero-cta-secondary',
            type: 'button',
            content: { text: 'Explore Stories', url: '/portfolio' },
            styles: {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: '#FFFFFF',
              borderRadius: '16px',
            },
          },
        ],
      },
      {
        id: 'sec-home-philosophy',
        name: 'Brand Storytelling & Perspective',
        type: 'philosophy',
        background: '#FAF5FF',
        textColor: '#1E0A3C',
        paddingTop: '96px',
        paddingBottom: '96px',
        elements: [
          {
            id: 'el-home-phil-sub',
            type: 'text',
            content: { text: 'THE PHOTOMAGIC PERSPECTIVE' },
            styles: { fontSize: '11px', fontWeight: '700', color: '#E11D48' },
          },
          {
            id: 'el-home-phil-title',
            type: 'heading',
            content: {
              text: 'Photography for Indian Celebrations, Families, People, Fashion & Stories',
              level: 2,
            },
            styles: { fontSize: '42px', fontWeight: '800', color: '#1E0A3C' },
          },
          {
            id: 'el-home-phil-desc',
            type: 'text',
            content: { text: STUDIO_PROFILE.founderStory },
            styles: { fontSize: '15px', color: '#4C1D95' },
          },
          {
            id: 'el-home-phil-quote',
            type: 'quote-widget',
            content: {
              quote: STUDIO_PROFILE.clientReactionQuote,
              author: 'The Desired Client Reaction',
            },
            styles: { color: '#E11D48' },
          },
        ],
      },
      {
        id: 'sec-home-categories',
        name: '10 Photography Categories',
        type: 'categories',
        background: '#FAF5FF',
        textColor: '#1E0A3C',
        paddingTop: '96px',
        paddingBottom: '96px',
        elements: [
          {
            id: 'el-home-cat-title',
            type: 'heading',
            content: { text: 'Curated Photographic Realms', level: 2 },
            styles: { fontSize: '36px', fontWeight: '800' },
          },
        ],
      },
      {
        id: 'sec-home-stories',
        name: 'Selected Stories & Visual Journals',
        type: 'stories-preview',
        background: '#FFFFFF',
        textColor: '#1E0A3C',
        paddingTop: '96px',
        paddingBottom: '96px',
        elements: [
          {
            id: 'el-home-stories-title',
            type: 'heading',
            content: { text: 'Show Me How You See Life', level: 2 },
            styles: { fontSize: '36px', fontWeight: '800' },
          },
        ],
      },
      {
        id: 'sec-home-packages',
        name: '5 Signature Collections',
        type: 'packages-preview',
        background: '#FAF5FF',
        textColor: '#1E0A3C',
        paddingTop: '96px',
        paddingBottom: '96px',
        elements: [
          {
            id: 'el-home-pkg-title',
            type: 'heading',
            content: { text: 'Curated Photography Collections', level: 2 },
            styles: { fontSize: '36px', fontWeight: '800' },
          },
        ],
      },
      {
        id: 'sec-home-custom-cta',
        name: 'Choose on Your Own Preference Banner',
        type: 'custom-package-cta',
        background: 'linear-gradient(135deg, #1E0A3C, #0F041D)',
        textColor: '#FFFFFF',
        paddingTop: '80px',
        paddingBottom: '80px',
        elements: [
          {
            id: 'el-home-custom-title',
            type: 'heading',
            content: { text: 'Choose on Your Own Preference', level: 2 },
            styles: { fontSize: '36px', fontWeight: '800', color: '#FFFFFF' },
          },
        ],
      },
      {
        id: 'sec-home-credibility',
        name: 'Real Credibility Metrics',
        type: 'credibility',
        background: '#FFFFFF',
        textColor: '#1E0A3C',
        paddingTop: '64px',
        paddingBottom: '64px',
        elements: [
          {
            id: 'el-home-cred-stat-1',
            type: 'text',
            content: { text: '3+ Years of Dedicated Artistry' },
          },
        ],
      },
      {
        id: 'sec-home-testimonials',
        name: 'Multilingual Client Reflections',
        type: 'testimonials',
        background: '#FAF5FF',
        textColor: '#1E0A3C',
        paddingTop: '96px',
        paddingBottom: '96px',
        elements: [
          {
            id: 'el-home-test-title',
            type: 'heading',
            content: { text: 'Words From Our Families', level: 2 },
            styles: { fontSize: '36px', fontWeight: '800' },
          },
        ],
      },
      {
        id: 'sec-home-final-cta',
        name: 'Final Date Reservation Anchor',
        type: 'final-cta',
        background: '#FFFFFF',
        textColor: '#1E0A3C',
        paddingTop: '96px',
        paddingBottom: '96px',
        elements: [
          {
            id: 'el-home-final-title',
            type: 'heading',
            content: { text: 'Let Us Record Your Event on Our Timeline', level: 2 },
            styles: { fontSize: '42px', fontWeight: '800' },
          },
        ],
      },
    ],
  },

  // 2. ABOUT
  {
    id: 'about',
    slug: '/about',
    title: 'About • Vision & Storytelling',
    description:
      'Discover the brand philosophy and visual journey of PhotoMagic Studios by RK. Preserving Indian celebrations as generational history.',
    status: 'published',
    theme: 'lavender',
    mode: 'light',
    preset: 'modern-editorial',
    version: 1,
    createdAt: '2026-08-19T00:00:00.000Z',
    updatedAt: '2026-08-19T00:00:00.000Z',
    publishedAt: '2026-08-19T00:00:00.000Z',
    sections: [
      {
        id: 'sec-about-hero',
        name: 'Vision Hero Header',
        type: 'hero',
        background: '#FAF5FF',
        textColor: '#1E0A3C',
        paddingTop: '96px',
        paddingBottom: '64px',
        elements: [
          {
            id: 'el-about-hero-sub',
            type: 'text',
            content: { text: 'BRAND STORYTELLING & PHILOSOPHY' },
            styles: { fontSize: '11px', fontWeight: '700', color: '#E11D48' },
          },
          {
            id: 'el-about-hero-title',
            type: 'heading',
            content: { text: 'Moments Through Our Eyes', level: 1 },
            styles: { fontSize: '56px', fontWeight: '800', color: '#1E0A3C' },
          },
          {
            id: 'el-about-hero-tamil',
            type: 'tamil-text',
            content: { text: STUDIO_PROFILE.tamilStatement },
            styles: { fontSize: '18px', color: '#6B21A8' },
          },
          {
            id: 'el-about-hero-desc',
            type: 'text',
            content: { text: STUDIO_PROFILE.brandBio },
            styles: { fontSize: '15px' },
          },
        ],
      },
      {
        id: 'sec-about-evolution',
        name: 'Evolution of Vision & Philosophy',
        type: 'philosophy',
        background: '#FFFFFF',
        textColor: '#1E0A3C',
        paddingTop: '80px',
        paddingBottom: '80px',
        elements: [
          {
            id: 'el-about-evol-title',
            type: 'heading',
            content: { text: 'A Personal Interpretation of Natural Beauty', level: 2 },
            styles: { fontSize: '36px', fontWeight: '800' },
          },
          {
            id: 'el-about-evol-desc1',
            type: 'text',
            content: { text: STUDIO_PROFILE.founderStory },
          },
          {
            id: 'el-about-evol-desc2',
            type: 'text',
            content: { text: STUDIO_PROFILE.photographyPhilosophy },
          },
          {
            id: 'el-about-evol-tech',
            type: 'text',
            content: { text: STUDIO_PROFILE.technicalPhilosophy },
          },
        ],
      },
      {
        id: 'sec-about-journey',
        name: 'Five Foundations Visual Journey',
        type: 'about-journey',
        background: '#FAF5FF',
        textColor: '#1E0A3C',
        paddingTop: '96px',
        paddingBottom: '96px',
        elements: [
          {
            id: 'el-about-journey-title',
            type: 'heading',
            content: { text: 'How Our Perspective Was Forged', level: 2 },
            styles: { fontSize: '36px', fontWeight: '800' },
          },
        ],
      },
      {
        id: 'sec-about-final-cta',
        name: 'Generational Legacy Anchor',
        type: 'final-cta',
        background: '#FFFFFF',
        textColor: '#1E0A3C',
        paddingTop: '96px',
        paddingBottom: '96px',
        elements: [
          {
            id: 'el-about-cta-quote',
            type: 'heading',
            content: {
              text: '"All our tension, pressure, struggle and the wait — worth it. We received more than we expected."',
              level: 2,
            },
            styles: { fontSize: '36px', fontWeight: '800' },
          },
        ],
      },
    ],
  },

  // 3. PORTFOLIO
  {
    id: 'portfolio',
    slug: '/portfolio',
    title: 'Portfolio • 10 Category Archive',
    description:
      'Explore the curated photographic archives of PhotoMagic Studios across 10 categories in masonry and asymmetric editorial grids.',
    status: 'published',
    theme: 'lavender',
    mode: 'light',
    preset: 'modern-editorial',
    version: 1,
    createdAt: '2026-08-19T00:00:00.000Z',
    updatedAt: '2026-08-19T00:00:00.000Z',
    publishedAt: '2026-08-19T00:00:00.000Z',
    sections: [
      {
        id: 'sec-portfolio-hero',
        name: 'Portfolio Header & Category Intro',
        type: 'hero',
        background: '#FAF5FF',
        textColor: '#1E0A3C',
        paddingTop: '80px',
        paddingBottom: '40px',
        elements: [
          {
            id: 'el-port-hero-title',
            type: 'heading',
            content: { text: 'The Masterpiece Showcase', level: 1 },
            styles: { fontSize: '56px', fontWeight: '800' },
          },
          {
            id: 'el-port-hero-tamil',
            type: 'tamil-text',
            content: { text: STUDIO_PROFILE.tamilStatement },
            styles: { fontSize: '15px' },
          },
        ],
      },
      {
        id: 'sec-portfolio-grid',
        name: '10 Category Asymmetric Masonry Gallery',
        type: 'portfolio-grid',
        background: '#FAF5FF',
        textColor: '#1E0A3C',
        paddingTop: '20px',
        paddingBottom: '80px',
        elements: [],
      },
      {
        id: 'sec-portfolio-final-cta',
        name: 'Commission Inquiry Anchor',
        type: 'final-cta',
        background: '#FFFFFF',
        textColor: '#1E0A3C',
        paddingTop: '64px',
        paddingBottom: '64px',
        elements: [
          {
            id: 'el-port-cta-title',
            type: 'heading',
            content: { text: 'Let Us Tell Your Unique Narrative', level: 2 },
            styles: { fontSize: '32px', fontWeight: '800' },
          },
        ],
      },
    ],
  },

  // 4. SERVICES
  {
    id: 'services',
    slug: '/services',
    title: 'Services • Signature Capabilities',
    description:
      'Bespoke photography, 4K cinematography, and handcrafted archival bookmaking across South India and worldwide.',
    status: 'published',
    theme: 'lavender',
    mode: 'light',
    preset: 'modern-editorial',
    version: 1,
    createdAt: '2026-08-19T00:00:00.000Z',
    updatedAt: '2026-08-19T00:00:00.000Z',
    publishedAt: '2026-08-19T00:00:00.000Z',
    sections: [
      {
        id: 'sec-services-hero',
        name: 'Services Header',
        type: 'hero',
        background: '#FAF5FF',
        textColor: '#1E0A3C',
        paddingTop: '80px',
        paddingBottom: '40px',
        elements: [
          {
            id: 'el-srv-hero-title',
            type: 'heading',
            content: { text: 'Services & Cultural Coverage', level: 1 },
            styles: { fontSize: '56px', fontWeight: '800' },
          },
        ],
      },
      {
        id: 'sec-services-list',
        name: 'Signature Services Showcase List',
        type: 'services-list',
        background: '#FAF5FF',
        textColor: '#1E0A3C',
        paddingTop: '20px',
        paddingBottom: '80px',
        elements: [],
      },
    ],
  },

  // 5. STORIES
  {
    id: 'stories',
    slug: '/stories',
    title: 'Stories • Visual Journals & Documentary',
    description:
      'Cinematic documentary archives, cultural narratives, and visual journals told in full-bleed imagery.',
    status: 'published',
    theme: 'lavender',
    mode: 'light',
    preset: 'modern-editorial',
    version: 1,
    createdAt: '2026-08-19T00:00:00.000Z',
    updatedAt: '2026-08-19T00:00:00.000Z',
    publishedAt: '2026-08-19T00:00:00.000Z',
    sections: [
      {
        id: 'sec-stories-hero',
        name: 'Stories Header',
        type: 'hero',
        background: '#FAF5FF',
        textColor: '#1E0A3C',
        paddingTop: '80px',
        paddingBottom: '40px',
        elements: [
          {
            id: 'el-sto-hero-title',
            type: 'heading',
            content: { text: 'Selected Stories', level: 1 },
            styles: { fontSize: '56px', fontWeight: '800' },
          },
        ],
      },
      {
        id: 'sec-stories-list',
        name: 'Visual Magazine Story Feed',
        type: 'stories-list',
        background: '#FAF5FF',
        textColor: '#1E0A3C',
        paddingTop: '20px',
        paddingBottom: '80px',
        elements: [],
      },
    ],
  },

  // 6. PACKAGES
  {
    id: 'packages',
    slug: '/packages',
    title: 'Packages • 5 Tiers + Custom Estimator',
    description:
      'Five signature stone and metal rarity collections, or build a completely bespoke package tailored to your exact event timeline.',
    status: 'published',
    theme: 'lavender',
    mode: 'light',
    preset: 'modern-editorial',
    version: 1,
    createdAt: '2026-08-19T00:00:00.000Z',
    updatedAt: '2026-08-19T00:00:00.000Z',
    publishedAt: '2026-08-19T00:00:00.000Z',
    sections: [
      {
        id: 'sec-packages-hero',
        name: 'Packages Header',
        type: 'hero',
        background: '#FAF5FF',
        textColor: '#1E0A3C',
        paddingTop: '80px',
        paddingBottom: '40px',
        elements: [
          {
            id: 'el-pkg-hero-title',
            type: 'heading',
            content: { text: 'Curated Collections & Pricing', level: 1 },
            styles: { fontSize: '56px', fontWeight: '800' },
          },
        ],
      },
      {
        id: 'sec-packages-tiers',
        name: '5 Signature Stone & Metal Tiers',
        type: 'packages-preview',
        background: '#FAF5FF',
        textColor: '#1E0A3C',
        paddingTop: '20px',
        paddingBottom: '80px',
        elements: [],
      },
      {
        id: 'sec-packages-builder',
        name: 'Choose On Your Own Preference Estimator',
        type: 'custom-package-builder',
        background: '#FAF5FF',
        textColor: '#1E0A3C',
        paddingTop: '40px',
        paddingBottom: '96px',
        elements: [],
      },
    ],
  },

  // 7. BOOK
  {
    id: 'book',
    slug: '/book',
    title: 'Book • 7-Step Check Your Date',
    description:
      'Check availability on our private studio timeline for your wedding, celebration, or portrait commission.',
    status: 'published',
    theme: 'lavender',
    mode: 'light',
    preset: 'modern-editorial',
    version: 1,
    createdAt: '2026-08-19T00:00:00.000Z',
    updatedAt: '2026-08-19T00:00:00.000Z',
    publishedAt: '2026-08-19T00:00:00.000Z',
    sections: [
      {
        id: 'sec-book-wizard',
        name: '7-Step Check Your Date Wizard',
        type: 'booking-wizard',
        background: '#FAF5FF',
        textColor: '#1E0A3C',
        paddingTop: '80px',
        paddingBottom: '96px',
        elements: [],
      },
    ],
  },

  // 8. CONTACT
  {
    id: 'contact',
    slug: '/contact',
    title: 'Contact • Studio Concierge',
    description:
      'Direct communication for weddings, milestone celebrations, and fashion editorials with Rozar Khan.',
    status: 'published',
    theme: 'lavender',
    mode: 'light',
    preset: 'modern-editorial',
    version: 1,
    createdAt: '2026-08-19T00:00:00.000Z',
    updatedAt: '2026-08-19T00:00:00.000Z',
    publishedAt: '2026-08-19T00:00:00.000Z',
    sections: [
      {
        id: 'sec-contact-concierge',
        name: 'Studio Concierge & Direct Inquiry Form',
        type: 'contact-concierge',
        background: '#FAF5FF',
        textColor: '#1E0A3C',
        paddingTop: '80px',
        paddingBottom: '96px',
        elements: [],
      },
    ],
  },
];
