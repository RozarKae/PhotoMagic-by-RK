export type UserRole = 'client' | 'photographer' | 'editor' | 'admin' | 'studio_staff';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  eventType: 'wedding' | 'portrait' | 'corporate' | 'event' | 'commercial';
  eventDate: string;
  location: string;
  packageId: string;
  packageName: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  clientName: string;
  eventType: string;
  status: 'intake' | 'culling' | 'ai_editing' | 'proofing' | 'album_design' | 'delivered';
  photoCount: number;
  selectedCount: number;
  editedCount: number;
  deliveryDate: string;
  coverImage: string;
}

export interface CloudinaryAssetMetadata {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  bytes: number;
  format: string;
  created_at: string;
  clientId?: string;
  projectId?: string;
  eventId?: string;
  photographer?: string;
  tags?: string[];
  folder?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  thumbnailUrl: string;
  title: string;
  category: string;
  width: number;
  height: number;
  isFavorite?: boolean;
  aiTags?: string[];
  score?: number;
  public_id?: string;
  secure_url?: string;
  bytes?: number;
  format?: string;
  created_at?: string;
  clientId?: string;
  projectId?: string;
  photographer?: string;
  location?: string;
  year?: string;
}

export interface AlbumSpread {
  id: string;
  spreadNumber: number;
  leftPageImage?: string;
  rightPageImage?: string;
  layoutTemplate: string;
  status: 'draft' | 'client_reviewed' | 'approved' | 'sent_to_print';
}

export interface AIModuleTask {
  id: string;
  name: string;
  type: 'culling' | 'color_grading' | 'face_enhancement' | 'album_layout' | 'caption_gen';
  progress: number;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  resultCount?: number;
  timestamp: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  tagline: string;
  price: number;
  formattedPrice: string;
  features: string[];
  recommendedFor: string;
  popular?: boolean;
}

// =============================================================================
// CMS DATA MODELS (PHOTOMAGIC STUDIOS BY RK)
// =============================================================================

export interface PhotographyCategory {
  id: string;
  creativeName: string;
  actualName: string;
  slug: string;
  order: number;
  heroMedia: string;
  description: string;
  portfolioCount?: number;
  featuredStorySlug?: string;
  sampleImages: string[];
}

export interface CmsService {
  id: string;
  creativeName: string;
  actualName: string;
  slug: string;
  description: string;
  shortSummary: string;
  heroMedia: string;
  gallery: string[];
  featuredWork: Array<{
    title: string;
    location: string;
    image: string;
    caption: string;
  }>;
  packages: string[];
  testimonials: string[];
  ctaText: string;
  seoTitle: string;
  seoDescription: string;
  status: 'published' | 'draft';
}

export interface CmsStory {
  id: string;
  title: string;
  slug: string;
  category: 'Weddings' | 'Family' | 'Fashion' | 'Culture' | 'Personal';
  location: string;
  year: string;
  coverMedia: string;
  mediaItems: Array<{
    url: string;
    caption?: string;
    type: 'image' | 'video';
    aspect?: 'landscape' | 'portrait' | 'square' | 'cinematic';
  }>;
  minimalContext: string;
  featured: boolean;
  published: boolean;
  seoTitle: string;
  seoDescription: string;
}

export interface CmsPackage {
  id: string;
  name: string;
  creativeTier: string;
  description: string;
  price: number;
  currency: string;
  formattedPrice: string;
  coverageDays: number;
  components: string[];
  deliverables: string[];
  complimentaryItems: string[];
  media: string;
  featured: boolean;
  status: 'published' | 'draft';
  badge?: string;
}

export interface CmsTestimonial {
  id: string;
  clientName: string;
  event: string;
  date: string;
  location: string;
  quote: string;
  tamilQuote?: string;
  language: 'en' | 'ta' | 'tanglish' | 'mixed';
  mediaUrl: string;
  rating: number;
}

// =============================================================================
// CUSTOM PACKAGE BUILDER & MULTI-EVENT ESTIMATOR
// =============================================================================

export interface CustomEventItem {
  id: string;
  name: string;
  date: string;
  startTime?: string;
  endTime?: string;
  location: string;
  notes?: string;
  requiredCoverage: {
    traditionalPhoto: number;
    traditionalVideo: number;
    candidPhoto: number;
    candidVideo: number;
    drone: boolean;
  };
}

export interface CustomPackageComponents {
  days: number;
  traditionalPhotographers: number;
  traditionalVideographers: number;
  candidPhotographers: number;
  candidVideographers: number;
  droneDays: number;
  preWedding: boolean;
  postWedding: boolean;
  albumCount: number;
  albumType: 'standard' | 'luxury_leather' | 'heirloom_gold';
  additionalAlbums: number;
  familyMilestones: string[];
}

export interface CustomPackageCalculation {
  baseTotal: number;
  discountPercentage: number;
  discountAmount: number;
  finalTotal: number;
  breakdown: Array<{ label: string; amount: number }>;
}

export interface CheckDateSubmission {
  id?: string;
  category: string;
  eventType: string;
  primaryDate: string;
  days: number;
  venueName: string;
  address: string;
  city: string;
  state: string;
  locationNotes?: string;
  multiEvents?: CustomEventItem[];
  packageType: 'default' | 'custom';
  selectedPackageId?: string;
  customConfig?: CustomPackageComponents;
  calculatedPrice?: number;
  clientName: string;
  phone: string;
  whatsapp: string;
  email: string;
  notes?: string;
  status?: 'received' | 'under_review' | 'availability_confirmed' | 'booked';
  createdAt?: string;
}

// =============================================================================
// PHOTO MAGIC VISUAL WEBSITE BUILDER MODELS
// =============================================================================

export type BuilderDevice = 'desktop' | 'tablet' | 'mobile';
export type BuilderTheme = 'lavender' | 'soft-pink' | 'blush' | 'rose' | 'mauve' | 'maroon';
export type BuilderMode = 'light' | 'dark';
export type BuilderPreset =
  'modern-editorial' | 'cinematic' | 'vibrant' | 'minimal' | 'experimental' | 'luxury';

export interface BuilderElementStyles {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  letterSpacing?: string;
  color?: string;
  textColor?: string;
  backgroundColor?: string;
  backgroundGradient?: string;
  backgroundImage?: string;
  borderRadius?: string;
  borderColor?: string;
  borderWidth?: string;
  padding?: string;
  paddingTop?: string;
  paddingBottom?: string;
  margin?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  boxShadow?: string;
  width?: string;
  maxWidth?: string;
  height?: string;
  opacity?: number;
  goldAccent?: boolean;
  deviceOverrides?: {
    tablet?: Partial<BuilderElementStyles>;
    mobile?: Partial<BuilderElementStyles>;
  };
  [key: string]: any;
}

export interface BuilderAnimationSettings {
  entrance?: 'none' | 'fade' | 'slide-up' | 'slide-down' | 'reveal' | 'scale' | 'mask' | 'blur';
  duration?: number;
  delay?: number;
  scrollEffect?: 'none' | 'parallax' | 'scale-on-scroll' | 'horizontal-drift' | 'pin';
  interaction?: 'none' | 'hover-lift' | 'hover-glow' | 'magnetic' | 'tilt';
}

export interface BuilderElement {
  id: string;
  type:
    | 'heading'
    | 'text'
    | 'tamil-text'
    | 'rich-text'
    | 'image'
    | 'video'
    | 'button'
    | 'icon'
    | 'badge'
    | 'divider'
    | 'spacer'
    | 'container'
    | 'columns'
    | 'grid'
    | 'gallery-masonry'
    | 'gallery-asymmetric'
    | 'gallery-fullscreen'
    | 'gallery-collage'
    | 'gallery-slideshow'
    | 'featured-work'
    | 'services-widget'
    | 'packages-widget'
    | 'custom-package-widget'
    | 'check-date-widget'
    | 'testimonials-widget'
    | 'credibility-widget'
    | 'quote-widget'
    | 'social-links'
    | 'instagram-feed'
    | 'custom-html';
  content: {
    text?: string;
    tamilText?: string;
    subtext?: string;
    src?: string;
    mediaUrl?: string;
    alt?: string;
    url?: string;
    iconName?: string;
    items?: any[];
    [key: string]: any;
  };
  styles?: BuilderElementStyles;
  animation?: BuilderAnimationSettings;
  [key: string]: any;
}

export interface BuilderSection {
  id: string;
  name: string;
  type?: string;
  preset?: BuilderPreset;
  hidden?: boolean;
  background?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  styles?: BuilderElementStyles;
  animation?: BuilderAnimationSettings;
  elements: BuilderElement[];
  [key: string]: any;
}

export interface BuilderPage {
  id: string;
  slug: string;
  title: string;
  description?: string;
  status: 'published' | 'draft';
  theme: BuilderTheme;
  mode: BuilderMode;
  preset?: BuilderPreset;
  sections: BuilderSection[];
  version?: number;
  updatedAt: string;
  publishedAt?: string;
}

export interface BuilderTemplate {
  id: string;
  name: string;
  category: 'hero' | 'gallery' | 'services' | 'story' | 'cta' | 'testimonials' | 'full-page';
  description: string;
  previewImage?: string;
  sections: BuilderSection[];
  createdAt: string;
}

export type PhotoMagicSectionType =
  | 'hero'
  | 'philosophy'
  | 'categories'
  | 'stories-preview'
  | 'packages-preview'
  | 'custom-package-cta'
  | 'testimonials'
  | 'credibility'
  | 'final-cta'
  | 'about-journey'
  | 'portfolio-grid'
  | 'services-list'
  | 'stories-list'
  | 'custom-package-builder'
  | 'booking-wizard'
  | 'contact-concierge'
  | 'custom-section';

export interface WebsitePage {
  id: string;
  slug: string;
  title: string;
  description?: string;
  status: 'published' | 'draft';
  theme: BuilderTheme;
  mode: BuilderMode;
  preset?: BuilderPreset;
  sections: BuilderSection[];
  version: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface WebsiteSnapshot {
  id: string;
  pageId: string;
  version: number;
  label?: string;
  author?: string;
  summary?: string;
  theme?: BuilderTheme;
  pageData: WebsitePage;
  createdAt: string;
}

export interface BuilderVersionSnapshot {
  id: string;
  pageId: string;
  version?: number;
  label?: string;
  author?: string;
  summary?: string;
  timestamp?: string;
  createdAt?: string;
  pageData?: BuilderPage | WebsitePage;
  data?: BuilderPage | WebsitePage;
}
