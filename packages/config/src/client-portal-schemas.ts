import { z } from 'zod';

export const sendMessageSchema = z.object({
  projectId: z.string().optional(),
  message: z.string().min(1, 'Message text cannot be empty'),
});

export const updateClientProfileSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().optional(),
  avatarR2Key: z.string().optional(),
});
