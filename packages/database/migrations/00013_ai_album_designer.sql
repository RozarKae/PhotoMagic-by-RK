-- ==============================================================================
-- PHOTOMAGIC STUDIO OS - AI WEDDING ALBUM DESIGNER SCHEMA (MIGRATION 00013)
-- Target Engine: PostgreSQL 15+ (Supabase Managed PostgreSQL)
-- ==============================================================================

-- Table: Album Design Projects (Master Album Projects)
CREATE TABLE IF NOT EXISTS album_design_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  cover_type VARCHAR(50) NOT NULL DEFAULT 'leather', -- 'hardcover', 'softcover', 'leather', 'acrylic', 'canvas'
  cover_theme VARCHAR(50) NOT NULL DEFAULT 'Royal Black',
  foil_stamping_color VARCHAR(30) DEFAULT 'Gold',
  spine_text VARCHAR(255),
  total_pages INTEGER NOT NULL DEFAULT 40,
  album_size VARCHAR(20) NOT NULL DEFAULT '12x18', -- '8x8', '10x10', '12x12', '12x18'
  status VARCHAR(50) NOT NULL DEFAULT 'draft', -- 'draft', 'ai_culled', 'in_proofing', 'approved', 'in_print'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Album Design Pages (Individual Spreads & Pages)
CREATE TABLE IF NOT EXISTS album_design_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id UUID NOT NULL REFERENCES album_design_projects(id) ON DELETE CASCADE,
  page_number INTEGER NOT NULL,
  chapter_name VARCHAR(100) NOT NULL DEFAULT 'Wedding Ceremony', -- 'Pre-Wedding', 'Haldi', 'Mehendi', 'Sangeet', 'Ceremony', 'Reception'
  layout_type VARCHAR(50) NOT NULL DEFAULT 'full_bleed', -- 'full_bleed', 'grid_4', 'panoramic', 'editorial'
  background_color VARCHAR(20) DEFAULT '#0A0A0C',
  photo_slots JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Album Design Comments (Client Proofing 3D Pin Annotations)
CREATE TABLE IF NOT EXISTS album_design_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id UUID NOT NULL REFERENCES album_design_projects(id) ON DELETE CASCADE,
  page_number INTEGER NOT NULL,
  pin_x_percent DECIMAL(5, 2) NOT NULL,
  pin_y_percent DECIMAL(5, 2) NOT NULL,
  comment_text TEXT NOT NULL,
  author_role VARCHAR(20) NOT NULL DEFAULT 'client', -- 'client', 'photographer'
  is_resolved BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS Security
ALTER TABLE album_design_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE album_design_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE album_design_comments ENABLE ROW LEVEL SECURITY;
