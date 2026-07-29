-- ==============================================================================
-- PHOTOMAGIC STUDIO OS - AI EDITING ENGINE FOUNDATION SCHEMA (MIGRATION 00020)
-- Target Engine: PostgreSQL 15+ (Supabase Managed PostgreSQL)
-- ==============================================================================

-- Table: Editing Sessions
CREATE TABLE IF NOT EXISTS editing_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  session_name VARCHAR(255) NOT NULL,
  original_image_url TEXT NOT NULL,
  current_version_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Image Versions (Non-Destructive Version Storage)
CREATE TABLE IF NOT EXISTS image_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES editing_sessions(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL DEFAULT 1,
  version_name VARCHAR(100) NOT NULL, -- 'v1.0 Original', 'v1.1 Auto Enhance', 'v1.2 Retouched'
  image_url TEXT NOT NULL,
  applied_operations JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Edit History Stacks (Undo/Redo State Stack Ledger)
CREATE TABLE IF NOT EXISTS edit_history_stacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES editing_sessions(id) ON DELETE CASCADE,
  step_index INTEGER NOT NULL,
  action_type VARCHAR(100) NOT NULL, -- 'crop', 'color_grade', 'exposure', 'object_removal'
  parameters JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Editing Jobs (Background Processing Queue Architecture)
CREATE TABLE IF NOT EXISTS editing_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES editing_sessions(id) ON DELETE CASCADE,
  job_type VARCHAR(100) NOT NULL, -- 'ai_retouch', 'background_removal', 'hdr_merge'
  status VARCHAR(30) NOT NULL DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  progress_percent INTEGER NOT NULL DEFAULT 0,
  error_message TEXT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS Security
ALTER TABLE editing_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE image_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE edit_history_stacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE editing_jobs ENABLE ROW LEVEL SECURITY;
