import { z } from 'zod';

export const leadStatusEnumSchema = z.enum([
  'new',
  'contacted',
  'consultation_booked',
  'quote_sent',
  'won',
  'lost',
]);

export const createLeadSchema = z.object({
  clientName: z.string().min(2, 'Client name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  eventType: z.string().min(1, 'Event type is required'),
  eventDate: z.string().optional(),
  estimatedBudget: z.number().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const updateLeadStatusSchema = z.object({
  leadId: z.string().uuid(),
  status: leadStatusEnumSchema,
});

export const addLeadTaskSchema = z.object({
  leadId: z.string().uuid(),
  title: z.string().min(2, 'Task description is required'),
  dueDate: z.string().optional(),
});

export const addLeadActivitySchema = z.object({
  leadId: z.string().uuid(),
  activityType: z.string(),
  description: z.string(),
});
