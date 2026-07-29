-- ==============================================================================
-- PHOTOMAGIC STUDIO OS - AI PHOTO GENERATION ENGINE SCHEMA (MIGRATION 00011)
-- Target Engine: PostgreSQL 15+ (Supabase Managed PostgreSQL)
-- ==============================================================================

-- Table: AI Generation Presets (Studio Style Presets)
CREATE TABLE IF NOT EXISTS ai_generation_presets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL DEFAULT 'wedding', -- 'wedding', 'cinematic', 'fashion', 'editorial', 'portrait'
  prompt_prefix TEXT,
  prompt_suffix TEXT,
  negative_prompt TEXT,
  camera_brand VARCHAR(50) DEFAULT 'Leica',
  lens VARCHAR(50) DEFAULT '50mm',
  aperture VARCHAR(10) DEFAULT 'f1.4',
  lighting_style VARCHAR(50) DEFAULT 'Golden Hour',
  is_system BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: AI Generation Batches (Batch Run Engine)
CREATE TABLE IF NOT EXISTS ai_generation_batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  provider VARCHAR(50) NOT NULL, -- 'openai', 'gemini', 'stability', 'flux', 'ideogram', 'replicate', 'fal'
  model_id VARCHAR(100) NOT NULL,
  prompt_text TEXT NOT NULL,
  negative_prompt TEXT,
  batch_size INTEGER NOT NULL DEFAULT 1, -- 1, 2, 4, 8, 16
  aspect_ratio VARCHAR(20) NOT NULL DEFAULT '16:9',
  seed BIGINT,
  total_cost_usd DECIMAL(10, 4) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: AI Generation History (Searchable Asset Metadata Ledger)
CREATE TABLE IF NOT EXISTS ai_generation_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  batch_id UUID REFERENCES ai_generation_batches(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  r2_url TEXT NOT NULL,
  prompt_text TEXT NOT NULL,
  negative_prompt TEXT,
  seed BIGINT,
  provider VARCHAR(50) NOT NULL,
  model_id VARCHAR(100) NOT NULL,
  camera_brand VARCHAR(50),
  lens VARCHAR(50),
  aperture VARCHAR(10),
  lighting VARCHAR(50),
  aspect_ratio VARCHAR(20),
  generation_time_ms INTEGER NOT NULL DEFAULT 1400,
  cost_usd DECIMAL(8, 4) NOT NULL DEFAULT 0.0400,
  is_favorite BOOLEAN NOT NULL DEFAULT FALSE,
  collection_name VARCHAR(100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS Security
ALTER TABLE ai_generation_presets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_generation_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_generation_history ENABLE ROW LEVEL SECURITY;
