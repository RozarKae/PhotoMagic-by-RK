-- ==============================================================================
-- PHOTOMAGIC STUDIO OS - AI STUDIO FOUNDATION SCHEMA (MIGRATION 00010)
-- Target Engine: PostgreSQL 15+ (Supabase Managed PostgreSQL)
-- ==============================================================================

-- Table: AI Models (Multi-Provider Model Registry)
CREATE TABLE IF NOT EXISTS ai_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider VARCHAR(50) NOT NULL, -- 'gemini', 'openai', 'claude', 'stability', 'flux', 'ideogram', 'midjourney'
  name VARCHAR(100) NOT NULL,
  model_id VARCHAR(100) NOT NULL UNIQUE,
  enabled BOOLEAN NOT NULL DEFAULT TRUE,
  is_default BOOLEAN NOT NULL DEFAULT FALSE,
  cost_per_request DECIMAL(8, 4) NOT NULL DEFAULT 0.0200,
  health_status VARCHAR(20) NOT NULL DEFAULT 'healthy', -- 'healthy', 'degraded', 'offline'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: AI Prompts (Prompt Template Library & Versioning)
CREATE TABLE IF NOT EXISTS ai_prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  prompt_text TEXT NOT NULL,
  negative_prompt TEXT,
  category VARCHAR(100) NOT NULL DEFAULT 'portrait', -- 'portrait', 'wedding', 'cinematic', 'retouch'
  tags TEXT[] DEFAULT '{}',
  is_favorite BOOLEAN NOT NULL DEFAULT FALSE,
  version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: AI Jobs (Background Generation Queue Engine)
CREATE TABLE IF NOT EXISTS ai_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  model_id VARCHAR(100) NOT NULL,
  prompt_id UUID REFERENCES ai_prompts(id) ON DELETE SET NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  progress_percent INTEGER NOT NULL DEFAULT 0,
  error_message TEXT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: AI Assets (Generated Asset Library)
CREATE TABLE IF NOT EXISTS ai_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  job_id UUID REFERENCES ai_jobs(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  asset_type VARCHAR(50) NOT NULL DEFAULT 'image', -- 'image', 'video', 'psd', 'png', 'jpeg'
  r2_key TEXT NOT NULL,
  r2_url TEXT NOT NULL,
  prompt_snapshot TEXT NOT NULL,
  width INTEGER NOT NULL DEFAULT 1024,
  height INTEGER NOT NULL DEFAULT 1024,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: AI Usage (Token & Credit Tracking Ledger)
CREATE TABLE IF NOT EXISTS ai_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  model_id VARCHAR(100) NOT NULL,
  credits_consumed DECIMAL(10, 2) NOT NULL DEFAULT 1.00,
  cost_usd DECIMAL(10, 4) NOT NULL DEFAULT 0.0200,
  processing_time_ms INTEGER NOT NULL DEFAULT 1200,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS Security
ALTER TABLE ai_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage ENABLE ROW LEVEL SECURITY;
