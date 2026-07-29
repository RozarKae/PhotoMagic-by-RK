import { z } from 'zod';

export const connectIntegrationSchema = z.object({
  providerId: z.string().min(1, 'Provider ID is required'),
  category: z.enum([
    'payments',
    'storage',
    'calendar',
    'messaging',
    'accounting',
    'ai_providers',
    'maps',
  ]),
  apiKey: z.string().min(1, 'API key or secret is required'),
  environment: z.enum(['sandbox', 'production']).default('production'),
});

export const webhookConfigSchema = z.object({
  name: z.string().min(2, 'Webhook name is required'),
  url: z.string().url('Invalid webhook URL'),
  events: z.array(z.string()).min(1, 'Select at least one event'),
  secret: z.string().min(8, 'Secret must be at least 8 characters'),
});

export const rotateSecretSchema = z.object({
  secretId: z.string().min(1, 'Secret ID is required'),
  newSecretValue: z.string().min(8, 'New secret must be at least 8 characters'),
});
