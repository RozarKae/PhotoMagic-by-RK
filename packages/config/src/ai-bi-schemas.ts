import { z } from 'zod';

export const analyticsQuerySchema = z.object({
  period: z.enum(['7d', '30d', '90d', '1y', 'all']).default('30d'),
  branchId: z.string().optional(),
});

export const exportCustomReportSchema = z.object({
  reportName: z.string().min(2, 'Report name is required'),
  format: z.enum(['pdf', 'excel', 'csv']).default('pdf'),
  includeMetrics: z.array(z.string()).min(1, 'Select at least one metric'),
});

export const applyAiAdvisorActionSchema = z.object({
  predictionId: z.string().min(1, 'Prediction ID is required'),
  actionType: z.enum(['apply', 'dismiss']).default('apply'),
});
