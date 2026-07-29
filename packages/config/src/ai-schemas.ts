import { z } from 'zod';

export const aiChatMessageSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
  provider: z.enum(['gemini', 'openai', 'claude', 'ollama']).default('gemini'),
  context: z.record(z.unknown()).optional(),
});

export const createAutomationWorkflowSchema = z.object({
  name: z.string().min(2, 'Workflow name is required'),
  trigger: z.string().min(1, 'Trigger is required'),
  condition: z.string().min(1, 'Condition is required'),
  action: z.string().min(1, 'Action is required'),
  active: z.boolean().default(true),
});

export const semanticSearchQuerySchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  categories: z.array(z.string()).optional(),
});
