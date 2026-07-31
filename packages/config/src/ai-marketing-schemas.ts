import { z } from 'zod';

export const generateSocialCopySchema = z.object({
  platform: z
    .enum(['instagram', 'facebook', 'twitter', 'linkedin', 'youtube'])
    .default('instagram'),
  topic: z.string().min(3, 'Topic or prompt is required'),
  tone: z.enum(['luxury', 'editorial', 'emotional', 'playful', 'promotional']).default('luxury'),
  includeHashtags: z.boolean().default(true),
  callToAction: z.string().optional(),
});

export const createMarketingCampaignSchema = z.object({
  title: z.string().min(2, 'Campaign title is required'),
  campaignType: z
    .enum(['social_media', 'email_newsletter', 'poster_promo', 'meta_ads'])
    .default('social_media'),
  targetAudience: z.string().default('Luxury Brides & Couples'),
  budgetUsd: z.number().positive().default(500),
});

export const scheduleCalendarPostSchema = z.object({
  postId: z.string().min(1, 'Post ID is required'),
  scheduledDate: z.string().min(1, 'Scheduled date is required'),
  timeSlot: z.string().default('18:00'),
});
