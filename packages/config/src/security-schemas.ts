import { z } from 'zod';

export const enableMfaSchema = z.object({
  totpCode: z.string().length(6, 'TOTP code must be 6 digits'),
  secret: z.string().min(10, 'TOTP secret is required'),
});

export const triggerBackupSchema = z.object({
  snapshotName: z.string().min(2, 'Snapshot name is required'),
  backupType: z.enum(['automated', 'manual']).default('manual'),
});

export const privacyDataRequestSchema = z.object({
  requestType: z.enum(['export', 'delete', 'anonymize']),
  reason: z.string().optional(),
});

export const auditLogFilterSchema = z.object({
  riskLevel: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  module: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});
