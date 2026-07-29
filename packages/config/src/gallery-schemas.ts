import { z } from 'zod';

export interface PhotoItem {
  id: string;
  galleryId: string;
  fileName: string;
  r2ProofUrl: string;
  r2ThumbUrl: string;
  width: number;
  height: number;
  aiQualityScore: number;
  isBlur: boolean;
  isDuplicate: boolean;
  isSelected: boolean;
}

export const uploadPhotoSchema = z.object({
  galleryId: z.string().min(1, 'Gallery ID is required'),
  fileName: z.string().min(1, 'File name is required'),
  contentType: z.string(),
  fileSizeBytes: z.number().positive(),
});

export const toggleSelectionSchema = z.object({
  galleryId: z.string().min(1, 'Gallery ID is required'),
  photoId: z.string().min(1, 'Photo ID is required'),
  isSelected: z.boolean(),
});

export const aiAnalysisRequestSchema = z.object({
  photoId: z.string().uuid(),
  r2ProofKey: z.string(),
});
