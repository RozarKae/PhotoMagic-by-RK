import { z } from 'zod';

export const colorGradingSchema = z.object({
  exposure: z.number().min(-5).max(5).default(0),
  contrast: z.number().min(-100).max(100).default(0),
  highlights: z.number().min(-100).max(100).default(0),
  shadows: z.number().min(-100).max(100).default(0),
  temperature: z.number().min(-100).max(100).default(0),
  tint: z.number().min(-100).max(100).default(0),
  vibrance: z.number().min(-100).max(100).default(0),
  presetLut: z.string().default('Luxury Wedding'),
});

export const portraitRetouchSchema = z.object({
  skinSmoothing: z.number().min(0).max(100).default(35),
  blemishRemoval: z.number().min(0).max(100).default(80),
  teethWhitening: z.number().min(0).max(100).default(25),
  eyeEnhancement: z.number().min(0).max(100).default(40),
  faceLighting: z.number().min(0).max(100).default(30),
});

export const saveEditSnapshotSchema = z.object({
  sessionId: z.string().min(1, 'Session ID is required'),
  snapshotName: z.string().min(2, 'Snapshot name is required'),
  colorGrading: colorGradingSchema,
  retouching: portraitRetouchSchema,
});
