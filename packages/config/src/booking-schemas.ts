import { z } from 'zod';

export const createBookingSchema = z.object({
  leadId: z.string().optional(),
  packageName: z.string().min(2, 'Package name is required'),
  totalAmount: z.number().positive('Total amount must be positive'),
  depositAmount: z.number().positive('Deposit amount must be positive'),
  eventDate: z.string().min(1, 'Event date is required'),
  location: z.string().optional(),
  clientName: z.string().min(2, 'Client name is required'),
  email: z.string().email('Invalid email address'),
});

export const convertLeadToBookingSchema = z.object({
  leadId: z.string().min(1, 'Lead ID is required'),
  packageName: z.string().min(2, 'Package name is required'),
  totalAmount: z.number().positive('Total amount must be positive'),
  depositAmount: z.number().positive('Deposit amount must be positive'),
});

export const assignProjectTeamSchema = z.object({
  projectId: z.string().uuid(),
  userId: z.string().uuid(),
  role: z.enum(['lead_photographer', 'second_shooter', 'videographer', 'editor']),
});
