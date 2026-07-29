-- ==============================================================================
-- PHOTOMAGIC STUDIO OS - GALLERIES & AI MEDIA ENGINE SCHEMA (MIGRATION 00005)
-- Target Engine: PostgreSQL 15+ (Supabase Managed PostgreSQL)
-- ==============================================================================

-- Table: Photos (Media Asset Metadata & AI Scores)
CREATE TABLE IF NOT EXISTS photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  gallery_id UUID NOT NULL REFERENCES galleries(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  r2_raw_key TEXT NOT NULL,
  r2_proof_key TEXT NOT NULL,
  r2_thumb_key TEXT NOT NULL,
  width INTEGER,
  height INTEGER,
  file_size_bytes BIGINT NOT NULL,
  camera_model VARCHAR(100),
  lens_model VARCHAR(100),
  focal_length VARCHAR(20),
  aperture VARCHAR(20),
  iso INTEGER,
  shutter_speed VARCHAR(20),
  ai_quality_score DECIMAL(3, 2), -- 0.00 to 1.00 score
  ai_tags TEXT[] DEFAULT '{}',
  is_blur BOOLEAN NOT NULL DEFAULT FALSE,
  is_duplicate BOOLEAN NOT NULL DEFAULT FALSE,
  is_selected BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  version INTEGER NOT NULL DEFAULT 1
);

-- Table: Photo Selections (Client Proofing Selection Records)
CREATE TABLE IF NOT EXISTS photo_selections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  gallery_id UUID NOT NULL REFERENCES galleries(id) ON DELETE CASCADE,
  photo_id UUID NOT NULL REFERENCES photos(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(gallery_id, photo_id, user_id)
);

-- Indexes for Fast Virtualized Grid Queries
CREATE INDEX IF NOT EXISTS idx_photos_gallery_id ON photos(gallery_id);
CREATE INDEX IF NOT EXISTS idx_photos_selected ON photos(gallery_id, is_selected);
CREATE INDEX IF NOT EXISTS idx_photo_selections_gallery ON photo_selections(gallery_id, user_id);

-- Enable RLS Security
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE photo_selections ENABLE ROW LEVEL SECURITY;
