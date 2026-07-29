import { z } from 'zod';

export const saveAiPromptSchema = z.object({
  title: z.string().min(2, 'Prompt title is required'),
  promptText: z.string().min(5, 'Prompt text is required'),
  negativePrompt: z.string().optional(),
  category: z.enum(['portrait', 'wedding', 'cinematic', 'retouch']).default('portrait'),
  tags: z.array(z.string()).default([]),
  isFavorite: z.boolean().default(false),
});

export const createAiJobSchema = z.object({
  modelId: z.string().min(1, 'Model ID is required'),
  promptId: z.string().optional(),
  promptText: z.string().min(3, 'Prompt text is required'),
});

export const updateAiModelConfigSchema = z.object({
  modelId: z.string().min(1, 'Model ID is required'),
  enabled: z.boolean(),
  apiKey: z.string().optional(),
  costPerRequest: z.number().positive(),
  isDefault: z.boolean().default(false),
});
