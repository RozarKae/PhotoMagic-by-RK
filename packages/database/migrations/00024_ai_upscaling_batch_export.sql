-- ========================================================
-- PhotoMagic Studio OS — Migration 00024: AI Upscaling, Batch & Export
-- Phase 4.7 - 4.9: Super-Resolution, Batch Processing & Export Center
-- ========================================================

CREATE TABLE IF NOT EXISTS ai_upscaling_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    image_url TEXT NOT NULL,
    scale_factor INT DEFAULT 4, -- 2, 4, 6, 8
    enhancement_mode VARCHAR(50) DEFAULT 'portrait_reconstruction', -- photo, portrait, landscape, architecture, low_res_recovery
    noise_reduction_level INT DEFAULT 50,
    face_reconstruction BOOLEAN DEFAULT TRUE,
    processed_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_batch_processing_queues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    batch_name TEXT NOT NULL,
    total_images INT DEFAULT 0,
    completed_images INT DEFAULT 0,
    failed_images INT DEFAULT 0,
    operations_list JSONB DEFAULT '[]', -- ['skin_retouch', 'color_match', 'upscale']
    status VARCHAR(50) DEFAULT 'processing', -- queued, processing, paused, completed, failed
    gpu_utilization_percent INT DEFAULT 42,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_export_packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID,
    export_format VARCHAR(50) DEFAULT 'jpeg', -- jpeg, png, webp, tiff, pdf, zip
    target_resolution VARCHAR(50) DEFAULT '4k', -- 1080p, 2k, 4k, 8k, original
    color_profile VARCHAR(50) DEFAULT 'sRGB', -- sRGB, Adobe RGB, ProPhoto RGB
    watermark_enabled BOOLEAN DEFAULT TRUE,
    download_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for fast queue status monitoring
CREATE INDEX IF NOT EXISTS idx_ai_upscaling_org ON ai_upscaling_jobs(organization_id);
CREATE INDEX IF NOT EXISTS idx_ai_batch_status ON ai_batch_processing_queues(status);
