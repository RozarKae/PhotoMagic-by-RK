import { z } from 'zod';

export const createEditingSessionSchema = z.object({
  sessionName: z.string().min(2, 'Session name is required'),
  originalImageUrl: z.string().url('Valid image URL is required'),
});

export const addHistoryStepSchema = z.object({
  sessionId: z.string().min(1, 'Session ID is required'),
  actionType: z.enum(['crop', 'color_grade', 'exposure', 'object_removal', 'auto_enhance']),
  parameters: z.record(z.unknown()).default({}),
});

export const dispatchEditingJobSchema = z.object({
  sessionId: z.string().min(1, 'Session ID is required'),
  jobType: z.enum(['ai_retouch', 'background_removal', 'hdr_merge', 'color_match']),
});

export const exportImageSchema = z.object({
  sessionId: z.string().min(1, 'Session ID is required'),
  format: z.enum(['png', 'jpeg', 'webp', 'tiff']).default('png'),
  qualityPercent: z.number().min(1).max(100).default(100),
  targetDpi: z.number().default(300),
});
