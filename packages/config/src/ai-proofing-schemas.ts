import { z } from 'zod';

export const toggleFavoriteSchema = z.object({
  photoId: z.string().min(1, 'Photo ID is required'),
  isFavorite: z.boolean(),
  starRating: z.number().min(1).max(5).default(5),
});

export const createEditRequestSchema = z.object({
  photoId: z.string().min(1, 'Photo ID is required'),
  requestType: z
    .enum(['skin_retouching', 'object_removal', 'background_replacement', 'color_adjustment'])
    .default('skin_retouching'),
  priorityLevel: z.enum(['low', 'normal', 'high', 'urgent']).default('normal'),
  instructions: z.string().min(5, 'Instructions are required'),
});

export const submitGalleryApprovalSchema = z.object({
  galleryId: z.string().min(1, 'Gallery ID is required'),
  clientSignatureName: z.string().min(2, 'Digital signature name is required'),
  approvedItemCount: z.number().int().positive(),
});
