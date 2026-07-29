-- ==============================================================================
-- PHOTOMAGIC STUDIO OS - AI CLIENT SELECTION & PROOFING SCHEMA (MIGRATION 00014)
-- Target Engine: PostgreSQL 15+ (Supabase Managed PostgreSQL)
-- ==============================================================================

-- Table: Photo Favorites & Star Ratings
CREATE TABLE IF NOT EXISTS photo_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  gallery_id UUID NOT NULL REFERENCES galleries(id) ON DELETE CASCADE,
  photo_id UUID NOT NULL REFERENCES gallery_media(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  is_favorite BOOLEAN NOT NULL DEFAULT TRUE,
  star_rating INTEGER DEFAULT 5, -- 1 to 5 stars
  ai_recommendation_type VARCHAR(50), -- 'best_smile', 'sharpest', 'best_lighting', 'photographer_pick'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Photo Comments & Spatial Annotations
CREATE TABLE IF NOT EXISTS photo_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  photo_id UUID NOT NULL REFERENCES gallery_media(id) ON DELETE CASCADE,
  user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  author_name VARCHAR(100) NOT NULL,
  comment_text TEXT NOT NULL,
  pin_x DECIMAL(5, 2),
  pin_y DECIMAL(5, 2),
  is_resolved BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Edit Requests (Retouching & Background Instructions)
CREATE TABLE IF NOT EXISTS edit_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  photo_id UUID NOT NULL REFERENCES gallery_media(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  request_type VARCHAR(50) NOT NULL, -- 'skin_retouching', 'object_removal', 'background_replacement', 'color_adjustment'
  priority_level VARCHAR(20) NOT NULL DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
  instructions TEXT NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'submitted', -- 'submitted', 'accepted', 'in_progress', 'completed', 'delivered'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Gallery Approvals & Digital Signatures
CREATE TABLE IF NOT EXISTS gallery_approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_id UUID NOT NULL REFERENCES galleries(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  client_signature_name VARCHAR(100) NOT NULL,
  approved_item_count INTEGER NOT NULL DEFAULT 0,
  approval_timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  ip_address VARCHAR(50)
);

-- Table: Download Center Tracking
CREATE TABLE IF NOT EXISTS gallery_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_id UUID NOT NULL REFERENCES galleries(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  resolution VARCHAR(30) NOT NULL DEFAULT 'original', -- 'original', 'web', 'social'
  zip_size_bytes BIGINT NOT NULL DEFAULT 0,
  downloaded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS Security
ALTER TABLE photo_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE photo_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE edit_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_downloads ENABLE ROW LEVEL SECURITY;
