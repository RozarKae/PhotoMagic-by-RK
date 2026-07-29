-- ========================================================
-- PhotoMagic Studio OS — Migration 00025: Album Studio V7
-- Phase 7.1 - 7.5: AI Layout, Cover Designer & Approval Workflow
-- ========================================================

CREATE TABLE IF NOT EXISTS album_covers_v7 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    cover_material VARCHAR(50) DEFAULT 'leather', -- leather, velvet, fabric, acrylic, metal, wood, canvas
    cover_title TEXT DEFAULT 'Eleanor & Julian',
    client_names TEXT DEFAULT 'Eleanor Vance & Julian Montgomery',
    event_date TEXT DEFAULT 'July 15, 2026',
    foil_color VARCHAR(50) DEFAULT '24k_gold', -- 24k_gold, rose_gold, silver, copper, blind_emboss
    spine_text TEXT DEFAULT 'ELEANOR & JULIAN • UDAIPUR 2026',
    embossing_style VARCHAR(50) DEFAULT 'debossed_foil',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS album_approval_workflows_v7 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    stage VARCHAR(50) DEFAULT 'draft', -- draft, sent_for_review, client_reviewing, revision_requested, designer_updating, final_approval, locked_for_print
    revision_count INT DEFAULT 0,
    approved_by_client BOOLEAN DEFAULT FALSE,
    locked_for_print BOOLEAN DEFAULT FALSE,
    approved_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS album_page_annotations_v7 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    spread_number INT NOT NULL,
    pin_x_percent DECIMAL(5,2),
    pin_y_percent DECIMAL(5,2),
    comment_text TEXT NOT NULL,
    author_name TEXT NOT NULL,
    is_resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for fast status & workflow queries
CREATE INDEX IF NOT EXISTS idx_album_covers_proj ON album_covers_v7(project_id);
CREATE INDEX IF NOT EXISTS idx_album_workflow_stage ON album_approval_workflows_v7(stage);
