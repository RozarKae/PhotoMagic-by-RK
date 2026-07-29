import { z } from 'zod';

export const createBranchSchema = z.object({
  branchCode: z.string().min(2, 'Branch code is required'),
  name: z.string().min(2, 'Branch name is required'),
  city: z.string().min(2, 'City is required'),
  country: z.string().min(2, 'Country is required'),
  currency: z.enum(['INR', 'USD', 'AED', 'GBP', 'EUR']).default('INR'),
  timezone: z.string().default('Asia/Kolkata'),
});

export const requestEquipmentTransferSchema = z.object({
  equipmentId: z.string().min(1, 'Equipment ID is required'),
  fromBranchId: z.string().min(1, 'Source branch ID is required'),
  toBranchId: z.string().min(1, 'Target branch ID is required'),
  reason: z.string().min(2, 'Transfer reason is required'),
});

export const updateEnterpriseRoleSchema = z.object({
  roleName: z.string().min(2, 'Role name is required'),
  permissions: z.array(z.string()).min(1, 'Select at least one permission'),
});
