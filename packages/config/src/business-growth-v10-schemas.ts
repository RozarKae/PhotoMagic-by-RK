import { z } from 'zod';

export const ClientReferralV10Schema = z.object({
  id: z.string().optional(),
  referrerClientId: z.string().min(1),
  referrerName: z.string().min(1),
  referralCode: z.string().min(3),
  referralLink: z.string().url(),
  refereeName: z.string().optional(),
  refereeEmail: z.string().email().optional(),
  rewardType: z
    .enum(['credit_percentage', 'flat_discount', 'bonus_prints', 'free_session'])
    .default('credit_percentage'),
  rewardValue: z.number().default(10.0),
  status: z.enum(['pending', 'converted', 'rewarded', 'expired']).default('pending'),
  totalConversions: z.number().default(0),
});

export const StudioGiftCardV10Schema = z.object({
  id: z.string().optional(),
  cardCode: z.string().min(5),
  occasion: z.enum(['wedding', 'birthday', 'family', 'corporate', 'custom']),
  initialAmount: z.number().min(500),
  remainingBalance: z.number().min(0),
  senderName: z.string().min(1),
  recipientName: z.string().min(1),
  recipientEmail: z.string().email(),
  qrCodeToken: z.string().min(5),
  digitalDeliveryStatus: z.enum(['pending', 'sent', 'redeemed']).default('sent'),
  expiryDate: z.string(),
});

export const MarketingOfferV10Schema = z.object({
  id: z.string().optional(),
  promoCode: z.string().min(3),
  offerTitle: z.string().min(1),
  offerType: z.enum(['coupon', 'discount_code', 'seasonal_offer', 'early_bird', 'limited_time']),
  discountMode: z.enum(['percentage', 'flat_inr']).default('percentage'),
  discountValue: z.number().min(1),
  maxUsageLimit: z.number().default(100),
  currentUsageCount: z.number().default(0),
  minOrderValue: z.number().default(0),
  startDate: z.string(),
  expiryDate: z.string(),
  isActive: z.boolean().default(true),
});

export const ClientReviewV10Schema = z.object({
  id: z.string().optional(),
  projectId: z.string().min(1),
  clientName: z.string().min(1),
  projectTitle: z.string().min(1),
  starRating: z.number().min(1).max(5),
  writtenReview: z.string().min(5),
  photoUrls: z.array(z.string()).default([]),
  googleReviewSynced: z.boolean().default(false),
  moderationStatus: z
    .enum(['pending_moderation', 'approved', 'featured', 'rejected'])
    .default('pending_moderation'),
  socialSharesCount: z.number().default(0),
});

export const SocialSharePreviewV10Schema = z.object({
  id: z.string().optional(),
  projectId: z.string().min(1),
  platform: z.enum(['instagram', 'facebook', 'whatsapp', 'x', 'pinterest', 'threads']),
  previewImageUrl: z.string().url(),
  watermarkStyle: z
    .enum(['gold_monogram', 'minimalist_white', 'luxury_border'])
    .default('gold_monogram'),
  shareSlug: z.string().min(3),
  totalClicks: z.number().default(0),
});

export type ClientReferralV10 = z.infer<typeof ClientReferralV10Schema>;
export type StudioGiftCardV10 = z.infer<typeof StudioGiftCardV10Schema>;
export type MarketingOfferV10 = z.infer<typeof MarketingOfferV10Schema>;
export type ClientReviewV10 = z.infer<typeof ClientReviewV10Schema>;
export type SocialSharePreviewV10 = z.infer<typeof SocialSharePreviewV10Schema>;
