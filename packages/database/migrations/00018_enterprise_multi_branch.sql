-- ==============================================================================
-- PHOTOMAGIC STUDIO OS - MULTI-BRANCH & ENTERPRISE MANAGEMENT SCHEMA (MIGRATION 00018)
-- Target Engine: PostgreSQL 15+ (Supabase Managed PostgreSQL)
-- ==============================================================================

-- Table: Organizations (Master Enterprise Tenant)
CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  head_office_city VARCHAR(100) NOT NULL DEFAULT 'Udaipur',
  head_office_country VARCHAR(100) NOT NULL DEFAULT 'India',
  corporate_currency VARCHAR(10) NOT NULL DEFAULT 'INR',
  tax_registration_no VARCHAR(100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Branches (Multi-Branch & Franchise Network)
CREATE TABLE IF NOT EXISTS branches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  branch_code VARCHAR(20) NOT NULL UNIQUE, -- 'UDPR-01', 'MUMB-02', 'DXB-03', 'LDN-04'
  name VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  timezone VARCHAR(50) NOT NULL DEFAULT 'Asia/Kolkata',
  currency VARCHAR(10) NOT NULL DEFAULT 'INR',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  manager_user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Enterprise Departments
CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL, -- 'Photography', 'Post-Production', 'Sales', 'Finance'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Employees (Enterprise Staff Directory)
CREATE TABLE IF NOT EXISTS employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
  user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  employee_code VARCHAR(50) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'photographer',
  status VARCHAR(30) NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Equipment Inventory (Enterprise Asset Vault)
CREATE TABLE IF NOT EXISTS equipment_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  asset_code VARCHAR(50) NOT NULL UNIQUE,
  category VARCHAR(50) NOT NULL, -- 'camera', 'lens', 'drone', 'lighting'
  name VARCHAR(255) NOT NULL,
  serial_number VARCHAR(100) NOT NULL,
  qr_code_key TEXT,
  status VARCHAR(30) NOT NULL DEFAULT 'available', -- 'available', 'assigned', 'maintenance', 'in_transfer'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Branch Transfers (Inter-Branch Asset & Equipment Transfer Log)
CREATE TABLE IF NOT EXISTS branch_transfers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  to_branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  equipment_id UUID NOT NULL REFERENCES equipment_inventory(id) ON DELETE CASCADE,
  transfer_status VARCHAR(30) NOT NULL DEFAULT 'pending', -- 'pending', 'in_transit', 'completed', 'cancelled'
  requested_by_user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  transferred_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS Security
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE branch_transfers ENABLE ROW LEVEL SECURITY;
