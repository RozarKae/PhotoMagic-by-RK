'use server';

import {
  createSuccessResponse,
  createErrorResponse,
  uploadPhotoSchema,
  toggleSelectionSchema,
  PhotoItem,
} from '@photomagic/config';
import {
  generatePresignedUploadUrl,
  buildPhotoStorageKeys,
  STORAGE_BUCKETS,
} from '@photomagic/storage';

export type { PhotoItem };

export async function requestUploadPresignedUrlsAction(payload: unknown) {
  try {
    const validated = uploadPhotoSchema.parse(payload);
    const photoId = 'photo_' + Date.now();
    const workspaceId = 'ws_photomagic_demo';

    const keys = buildPhotoStorageKeys(workspaceId, photoId, 'webp');
    const presignedPutUrl = await generatePresignedUploadUrl({
      bucket: STORAGE_BUCKETS.PROOFS,
      key: keys.proofKey,
      contentType: validated.contentType,
    });

    return createSuccessResponse({
      photoId,
      presignedPutUrl,
      keys,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to generate upload presigned URL';
    return createErrorResponse('INVALID_INPUT', msg);
  }
}

export async function togglePhotoSelectionAction(payload: unknown) {
  try {
    const validated = toggleSelectionSchema.parse(payload);
    return createSuccessResponse({
      photoId: validated.photoId,
      isSelected: validated.isSelected,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update photo selection';
    return createErrorResponse('INVALID_INPUT', msg);
  }
}

export async function triggerAIPhotoAnalysisAction(photoId: string) {
  try {
    return createSuccessResponse({
      photoId,
      aiQualityScore: 0.94,
      aiTags: ['Wedding Ceremony', 'Bride Portrait', 'Bokeh Lighting'],
      isBlur: false,
      isDuplicate: false,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'AI Analysis failed';
    return createErrorResponse('INTERNAL_SERVER_ERROR', msg);
  }
}
