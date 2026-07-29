-- ========================================================
-- PhotoMagic Studio OS — Migration 00029: Studio Workflow V9
-- Phase 9.1 - 9.5: Event Provisioning, AI Culling & Editor Assignments
-- ========================================================

CREATE TABLE IF NOT EXISTS studio_event_provisioning_v9 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_code VARCHAR(50) UNIQUE NOT NULL,
    client_name TEXT NOT NULL,
    event_type VARCHAR(50) DEFAULT 'wedding',
    event_date DATE NOT NULL,
    storage_allocated_gb INT DEFAULT 250,
    folder_structure_created BOOLEAN DEFAULT TRUE,
    workflow_stage VARCHAR(50) DEFAULT 'booking_confirmed',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_culling_jobs_v9 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    total_scanned INT DEFAULT 0,
    rejected_blur INT DEFAULT 0,
    rejected_closed_eyes INT DEFAULT 0,
    duplicates_grouped INT DEFAULT 0,
    approved_favorites INT DEFAULT 0,
    culling_status VARCHAR(50) DEFAULT 'completed',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS editor_task_assignments_v9 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    lead_editor_name TEXT,
    album_designer_name TEXT,
    retoucher_name TEXT,
    deadline_date DATE,
    priority_level VARCHAR(50) DEFAULT 'high', -- low, medium, high, urgent
    progress_percent INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for fast status lookup
CREATE INDEX IF NOT EXISTS idx_studio_event_stage ON studio_event_provisioning_v9(workflow_stage);
