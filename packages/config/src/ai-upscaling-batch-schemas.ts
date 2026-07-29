import { z } from 'zod';

export const AiUpscalingSchema = z.object({
  imageUrl: z.string().url(),
  scaleFactor: z.enum(['2x', '4x', '6x', '8x', 'custom']),
  enhancementMode: z.enum(['photo', 'portrait', 'landscape', 'architecture', 'artwork', 'low_res_recovery']),
  faceReconstruction: z.boolean().default(true),
  fabricDetailRecovery: z.boolean().default(true),
  noiseReductionLevel: z.number().min(0).max(100).default(50),
});

export const AiBatchProcessingSchema = z.object({
  batchName: z.string().min(2),
  totalImages: z.number().min(1),
  operations: z.array(z.enum(['background_removal', 'object_removal', 'skin_retouch', 'color_match', 'upscaling', 'watermark'])),
  gpuAcceleration: z.boolean().default(true),
});

export const AiExportCenterSchema = z.object({
  exportFormat: z.enum(['jpeg', 'png', 'webp', 'tiff', 'pdf', 'zip']),
  outputQuality: z.enum(['low', 'medium', 'high', 'maximum', 'print_ready']),
  resolution: z.enum(['original', '1080p', '2k', '4k', '8k']),
  colorProfile: z.enum(['sRGB', 'Adobe RGB', 'ProPhoto RGB']),
  watermarkEnabled: z.boolean().default(true),
  watermarkText: z.string().default('PhotoMagic Studio © 2026'),
});

export type AiUpscaling = z.infer<typeof AiUpscalingSchema>;
export type AiBatchProcessing = z.infer<typeof AiBatchProcessingSchema>;
export type AiExportCenter = z.infer<typeof AiExportCenterSchema>;
