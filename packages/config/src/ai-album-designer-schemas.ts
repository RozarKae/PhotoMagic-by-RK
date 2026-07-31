import { z } from 'zod';

export const createAlbumProjectSchema = z.object({
  title: z.string().min(2, 'Album title is required'),
  clientId: z.string().optional(),
  coverType: z.enum(['hardcover', 'softcover', 'leather', 'acrylic', 'canvas']).default('leather'),
  coverTheme: z
    .enum(['Royal Black', 'Classic White', 'Luxury Gold', 'Minimal', 'Editorial Vogue'])
    .default('Royal Black'),
  albumSize: z.enum(['8x8', '10x10', '12x12', '12x18']).default('12x18'),
  spineText: z.string().optional(),
});

export const addProofingCommentSchema = z.object({
  albumId: z.string().min(1, 'Album ID is required'),
  pageNumber: z.number().int().min(1),
  pinXPercent: z.number().min(0).max(100),
  pinYPercent: z.number().min(0).max(100),
  commentText: z.string().min(1, 'Comment text is required'),
});

export const updatePageLayoutSchema = z.object({
  pageId: z.string().min(1, 'Page ID is required'),
  layoutType: z
    .enum(['full_bleed', '2_photo_spread', 'grid_4', 'panoramic', 'editorial'])
    .default('full_bleed'),
  chapterName: z.string().min(1, 'Chapter name is required'),
});
