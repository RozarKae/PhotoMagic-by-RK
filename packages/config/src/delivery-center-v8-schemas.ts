import { z } from 'zod';

export const SmartDeliveryLinkV8Schema = z.object({
  linkToken: z.string().min(6),
  deliveryChannel: z.enum(['private_gallery', 'secure_link', 'qr_code', 'whatsapp', 'sms']),
  password: z.string().optional(),
  downloadLimit: z.number().min(1).default(100),
  expiresInDays: z.number().min(1).default(30),
  watermarkEnabled: z.boolean().default(false),
});

export const DeliveryVideoAssetV8Schema = z.object({
  videoTitle: z.string().min(2),
  videoType: z.enum(['wedding_film', 'highlight_reel', 'teaser', 'reels', 'drone_footage', 'raw_video']),
  resolution: z.enum(['1080p', '4k', '8k']),
  streamUrl: z.string().url(),
  downloadUrl: z.string().url(),
  fileSizeMb: z.number().min(1),
});

export type SmartDeliveryLinkV8 = z.infer<typeof SmartDeliveryLinkV8Schema>;
export type DeliveryVideoAssetV8 = z.infer<typeof DeliveryVideoAssetV8Schema>;
