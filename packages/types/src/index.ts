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
