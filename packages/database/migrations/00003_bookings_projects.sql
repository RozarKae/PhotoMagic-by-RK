-- ==============================================================================
-- PHOTOMAGIC STUDIO OS - BOOKINGS & PROJECTS ENGINE SCHEMA (MIGRATION 00003)
-- Target Engine: PostgreSQL 15+ (Supabase Managed PostgreSQL)
-- ==============================================================================

-- Custom Enum Types for Bookings & Projects
CREATE TYPE booking_status_enum AS ENUM ('draft', 'quotation_sent', 'contract_pending', 'confirmed', 'cancelled');

-- Table: Bookings
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  package_name VARCHAR(255) NOT NULL,
  total_amount DECIMAL(12, 2) NOT NULL,
  deposit_amount DECIMAL(12, 2) NOT NULL,
  deposit_paid BOOLEAN NOT NULL DEFAULT FALSE,
  contract_signed BOOLEAN NOT NULL DEFAULT FALSE,
  status booking_status_enum NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  version INTEGER NOT NULL DEFAULT 1
);

-- Table: Projects (Production Projects initialized upon booking confirmation)
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  booking_id UUID UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
  client_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  status project_status_enum NOT NULL DEFAULT 'confirmed',
  event_date DATE NOT NULL,
  location VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  version INTEGER NOT NULL DEFAULT 1
);

-- Table: Project Assignments (Staff & Crew assignment)
CREATE TABLE IF NOT EXISTS project_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  assignment_role VARCHAR(50) NOT NULL, -- e.g. 'lead_photographer', 'second_shooter', 'editor'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(project_id, user_id, assignment_role)
);

-- Indexes for Calendar Queries & Conflict Detection
CREATE INDEX IF NOT EXISTS idx_projects_workspace_event_date ON projects(workspace_id, event_date);
CREATE INDEX IF NOT EXISTS idx_bookings_workspace_status ON bookings(workspace_id, status);

-- Enable RLS Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_assignments ENABLE ROW LEVEL SECURITY;
