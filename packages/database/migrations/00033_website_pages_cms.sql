-- ==============================================================================
-- PHOTOMAGIC STUDIO OS - WEBSITE PAGES & CMS SNAPSHOTS (MIGRATION 00033)
-- Target Engine: PostgreSQL 15+ (Supabase Managed PostgreSQL)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS website_pages (
  id VARCHAR(100) PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'published',
  theme VARCHAR(50) NOT NULL DEFAULT 'lavender',
  mode VARCHAR(20) NOT NULL DEFAULT 'light',
  preset VARCHAR(50) DEFAULT 'modern-editorial',
  page_data JSONB NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS website_snapshots (
  id VARCHAR(100) PRIMARY KEY,
  page_id VARCHAR(100) NOT NULL REFERENCES website_pages(id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  label VARCHAR(255),
  author VARCHAR(255),
  summary TEXT,
  theme VARCHAR(50) NOT NULL DEFAULT 'lavender',
  page_data JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_website_pages_slug ON website_pages(slug);
CREATE INDEX IF NOT EXISTS idx_website_pages_status ON website_pages(status);
CREATE INDEX IF NOT EXISTS idx_website_snapshots_page_id ON website_snapshots(page_id);
