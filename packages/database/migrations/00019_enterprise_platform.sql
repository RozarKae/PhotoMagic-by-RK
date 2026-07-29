-- ==============================================================================
-- PHOTOMAGIC STUDIO OS - ENTERPRISE PLATFORM SCHEMA (MIGRATION 00019)
-- Target Engine: PostgreSQL 15+ (Supabase Managed PostgreSQL)
-- ==============================================================================

-- Table: Tenants (Multi-Tenant Organization Accounts)
CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  custom_domain VARCHAR(255) UNIQUE,
  white_label_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  branding_config JSONB NOT NULL DEFAULT '{"primaryColor": "#D4AF37", "theme": "dark"}',
  status VARCHAR(30) NOT NULL DEFAULT 'active', -- 'trial', 'active', 'suspended', 'cancelled'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Subscription Plans
CREATE TABLE IF NOT EXISTS subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_code VARCHAR(50) NOT NULL UNIQUE, -- 'starter', 'pro', 'studio', 'enterprise'
  name VARCHAR(100) NOT NULL,
  monthly_price_usd DECIMAL(10, 2) NOT NULL,
  ai_credits_per_month INTEGER NOT NULL DEFAULT 5000,
  storage_limit_gb INTEGER NOT NULL DEFAULT 1000,
  features_json JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Subscriptions (Tenant Subscriptions)
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES subscription_plans(id) ON DELETE RESTRICT,
  status VARCHAR(30) NOT NULL DEFAULT 'active',
  current_period_start TIMESTAMPTZ NOT NULL DEFAULT now(),
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Developer API Keys
CREATE TABLE IF NOT EXISTS api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  key_name VARCHAR(100) NOT NULL,
  api_key_hash VARCHAR(255) NOT NULL UNIQUE,
  permissions TEXT[] DEFAULT '{"read", "write"}',
  last_used_at TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Plugins & Extensions Registry
CREATE TABLE IF NOT EXISTS plugins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plugin_code VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL DEFAULT 'ai_tools', -- 'ai_tools', 'crm_extension', 'workflow_preset'
  description TEXT,
  version VARCHAR(30) NOT NULL DEFAULT '1.0.0',
  author VARCHAR(100) NOT NULL DEFAULT 'PhotoMagic Labs',
  is_verified BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Marketplace Items
CREATE TABLE IF NOT EXISTS marketplace_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  item_type VARCHAR(50) NOT NULL DEFAULT 'lut_pack', -- 'lut_pack', 'album_template', 'workflow_preset', 'ai_prompt_pack'
  price_usd DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  rating DECIMAL(3, 2) NOT NULL DEFAULT 5.0,
  download_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS Security
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE plugins ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_items ENABLE ROW LEVEL SECURITY;
