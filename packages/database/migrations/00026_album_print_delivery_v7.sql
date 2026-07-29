-- ========================================================
-- PhotoMagic Studio OS — Migration 00026: Album Print & Delivery V7
-- Phase 7.6 - 7.9: Print Lab Packages, Revision History & Delivery
-- ========================================================

CREATE TABLE IF NOT EXISTS album_print_lab_packages_v7 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    lab_preset VARCHAR(50) DEFAULT 'graphistudio', -- whcc, graphistudio, millers_lab, fuji_print_lab
    dpi_resolution INT DEFAULT 300, -- 300, 600
    color_space VARCHAR(50) DEFAULT 'CMYK', -- sRGB, Adobe RGB, CMYK, ProPhoto RGB
    cover_artwork_url TEXT,
    spine_artwork_url TEXT,
    instructions_text TEXT,
    package_zip_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS album_revision_history_v7 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    version_number INT NOT NULL,
    designer_name TEXT NOT NULL,
    change_summary TEXT NOT NULL,
    snapshot_json JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS album_delivery_certificates_v7 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    certificate_code VARCHAR(100) UNIQUE NOT NULL,
    client_name TEXT NOT NULL,
    delivery_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    archive_status VARCHAR(50) DEFAULT 'active' -- active, archived
);

-- Indexing for fast project lookup
CREATE INDEX IF NOT EXISTS idx_album_lab_pkg_proj ON album_print_lab_packages_v7(project_id);
CREATE INDEX IF NOT EXISTS idx_album_revision_proj ON album_revision_history_v7(project_id);
