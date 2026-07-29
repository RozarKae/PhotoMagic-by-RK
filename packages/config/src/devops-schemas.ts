import { z } from 'zod';

export const updateFeatureFlagSchema = z.object({
  flagKey: z.string().min(1, 'Flag key is required'),
  enabled: z.boolean(),
  rolloutPercentage: z.number().min(0).max(100).default(100),
});

export const triggerRollbackSchema = z.object({
  deploymentId: z.string().min(1, 'Deployment ID is required'),
  targetCommitSha: z.string().min(7, 'Target commit SHA is required'),
  reason: z.string().min(2, 'Rollback reason is required'),
});

export const devopsHealthQuerySchema = z.object({
  environment: z.enum(['development', 'testing', 'staging', 'production']).default('production'),
});
