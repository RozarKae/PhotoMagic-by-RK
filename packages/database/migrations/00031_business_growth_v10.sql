-- ========================================================
-- PhotoMagic Studio OS — Migration 00031: Business Growth V10
-- Phase 10.1 - 10.5: Referrals, Gift Cards, Offers, Reviews, & Social Share Generator
-- ========================================================

-- Phase 10.1 Client Referrals Table
CREATE TABLE IF NOT EXISTS client_referrals_v10 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referrer_client_id UUID NOT NULL,
    referrer_name TEXT NOT NULL,
    referral_code VARCHAR(50) UNIQUE NOT NULL,
    referral_link TEXT NOT NULL,
    referee_name TEXT,
    referee_email TEXT,
    reward_type VARCHAR(50) DEFAULT 'credit_percentage', -- credit_percentage, flat_discount, bonus_prints, free_session
    reward_value DECIMAL(10, 2) DEFAULT 10.00,
    status VARCHAR(50) DEFAULT 'pending', -- pending, converted, rewarded, expired
    total_conversions INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Phase 10.2 Studio Gift Cards Table
CREATE TABLE IF NOT EXISTS studio_gift_cards_v10 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    card_code VARCHAR(50) UNIQUE NOT NULL,
    occasion VARCHAR(50) NOT NULL, -- wedding, birthday, family, corporate, custom
    initial_amount DECIMAL(12, 2) NOT NULL,
    remaining_balance DECIMAL(12, 2) NOT NULL,
    sender_name TEXT NOT NULL,
    recipient_name TEXT NOT NULL,
    recipient_email TEXT NOT NULL,
    qr_code_token VARCHAR(100) NOT NULL,
    digital_delivery_status VARCHAR(50) DEFAULT 'sent', -- pending, sent, redeemed
    expiry_date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Phase 10.3 Studio Marketing Offers Table
CREATE TABLE IF NOT EXISTS marketing_offers_v10 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    promo_code VARCHAR(50) UNIQUE NOT NULL,
    offer_title TEXT NOT NULL,
    offer_type VARCHAR(50) NOT NULL, -- coupon, discount_code, seasonal_offer, early_bird, limited_time
    discount_mode VARCHAR(50) DEFAULT 'percentage', -- percentage, flat_inr
    discount_value DECIMAL(10, 2) NOT NULL,
    max_usage_limit INT DEFAULT 100,
    current_usage_count INT DEFAULT 0,
    min_order_value DECIMAL(12, 2) DEFAULT 0.00,
    start_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Phase 10.4 Post-Delivery Client Reviews Table
CREATE TABLE IF NOT EXISTS client_reviews_v10 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    client_name TEXT NOT NULL,
    project_title TEXT NOT NULL,
    star_rating INT CHECK (star_rating >= 1 AND star_rating <= 5),
    written_review TEXT NOT NULL,
    photo_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
    google_review_synced BOOLEAN DEFAULT FALSE,
    moderation_status VARCHAR(50) DEFAULT 'pending_moderation', -- pending_moderation, approved, featured, rejected
    social_shares_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Phase 10.5 Branded Social Share Previews Table
CREATE TABLE IF NOT EXISTS social_share_previews_v10 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    platform VARCHAR(50) NOT NULL, -- instagram, facebook, whatsapp, x, pinterest, threads
    preview_image_url TEXT NOT NULL,
    watermark_style VARCHAR(50) DEFAULT 'gold_monogram', -- gold_monogram, minimalist_white, luxury_border
    share_slug VARCHAR(100) UNIQUE NOT NULL,
    total_clicks INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for fast search and analytics
CREATE INDEX IF NOT EXISTS idx_referral_code ON client_referrals_v10(referral_code);
CREATE INDEX IF NOT EXISTS idx_gift_card_code ON studio_gift_cards_v10(card_code);
CREATE INDEX IF NOT EXISTS idx_offer_promo_code ON marketing_offers_v10(promo_code);
CREATE INDEX IF NOT EXISTS idx_review_status ON client_reviews_v10(moderation_status);
