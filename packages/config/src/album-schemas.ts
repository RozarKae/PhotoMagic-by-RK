import { z } from 'zod';

export interface AlbumCommentItem {
  id: string;
  albumId: string;
  spreadNumber: number;
  authorName: string;
  pinX: number;
  pinY: number;
  comment: string;
  resolved: boolean;
  timestamp: string;
}

export const createAlbumSchema = z.object({
  projectId: z.string().uuid(),
  title: z.string().min(2, 'Album title is required'),
  coverMaterial: z.enum(['italian_leather', 'velvet', 'linen']),
  pageCount: z.number().int().min(10).max(100),
});

export const addAlbumCommentSchema = z.object({
  albumId: z.string().min(1, 'Album ID is required'),
  spreadNumber: z.number().int().positive(),
  pinX: z.number().min(0).max(100),
  pinY: z.number().min(0).max(100),
  comment: z.string().min(1, 'Comment text cannot be empty'),
});

export const approveAlbumSchema = z.object({
  albumId: z.string().min(1, 'Album ID is required'),
  approvedBy: z.string().min(1, 'Approver name is required'),
});

export const generateDeliveryZipSchema = z.object({
  projectId: z.string().uuid(),
  title: z.string().min(1, 'Delivery title is required'),
  downloadPin: z.string().length(4, 'PIN must be 4 digits'),
});
