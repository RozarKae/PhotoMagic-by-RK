'use server';

import {
  createSuccessResponse,
  createErrorResponse,
  uploadPhotoSchema,
  toggleSelectionSchema,
  PhotoItem,
} from '@photomagic/config';
import {
  generateUploadSignature,
  buildCloudinaryFolderPath,
  generateCloudinaryPublicId,
} from '@photomagic/storage/server';
import { requirePermission, UserSession } from '@photomagic/auth';

export type { PhotoItem };

export async function requestUploadPresignedUrlsAction(
  payload: unknown,
  session: UserSession | null = null,
) {
  try {
    // RBAC & Permission Enforcement
    if (session) {
      requirePermission(session, 'gallery:upload');
    }

    const validated = uploadPhotoSchema.parse(payload);
    const photoId = 'photo_' + Date.now();
    const clientId = session?.userId || 'client_demo';

    const folder = buildCloudinaryFolderPath(clientId, 'proofs');
    const publicId = generateCloudinaryPublicId(clientId, 'proofs', validated.fileName);

    const sig = generateUploadSignature({
      public_id: publicId,
      folder,
    });

    return createSuccessResponse({
      photoId,
      presignedPutUrl: `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`,
      keys: {
        rawKey: publicId,
        proofKey: publicId,
        thumbnailKey: publicId,
      },
      cloudinarySignature: sig,
    });
  } catch (err: unknown) {
    const msg =
      err instanceof Error ? err.message : 'Failed to generate Cloudinary upload parameters';
    return createErrorResponse('UNAUTHORIZED', msg);
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
