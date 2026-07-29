-- ==============================================================================
-- PHOTOMAGIC STUDIO OS - AI MARKETING & CONTENT STUDIO SCHEMA (MIGRATION 00015)
-- Target Engine: PostgreSQL 15+ (Supabase Managed PostgreSQL)
-- ==============================================================================

-- Table: Marketing Campaigns
CREATE TABLE IF NOT EXISTS marketing_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  campaign_type VARCHAR(50) NOT NULL DEFAULT 'social_media', -- 'social_media', 'email_newsletter', 'poster_promo', 'meta_ads'
  target_audience VARCHAR(100) DEFAULT 'Luxury Brides',
  budget_usd DECIMAL(10, 2) DEFAULT 500.00,
  status VARCHAR(30) NOT NULL DEFAULT 'active', -- 'draft', 'active', 'completed', 'archived'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Social Media Posts & Captions
CREATE TABLE IF NOT EXISTS social_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES marketing_campaigns(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL DEFAULT 'instagram', -- 'instagram', 'facebook', 'twitter', 'linkedin', 'youtube'
  caption_text TEXT NOT NULL,
  hashtags TEXT[] DEFAULT '{}',
  media_url TEXT,
  scheduled_at TIMESTAMPTZ,
  status VARCHAR(30) NOT NULL DEFAULT 'draft', -- 'draft', 'scheduled', 'published'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Brand Assets & Guidelines
CREATE TABLE IF NOT EXISTS brand_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  asset_name VARCHAR(100) NOT NULL,
  asset_type VARCHAR(50) NOT NULL DEFAULT 'logo', -- 'logo', 'watermark', 'font', 'color_palette'
  file_url TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Content Calendar & Scheduling
CREATE TABLE IF NOT EXISTS content_calendar (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES social_posts(id) ON DELETE CASCADE,
  scheduled_date DATE NOT NULL,
  time_slot VARCHAR(20) NOT NULL DEFAULT '18:00',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS Security
ALTER TABLE marketing_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_calendar ENABLE ROW LEVEL SECURITY;
