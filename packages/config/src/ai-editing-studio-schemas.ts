import { z } from 'zod';

export const AiObjectRemovalSchema = z.object({
  imageUrl: z.string().url(),
  selectionTool: z.enum(['brush', 'smart_lasso', 'rectangle', 'circle', 'magic_select', 'auto_detect']),
  qualityMode: z.enum(['fast', 'balanced', 'high_quality', 'maximum_quality']),
  targetType: z.enum(['people', 'photobombers', 'vehicles', 'wires', 'poles', 'trash', 'reflections', 'shadows']),
  preserveTexture: z.boolean().default(true),
});

export const AiSkinRetouchSchema = z.object({
  faceCount: z.number().min(1).max(20),
  skinSmoothing: z.number().min(0).max(100),
  blemishRemoval: z.number().min(0).max(100),
  wrinkleReduction: z.number().min(0).max(100),
  underEyeCorrection: z.number().min(0).max(100),
  teethWhitening: z.number().min(0).max(100),
  eyeEnhancement: z.number().min(0).max(100),
  beautyPreset: z.enum(['Natural', 'Studio', 'Luxury Editorial', 'Wedding', 'High Fashion']),
  opacity: z.number().min(0).max(100).default(100),
});

export const AiColorMatchingSchema = z.object({
  presetName: z.string().min(2),
  sceneType: z.enum(['indoor', 'outdoor', 'golden_hour', 'night', 'flash', 'studio', 'cloudy']),
  warmthShift: z.number().min(-100).max(100),
  tintShift: z.number().min(-100).max(100),
  presetCategory: z.enum(['Wedding Warm', 'Luxury Gold', 'Moody', 'Cinematic', 'Editorial', 'Natural', 'Vintage', 'Film', 'Premium Studio']),
});

export type AiObjectRemoval = z.infer<typeof AiObjectRemovalSchema>;
export type AiSkinRetouch = z.infer<typeof AiSkinRetouchSchema>;
export type AiColorMatching = z.infer<typeof AiColorMatchingSchema>;
