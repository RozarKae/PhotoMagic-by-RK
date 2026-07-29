-- ========================================================
-- PhotoMagic Studio OS — Migration 00022: Album Studio Foundation
-- Phase 6.1 - 6.5: Professional Album Designer Workspace & Templates
-- ========================================================

CREATE TABLE IF NOT EXISTS album_studio_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    branch_id UUID,
    client_name TEXT NOT NULL,
    event_title TEXT NOT NULL,
    album_size VARCHAR(50) DEFAULT '12x18 Inches',
    total_pages INT DEFAULT 30,
    status VARCHAR(50) DEFAULT 'in_progress', -- in_progress, awaiting_approval, approved, ready_for_print, delivered
    cover_image_url TEXT,
    assigned_designer TEXT DEFAULT 'Master Album Designer',
    print_bleed_mm DECIMAL(4,2) DEFAULT 3.00,
    target_dpi INT DEFAULT 300,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS album_spread_layouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES album_studio_projects(id) ON DELETE CASCADE,
    spread_number INT NOT NULL,
    layout_style VARCHAR(50) DEFAULT 'luxury_full_bleed',
    left_page_json JSONB DEFAULT '{}',
    right_page_json JSONB DEFAULT '{}',
    is_locked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS album_template_presets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'wedding', -- wedding, pre_wedding, reception, birthday, corporate, fashion
    description TEXT,
    default_page_count INT DEFAULT 30,
    paper_type VARCHAR(50) DEFAULT 'Italian Velvet Lustre',
    layout_config JSONB DEFAULT '{}',
    is_studio_preset BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS album_designer_revisions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES album_studio_projects(id) ON DELETE CASCADE,
    version_number INT NOT NULL,
    change_summary TEXT NOT NULL,
    edited_by TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for fast search and status queries
CREATE INDEX IF NOT EXISTS idx_album_studio_org ON album_studio_projects(organization_id);
CREATE INDEX IF NOT EXISTS idx_album_studio_status ON album_studio_projects(status);
CREATE INDEX IF NOT EXISTS idx_album_spreads_project ON album_spread_layouts(project_id);
