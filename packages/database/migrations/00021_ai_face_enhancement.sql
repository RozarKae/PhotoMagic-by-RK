-- ==============================================================================
-- PHOTOMAGIC STUDIO OS - AI FACE ENHANCEMENT ENGINE SCHEMA (MIGRATION 00021)
-- Target Engine: PostgreSQL 15+ (Supabase Managed PostgreSQL)
-- ==============================================================================

-- Table: Face Detection Results (Single & Multi-Face Bounds)
CREATE TABLE IF NOT EXISTS face_detection_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES editing_sessions(id) ON DELETE CASCADE,
  face_count INTEGER NOT NULL DEFAULT 1,
  faces_metadata JSONB NOT NULL DEFAULT '[]', -- Bounding boxes, confidence score, estimated age, emotion
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Facial Landmarks (68-Point Mesh Coordinates)
CREATE TABLE IF NOT EXISTS face_landmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  detection_id UUID NOT NULL REFERENCES face_detection_results(id) ON DELETE CASCADE,
  face_index INTEGER NOT NULL DEFAULT 0,
  landmarks_68pt JSONB NOT NULL DEFAULT '[]', -- Landmark (x,y) coordinates for eyes, nose, mouth, jawline
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Face Enhancement Presets & Adjustments
CREATE TABLE IF NOT EXISTS face_enhancement_presets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  preset_name VARCHAR(100) NOT NULL, -- 'Natural Bride', 'Groom Sharpness', 'High-Fashion Editorial'
  master_strength INTEGER NOT NULL DEFAULT 75, -- 0 to 100
  skin_smoothing INTEGER NOT NULL DEFAULT 60,
  blemish_removal INTEGER NOT NULL DEFAULT 85,
  eye_brightening INTEGER NOT NULL DEFAULT 40,
  lip_enhancement INTEGER NOT NULL DEFAULT 30,
  teeth_whitening INTEGER NOT NULL DEFAULT 35,
  face_relighting INTEGER NOT NULL DEFAULT 25,
  is_default BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Face Processing Batches (Multi-Face Group Portrait Queue)
CREATE TABLE IF NOT EXISTS face_processing_batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES editing_sessions(id) ON DELETE CASCADE,
  preset_id UUID REFERENCES face_enhancement_presets(id) ON DELETE SET NULL,
  total_faces INTEGER NOT NULL DEFAULT 1,
  gpu_accelerated BOOLEAN NOT NULL DEFAULT TRUE,
  status VARCHAR(30) NOT NULL DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS Security
ALTER TABLE face_detection_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE face_landmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE face_enhancement_presets ENABLE ROW LEVEL SECURITY;
ALTER TABLE face_processing_batches ENABLE ROW LEVEL SECURITY;
