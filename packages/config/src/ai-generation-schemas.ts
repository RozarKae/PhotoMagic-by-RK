import { z } from 'zod';

export const cameraSimulationSchema = z.object({
  brand: z.enum(['Sony', 'Canon', 'Nikon', 'Fujifilm', 'Leica', 'RED', 'ARRI']).default('Leica'),
  lens: z.enum(['24mm', '35mm', '50mm', '85mm', '135mm', '200mm']).default('50mm'),
  aperture: z.enum(['f1.2', 'f1.4', 'f1.8', 'f2.8', 'f4', 'f5.6']).default('f1.4'),
  lighting: z
    .enum([
      'Golden Hour',
      'Softbox',
      'Studio',
      'Natural',
      'Sunset',
      'Neon',
      'Backlight',
      'Rim Light',
    ])
    .default('Golden Hour'),
});

export const generatePhotoBatchSchema = z.object({
  prompt: z.string().min(3, 'Prompt is required'),
  negativePrompt: z.string().optional(),
  provider: z
    .enum(['openai', 'gemini', 'stability', 'flux', 'ideogram', 'replicate', 'fal'])
    .default('flux'),
  modelId: z.string().default('flux-1.1-pro'),
  aspectRatio: z.enum(['1:1', '16:9', '9:16', '4:3', '3:2']).default('16:9'),
  batchSize: z.enum(['1', '2', '4', '8', '16']).default('4'),
  seed: z.number().int().optional(),
  camera: cameraSimulationSchema,
  presetStyle: z.string().default('Wedding Luxury'),
});

export const createCustomPresetSchema = z.object({
  name: z.string().min(2, 'Preset name is required'),
  category: z.enum(['wedding', 'cinematic', 'fashion', 'editorial', 'portrait']),
  promptPrefix: z.string().optional(),
  promptSuffix: z.string().optional(),
  negativePrompt: z.string().optional(),
  camera: cameraSimulationSchema,
});
