-- ========================================================
-- PhotoMagic Studio OS — Migration 00027: Delivery Center V8
-- Phase 8.1 - 8.5: Smart Delivery, Watermark, High-Res & Video Platform
-- ========================================================

CREATE TABLE IF NOT EXISTS smart_delivery_links_v8 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    project_id UUID NOT NULL,
    link_token VARCHAR(100) UNIQUE NOT NULL,
    delivery_channel VARCHAR(50) DEFAULT 'private_gallery', -- private_gallery, secure_link, qr_code, whatsapp, sms
    password_hash TEXT,
    download_limit INT DEFAULT 100,
    download_count INT DEFAULT 0,
    expires_at TIMESTAMPTZ,
    watermark_enabled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS delivery_video_assets_v8 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    video_title TEXT NOT NULL,
    video_type VARCHAR(50) DEFAULT 'highlight_reel', -- wedding_film, highlight_reel, teaser, reels, drone_footage, raw_video
    resolution VARCHAR(50) DEFAULT '4k', -- 1080p, 4k, 8k
    stream_url TEXT NOT NULL,
    download_url TEXT NOT NULL,
    file_size_mb INT DEFAULT 1200,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS delivery_access_logs_v8 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    link_id UUID NOT NULL,
    ip_address VARCHAR(50),
    user_agent TEXT,
    action_type VARCHAR(50) DEFAULT 'download', -- view, download, stream
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for fast delivery link lookup
CREATE INDEX IF NOT EXISTS idx_delivery_link_token ON smart_delivery_links_v8(link_token);
CREATE INDEX IF NOT EXISTS idx_delivery_video_proj ON delivery_video_assets_v8(project_id);
