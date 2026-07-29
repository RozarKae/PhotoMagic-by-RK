-- ==============================================================================
-- PHOTOMAGIC STUDIO OS - STUDIO AUTOMATION & WORKFLOW ENGINE SCHEMA (MIGRATION 00017)
-- Target Engine: PostgreSQL 15+ (Supabase Managed PostgreSQL)
-- ==============================================================================

-- Table: Automation Workflows (Master Flow Definitions)
CREATE TABLE IF NOT EXISTS automation_workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  trigger_type VARCHAR(100) NOT NULL, -- 'lead.received', 'booking.confirmed', 'payment.success', 'album.approved', 'cron.scheduled'
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  version INTEGER NOT NULL DEFAULT 1,
  execution_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Workflow Nodes (Visual Node Graph Topology)
CREATE TABLE IF NOT EXISTS workflow_nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES automation_workflows(id) ON DELETE CASCADE,
  node_key VARCHAR(100) NOT NULL,
  node_type VARCHAR(50) NOT NULL, -- 'trigger', 'condition', 'action', 'ai_processing', 'approval', 'delay'
  title VARCHAR(255) NOT NULL,
  config JSONB NOT NULL DEFAULT '{}',
  position_x DECIMAL(8, 2) NOT NULL DEFAULT 0.00,
  position_y DECIMAL(8, 2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Workflow Edges (Graph Connections)
CREATE TABLE IF NOT EXISTS workflow_edges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES automation_workflows(id) ON DELETE CASCADE,
  source_node_id UUID NOT NULL REFERENCES workflow_nodes(id) ON DELETE CASCADE,
  target_node_id UUID NOT NULL REFERENCES workflow_nodes(id) ON DELETE CASCADE,
  condition_label VARCHAR(100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Workflow Runs (Execution History & Log Telemetry)
CREATE TABLE IF NOT EXISTS workflow_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES automation_workflows(id) ON DELETE CASCADE,
  status VARCHAR(30) NOT NULL DEFAULT 'running', -- 'running', 'completed', 'failed', 'cancelled'
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  duration_ms INTEGER,
  error_details TEXT
);

-- Table: Approval Requests (Multi-Level Approval Queue)
CREATE TABLE IF NOT EXISTS approval_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  request_type VARCHAR(50) NOT NULL, -- 'quotation', 'invoice', 'album', 'refund'
  title VARCHAR(255) NOT NULL,
  requested_by_user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  assigned_approver_role VARCHAR(50) NOT NULL DEFAULT 'studio_owner',
  status VARCHAR(30) NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS Security
ALTER TABLE automation_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_edges ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE approval_requests ENABLE ROW LEVEL SECURITY;
