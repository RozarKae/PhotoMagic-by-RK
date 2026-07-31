-- ========================================================
-- PhotoMagic Studio OS — Migration 00030: Studio Workflow Completion V9
-- Phase 9.6 - 9.9: Client Notifications, Deadline Manager, Studio Calendar, & Executive Dashboard
-- ========================================================

-- Phase 9.6 Client Notifications Table
CREATE TABLE IF NOT EXISTS client_notifications_v9 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    client_name TEXT NOT NULL,
    client_contact TEXT NOT NULL, -- Email, Phone, or WhatsApp ID
    trigger_event VARCHAR(50) NOT NULL, -- booking_confirmation, payment_received, gallery_ready, album_ready, revision_requested, album_approved, printing_started, delivery_ready, review_request
    channels TEXT[] NOT NULL DEFAULT ARRAY['email', 'in_app'], -- email, sms, whatsapp, in_app
    notification_status VARCHAR(50) DEFAULT 'delivered', -- pending, sent, delivered, failed
    message_body TEXT,
    sent_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Phase 9.7 Deadline Manager Table
CREATE TABLE IF NOT EXISTS studio_deadlines_v9 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    project_name TEXT NOT NULL,
    task_name TEXT NOT NULL,
    assignee_name TEXT NOT NULL,
    assignee_role VARCHAR(50) DEFAULT 'editor', -- photographer, editor, album_designer, printer, delivery_manager
    due_date DATE NOT NULL,
    priority_level VARCHAR(50) DEFAULT 'high', -- low, medium, high, urgent
    status VARCHAR(50) DEFAULT 'pending', -- pending, in_progress, review_needed, overdue, completed
    sla_hours_remaining INT DEFAULT 48,
    is_escalated BOOLEAN DEFAULT FALSE,
    reminder_sent_count INT DEFAULT 0,
    ical_sync_token VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Phase 9.8 Unified Studio Calendar Table
CREATE TABLE IF NOT EXISTS studio_calendar_events_v9 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_title TEXT NOT NULL,
    event_type VARCHAR(50) NOT NULL, -- booking, shoot, editing_schedule, album_deadline, print_schedule, delivery, holiday, staff_availability
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    photographer_name TEXT,
    editor_name TEXT,
    event_status VARCHAR(50) DEFAULT 'scheduled', -- scheduled, in_progress, completed, postponed, cancelled
    location TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Phase 9.9 Executive Workflow Dashboard Snapshots Table
CREATE TABLE IF NOT EXISTS workflow_dashboard_metrics_v9 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    snapshot_date DATE DEFAULT CURRENT_DATE,
    active_projects_count INT DEFAULT 0,
    todays_tasks_count INT DEFAULT 0,
    pending_reviews_count INT DEFAULT 0,
    editing_queue_count INT DEFAULT 0,
    album_queue_count INT DEFAULT 0,
    delivery_queue_count INT DEFAULT 0,
    revenue_snapshot_inr DECIMAL(12, 2) DEFAULT 0.00,
    upcoming_events_count INT DEFAULT 0,
    storage_usage_gb DECIMAL(10, 2) DEFAULT 0.00,
    performance_latency_ms INT DEFAULT 120,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for high-performance scheduling and notifications query
CREATE INDEX IF NOT EXISTS idx_notifications_trigger ON client_notifications_v9(trigger_event);
CREATE INDEX IF NOT EXISTS idx_deadlines_due_date ON studio_deadlines_v9(due_date);
CREATE INDEX IF NOT EXISTS idx_calendar_events_type ON studio_calendar_events_v9(event_type);
CREATE INDEX IF NOT EXISTS idx_calendar_start_time ON studio_calendar_events_v9(start_time);
