-- ========================================================
-- PhotoMagic Studio OS — Migration 00028: Delivery Archive V8
-- Phase 8.6 - 8.9: QR Sharing, Project Archival & Completion Checklist
-- ========================================================

CREATE TABLE IF NOT EXISTS delivery_qr_shares_v8 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    share_scope VARCHAR(50) DEFAULT 'entire_gallery', -- entire_gallery, albums, favorites, videos, downloads
    qr_code_svg TEXT,
    scan_count INT DEFAULT 0,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS project_archives_v8 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID UNIQUE NOT NULL,
    client_name TEXT NOT NULL,
    event_title TEXT NOT NULL,
    photo_count INT DEFAULT 0,
    video_count INT DEFAULT 0,
    storage_size_gb DECIMAL(8,2) DEFAULT 45.8,
    archive_status VARCHAR(50) DEFAULT 'archived', -- active, archived, cold_storage
    archived_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS delivery_completion_checklists_v8 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID UNIQUE NOT NULL,
    files_delivered BOOLEAN DEFAULT TRUE,
    client_downloaded BOOLEAN DEFAULT TRUE,
    album_approved BOOLEAN DEFAULT TRUE,
    payment_completed BOOLEAN DEFAULT TRUE,
    review_submitted BOOLEAN DEFAULT TRUE,
    archive_created BOOLEAN DEFAULT TRUE,
    completed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for fast search
CREATE INDEX IF NOT EXISTS idx_project_archives_status ON project_archives_v8(archive_status);
