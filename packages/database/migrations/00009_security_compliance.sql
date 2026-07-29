-- ==============================================================================
-- PHOTOMAGIC STUDIO OS - SECURITY, PERMISSIONS & COMPLIANCE SCHEMA (MIGRATION 00009)
-- Target Engine: PostgreSQL 15+ (Supabase Managed PostgreSQL)
-- ==============================================================================

-- Table: Security Audit Logs (Immutable Forensic Audit Trail)
CREATE TABLE IF NOT EXISTS security_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL, -- 'auth.login', 'payment.refund', 'data.export', 'permission.revoke'
  module VARCHAR(50) NOT NULL, -- 'auth', 'crm', 'finance', 'system'
  risk_level VARCHAR(20) NOT NULL DEFAULT 'low', -- 'low', 'medium', 'high', 'critical'
  ip_address VARCHAR(50),
  user_agent TEXT,
  previous_values JSONB,
  new_values JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: MFA Configurations (Multi-Factor Authentication Enrolment)
CREATE TABLE IF NOT EXISTS mfa_configurations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES user_profiles(id) ON DELETE CASCADE,
  totp_secret TEXT,
  backup_codes TEXT[],
  is_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: System Backups (Disaster Recovery & Snapshots)
CREATE TABLE IF NOT EXISTS system_backups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  snapshot_name VARCHAR(255) NOT NULL,
  r2_backup_key TEXT NOT NULL,
  size_bytes BIGINT NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'completed', -- 'in_progress', 'completed', 'failed'
  backup_type VARCHAR(50) NOT NULL DEFAULT 'automated', -- 'automated', 'manual'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: User Consents & Privacy (GDPR / CCPA Ledger)
CREATE TABLE IF NOT EXISTS user_consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  marketing_consent BOOLEAN NOT NULL DEFAULT FALSE,
  analytics_consent BOOLEAN NOT NULL DEFAULT TRUE,
  data_processing_agreed BOOLEAN NOT NULL DEFAULT TRUE,
  ip_address VARCHAR(50),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS Security
ALTER TABLE security_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE mfa_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_backups ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_consents ENABLE ROW LEVEL SECURITY;
