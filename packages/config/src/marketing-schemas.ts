import { z } from 'zod';

export const createCampaignSchema = z.object({
  name: z.string().min(2, 'Campaign name is required'),
  channel: z.string().min(1, 'Channel is required'),
  budget: z.number().positive(),
});

export const createReferralPartnerSchema = z.object({
  name: z.string().min(2, 'Partner name is required'),
  category: z.string().min(1, 'Category is required'),
  commissionRate: z.number().min(0).max(100),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

export const createMessageTemplateSchema = z.object({
  title: z.string().min(2, 'Template title is required'),
  type: z.enum(['whatsapp', 'email']),
  triggerEvent: z.enum([
    'booking_confirmation',
    'quote_shared',
    'payment_reminder',
    'gallery_delivery',
  ]),
  bodyTemplate: z.string().min(5, 'Body template is required'),
});

export const submitCustomerReviewSchema = z.object({
  projectId: z.string().uuid().optional(),
  clientName: z.string().min(2, 'Client name is required'),
  rating: z.number().int().min(1).max(5),
  npsScore: z.number().int().min(0).max(10),
  testimonial: z.string().optional(),
});
