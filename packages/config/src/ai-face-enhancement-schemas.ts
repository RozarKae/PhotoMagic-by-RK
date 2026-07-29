import { z } from 'zod';

export const faceEnhancementControlSchema = z.object({
  sessionId: z.string().min(1, 'Session ID is required'),
  masterStrength: z.number().min(0).max(100).default(75),
  skinSmoothing: z.number().min(0).max(100).default(60),
  blemishRemoval: z.number().min(0).max(100).default(85),
  eyeBrightening: z.number().min(0).max(100).default(40),
  lipEnhancement: z.number().min(0).max(100).default(30),
  teethWhitening: z.number().min(0).max(100).default(35),
  faceRelighting: z.number().min(0).max(100).default(25),
  preserveIdentity: z.boolean().default(true),
  gpuAccelerated: z.boolean().default(true),
});

export const createFacePresetSchema = z.object({
  presetName: z.string().min(2, 'Preset name is required'),
  masterStrength: z.number().min(0).max(100).default(75),
  skinSmoothing: z.number().min(0).max(100).default(60),
  blemishRemoval: z.number().min(0).max(100).default(85),
});
