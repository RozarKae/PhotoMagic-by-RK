import { z } from 'zod';

export const AlbumCoverV7Schema = z.object({
  coverMaterial: z.enum(['leather', 'velvet', 'fabric', 'acrylic', 'metal', 'wood', 'canvas', 'hardcover', 'softcover']),
  coverTitle: z.string().min(1),
  clientNames: z.string().min(1),
  eventDate: z.string(),
  foilColor: z.enum(['24k_gold', 'rose_gold', 'silver', 'copper', 'blind_emboss']),
  spineText: z.string(),
  embossingStyle: z.enum(['debossed_foil', 'embossed_blind', 'laser_engraved', 'acrylic_print']),
});

export const AlbumApprovalWorkflowV7Schema = z.object({
  stage: z.enum(['draft', 'sent_for_review', 'client_reviewing', 'revision_requested', 'designer_updating', 'final_approval', 'locked_for_print']),
  revisionCount: z.number().min(0),
  approvedByClient: z.boolean().default(false),
  lockedForPrint: z.boolean().default(false),
});

export type AlbumCoverV7 = z.infer<typeof AlbumCoverV7Schema>;
export type AlbumApprovalWorkflowV7 = z.infer<typeof AlbumApprovalWorkflowV7Schema>;
