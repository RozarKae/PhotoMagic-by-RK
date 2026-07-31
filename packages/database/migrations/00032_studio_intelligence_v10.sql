-- ========================================================
-- PhotoMagic Studio OS — Migration 00032: Studio Intelligence & Final Release V10
-- Phase 10.6 - 10.9: Portfolio Publisher, Revenue Reports, Business Insights, & Studio Final Dashboard
-- ========================================================

-- Phase 10.6 Portfolio Publications Table
CREATE TABLE IF NOT EXISTS portfolio_publications_v10 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    title TEXT NOT NULL,
    category VARCHAR(50) NOT NULL, -- wedding, pre_wedding, fashion, portrait, event
    cover_image_url TEXT NOT NULL,
    gallery_slug VARCHAR(100) UNIQUE NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    is_homepage_highlight BOOLEAN DEFAULT FALSE,
    publication_status VARCHAR(50) DEFAULT 'published', -- published, hidden, draft
    seo_meta_title TEXT,
    seo_meta_description TEXT,
    total_views INT DEFAULT 0,
    published_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Phase 10.7 Revenue Reports Table
CREATE TABLE IF NOT EXISTS revenue_reports_v10 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_period VARCHAR(50) NOT NULL, -- e.g. 2026-07, FY-2026-2027
    total_revenue_inr DECIMAL(12, 2) NOT NULL,
    collected_payments_inr DECIMAL(12, 2) NOT NULL,
    outstanding_balance_inr DECIMAL(12, 2) NOT NULL,
    average_project_value_inr DECIMAL(12, 2) NOT NULL,
    top_selling_package TEXT NOT NULL,
    total_bookings INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Phase 10.8 Business Insights Telemetry Table
CREATE TABLE IF NOT EXISTS business_insights_v10 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    snapshot_date DATE DEFAULT CURRENT_DATE,
    top_performing_service TEXT NOT NULL,
    peak_booking_month VARCHAR(50) NOT NULL,
    lead_conversion_rate DECIMAL(5, 2) DEFAULT 68.50,
    referral_success_rate DECIMAL(5, 2) DEFAULT 42.00,
    client_retention_rate DECIMAL(5, 2) DEFAULT 88.00,
    avg_editing_turnaround_hrs INT DEFAULT 36,
    avg_album_completion_days INT DEFAULT 7,
    storage_growth_gb DECIMAL(10, 2) DEFAULT 120.50,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Phase 10.9 Master Executive Dashboard Snapshot Table
CREATE TABLE IF NOT EXISTS final_executive_dashboard_v10 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    todays_overview_json JSONB NOT NULL,
    upcoming_events_json JSONB NOT NULL,
    revenue_snapshot_json JSONB NOT NULL,
    recent_clients_json JSONB NOT NULL,
    project_pipeline_json JSONB NOT NULL,
    pending_deliveries_json JSONB NOT NULL,
    system_health_json JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for fast search and portfolio query
CREATE INDEX IF NOT EXISTS idx_portfolio_slug ON portfolio_publications_v10(gallery_slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_status ON portfolio_publications_v10(publication_status);
