import { z } from 'zod';

export const DeliveryQrShareV8Schema = z.object({
  shareScope: z.enum(['entire_gallery', 'albums', 'favorites', 'videos', 'downloads']),
  expiresInDays: z.number().min(1).default(30),
});

export const ProjectArchiveV8Schema = z.object({
  clientName: z.string().min(1),
  eventTitle: z.string().min(1),
  photoCount: z.number().min(0),
  videoCount: z.number().min(0),
  storageSizeGb: z.number().min(0),
  archiveStatus: z.enum(['active', 'archived', 'cold_storage']),
});

export const DeliveryCompletionChecklistV8Schema = z.object({
  filesDelivered: z.boolean().default(true),
  clientDownloaded: z.boolean().default(true),
  albumApproved: z.boolean().default(true),
  paymentCompleted: z.boolean().default(true),
  reviewSubmitted: z.boolean().default(true),
  archiveCreated: z.boolean().default(true),
});

export type DeliveryQrShareV8 = z.infer<typeof DeliveryQrShareV8Schema>;
export type ProjectArchiveV8 = z.infer<typeof ProjectArchiveV8Schema>;
export type DeliveryCompletionChecklistV8 = z.infer<typeof DeliveryCompletionChecklistV8Schema>;
