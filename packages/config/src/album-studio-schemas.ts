import { z } from 'zod';

export const AlbumStudioProjectSchema = z.object({
  id: z.string().uuid().optional(),
  clientName: z.string().min(2, 'Client name is required'),
  eventTitle: z.string().min(2, 'Event title is required'),
  albumSize: z.enum(['12x18 Inches', '10x14 Inches', '12x12 Inches Square']),
  totalPages: z.number().min(10).max(100),
  status: z.enum(['in_progress', 'awaiting_approval', 'approved', 'ready_for_print', 'delivered']),
  assignedDesigner: z.string(),
  printBleedMm: z.number().default(3.0),
  targetDpi: z.number().default(300),
});

export const AutoAlbumBuilderSchema = z.object({
  stylePreset: z.enum([
    'Minimal',
    'Classic',
    'Luxury',
    'Cinematic',
    'Storytelling',
    'Magazine',
    'Traditional Wedding',
    'Modern Wedding',
  ]),
  targetSpreads: z.number().min(5).max(50),
  balanceOrientation: z.boolean().default(true),
  avoidDuplicates: z.boolean().default(true),
  groupMomentsByTimestamp: z.boolean().default(true),
});

export type AlbumStudioProject = z.infer<typeof AlbumStudioProjectSchema>;
export type AutoAlbumBuilder = z.infer<typeof AutoAlbumBuilderSchema>;
