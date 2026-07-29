-- ========================================================
-- PhotoMagic Studio OS — Migration 00023: AI Editing Studio
-- Phase 4.4 - 4.6: Object Removal, Skin Retouch & Color Matching
-- ========================================================

CREATE TABLE IF NOT EXISTS ai_object_removal_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    image_url TEXT NOT NULL,
    mask_svg TEXT,
    selection_tool VARCHAR(50) DEFAULT 'smart_brush', -- brush, smart_lasso, rectangle, magic_select, auto_detect
    removal_target VARCHAR(50) DEFAULT 'photobomber', -- people, photobomber, wire, pole, trash, reflection
    quality_mode VARCHAR(50) DEFAULT 'maximum_quality', -- fast, balanced, high_quality, maximum_quality
    processed_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_skin_retouch_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_id UUID,
    face_count INT DEFAULT 1,
    skin_smoothing INT DEFAULT 45,
    blemish_removal INT DEFAULT 80,
    wrinkle_reduction INT DEFAULT 30,
    under_eye_correction INT DEFAULT 50,
    teeth_whitening INT DEFAULT 40,
    eye_enhancement INT DEFAULT 60,
    beauty_preset VARCHAR(50) DEFAULT 'Luxury Editorial', -- Natural, Studio, Luxury Editorial, Wedding, High Fashion
    preserve_texture BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_color_matching_presets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    preset_name TEXT NOT NULL,
    scene_type VARCHAR(50) DEFAULT 'golden_hour', -- indoor, outdoor, golden_hour, night, flash, studio
    color_grading_lut TEXT,
    reference_image_url TEXT,
    warmth_shift INT DEFAULT 15,
    tint_shift INT DEFAULT -5,
    is_custom BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for fast search and job status queries
CREATE INDEX IF NOT EXISTS idx_ai_object_removal_org ON ai_object_removal_jobs(organization_id);
CREATE INDEX IF NOT EXISTS idx_ai_skin_retouch_img ON ai_skin_retouch_profiles(image_id);
