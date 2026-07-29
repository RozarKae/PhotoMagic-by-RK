-- ==============================================================================
-- PHOTOMAGIC STUDIO OS - AI BUSINESS INTELLIGENCE SCHEMA (MIGRATION 00016)
-- Target Engine: PostgreSQL 15+ (Supabase Managed PostgreSQL)
-- ==============================================================================

-- Table: Analytics Snapshots (Daily & Monthly Aggregates)
CREATE TABLE IF NOT EXISTS analytics_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  snapshot_date DATE NOT NULL,
  total_revenue_usd DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  net_profit_usd DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  total_bookings INTEGER NOT NULL DEFAULT 0,
  active_projects INTEGER NOT NULL DEFAULT 0,
  customer_satisfaction_score DECIMAL(3, 2) NOT NULL DEFAULT 4.90,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Business Predictions & AI Advisor Recommendations
CREATE TABLE IF NOT EXISTS business_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL, -- 'pricing', 'capacity', 'leads', 'retention'
  title VARCHAR(255) NOT NULL,
  priority VARCHAR(20) NOT NULL DEFAULT 'high', -- 'low', 'medium', 'high', 'critical'
  expected_impact_usd DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  confidence_score_percent INTEGER NOT NULL DEFAULT 95,
  suggested_action TEXT NOT NULL,
  is_dismissed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: KPI Metrics (Target vs Actual Ledger)
CREATE TABLE IF NOT EXISTS kpi_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  metric_name VARCHAR(100) NOT NULL,
  target_value DECIMAL(12, 2) NOT NULL,
  actual_value DECIMAL(12, 2) NOT NULL,
  period_month VARCHAR(20) NOT NULL, -- '2026-07'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS Security
ALTER TABLE analytics_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE kpi_metrics ENABLE ROW LEVEL SECURITY;
