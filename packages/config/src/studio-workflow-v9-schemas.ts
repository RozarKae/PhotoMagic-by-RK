import { z } from 'zod';

export const StudioEventProvisioningV9Schema = z.object({
  projectCode: z.string().min(5),
  clientName: z.string().min(1),
  eventType: z.enum(['wedding', 'pre_wedding', 'reception', 'fashion', 'corporate', 'birthday']),
  eventDate: z.string(),
  storageAllocatedGb: z.number().min(10).default(250),
  workflowStage: z.enum([
    'booking_confirmed',
    'shoot_completed',
    'upload_finished',
    'ai_culling',
    'editing',
    'quality_check',
    'album_design',
    'client_review',
    'printing',
    'delivery',
    'archive',
  ]),
});

export const AiCullingJobV9Schema = z.object({
  totalScanned: z.number().min(1),
  rejectedBlur: z.number().min(0),
  rejectedClosedEyes: z.number().min(0),
  duplicatesGrouped: z.number().min(0),
  approvedFavorites: z.number().min(0),
});

export const EditorTaskAssignmentV9Schema = z.object({
  leadEditorName: z.string().min(1),
  albumDesignerName: z.string().min(1),
  retoucherName: z.string().min(1),
  deadlineDate: z.string(),
  priorityLevel: z.enum(['low', 'medium', 'high', 'urgent']),
  progressPercent: z.number().min(0).max(100),
});

export type StudioEventProvisioningV9 = z.infer<typeof StudioEventProvisioningV9Schema>;
export type AiCullingJobV9 = z.infer<typeof AiCullingJobV9Schema>;
export type EditorTaskAssignmentV9 = z.infer<typeof EditorTaskAssignmentV9Schema>;
