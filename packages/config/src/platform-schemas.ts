import { z } from 'zod';

export const createTenantSchema = z.object({
  name: z.string().min(2, 'Tenant name is required'),
  slug: z.string().min(2, 'Subdomain slug is required'),
  customDomain: z.string().optional(),
  whiteLabelEnabled: z.boolean().default(false),
  planCode: z.enum(['starter', 'pro', 'studio', 'enterprise']).default('studio'),
});

export const updateWhiteLabelBrandingSchema = z.object({
  tenantId: z.string().min(1, 'Tenant ID is required'),
  primaryColorHex: z.string().default('#D4AF37'),
  customLogoUrl: z.string().optional(),
  customCssOverrides: z.string().optional(),
});

export const generateApiKeySchema = z.object({
  tenantId: z.string().min(1, 'Tenant ID is required'),
  keyName: z.string().min(2, 'Key name is required'),
  permissions: z.array(z.string()).default(['read', 'write']),
});

export const installMarketplaceItemSchema = z.object({
  itemId: z.string().min(1, 'Item ID is required'),
  tenantId: z.string().min(1, 'Tenant ID is required'),
});
