import { z } from 'zod';

export const createWorkflowSchema = z.object({
  name: z.string().min(2, 'Workflow name is required'),
  description: z.string().optional(),
  triggerType: z.enum(['lead.received', 'booking.confirmed', 'payment.success', 'album.approved', 'cron.scheduled']).default('lead.received'),
  isActive: z.boolean().default(true),
});

export const addWorkflowNodeSchema = z.object({
  workflowId: z.string().min(1, 'Workflow ID is required'),
  nodeType: z.enum(['trigger', 'condition', 'action', 'ai_processing', 'approval', 'delay']),
  title: z.string().min(2, 'Node title is required'),
  positionX: z.number().default(0),
  positionY: z.number().default(0),
});

export const processApprovalRequestSchema = z.object({
  requestId: z.string().min(1, 'Request ID is required'),
  action: z.enum(['approved', 'rejected']).default('approved'),
  comment: z.string().optional(),
});
