-- ==============================================================================
-- PHOTOMAGIC STUDIO OS - ALBUMS & DIGITAL DELIVERY ENGINE SCHEMA (MIGRATION 00006)
-- Target Engine: PostgreSQL 15+ (Supabase Managed PostgreSQL)
-- ==============================================================================

-- Table: Albums (Flush-Mount Album Projects)
CREATE TABLE IF NOT EXISTS albums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  cover_material VARCHAR(100) NOT NULL DEFAULT 'italian_leather', -- 'italian_leather', 'velvet', 'linen'
  page_count INTEGER NOT NULL DEFAULT 30,
  status album_status_enum NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  version INTEGER NOT NULL DEFAULT 1
);

-- Table: Album Spreads (2-Page Spread Layouts)
CREATE TABLE IF NOT EXISTS album_spreads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id UUID NOT NULL REFERENCES albums(id) ON DELETE CASCADE,
  spread_number INTEGER NOT NULL,
  left_photo_key TEXT,
  right_photo_key TEXT,
  layout_config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(album_id, spread_number)
);

-- Table: Album Comments (Spatial Revision Pins)
CREATE TABLE IF NOT EXISTS album_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id UUID NOT NULL REFERENCES albums(id) ON DELETE CASCADE,
  spread_number INTEGER NOT NULL,
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  pin_x DECIMAL(5, 2) NOT NULL, -- Percentage 0-100%
  pin_y DECIMAL(5, 2) NOT NULL, -- Percentage 0-100%
  comment TEXT NOT NULL,
  resolved BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Delivery Packages (High-Res Digital Delivery Zips)
CREATE TABLE IF NOT EXISTS delivery_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  r2_zip_key TEXT NOT NULL,
  download_pin VARCHAR(10) NOT NULL,
  download_count INTEGER NOT NULL DEFAULT 0,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS Security
ALTER TABLE albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE album_spreads ENABLE ROW LEVEL SECURITY;
ALTER TABLE album_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_packages ENABLE ROW LEVEL SECURITY;
