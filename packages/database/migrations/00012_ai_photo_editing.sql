-- ==============================================================================
-- PHOTOMAGIC STUDIO OS - AI PHOTO EDITING STUDIO SCHEMA (MIGRATION 00012)
-- Target Engine: PostgreSQL 15+ (Supabase Managed PostgreSQL)
-- ==============================================================================

-- Table: AI Editing Sessions (Non-Destructive Workspaces)
CREATE TABLE IF NOT EXISTS ai_editing_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  original_image_url TEXT NOT NULL,
  current_image_url TEXT NOT NULL,
  session_name VARCHAR(255) NOT NULL DEFAULT 'Untitled Studio Edit',
  version INTEGER NOT NULL DEFAULT 1,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: AI Editing Layers (Layer Stack & Mask Engine)
CREATE TABLE IF NOT EXISTS ai_editing_layers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES ai_editing_sessions(id) ON DELETE CASCADE,
  layer_name VARCHAR(100) NOT NULL,
  layer_type VARCHAR(50) NOT NULL DEFAULT 'adjustment', -- 'adjustment', 'retouch', 'background', 'object_removal'
  blend_mode VARCHAR(50) NOT NULL DEFAULT 'normal',
  opacity DECIMAL(5, 2) NOT NULL DEFAULT 1.00,
  is_visible BOOLEAN NOT NULL DEFAULT TRUE,
  parameters JSONB NOT NULL DEFAULT '{}',
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: AI Editing History (Non-Destructive Undo/Redo & Snapshots)
CREATE TABLE IF NOT EXISTS ai_editing_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES ai_editing_sessions(id) ON DELETE CASCADE,
  snapshot_name VARCHAR(100),
  action_description VARCHAR(255) NOT NULL,
  state_snapshot JSONB NOT NULL,
  step_number INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS Security
ALTER TABLE ai_editing_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_editing_layers ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_editing_history ENABLE ROW LEVEL SECURITY;
