'use server';

import {
  createSuccessResponse,
  createErrorResponse,
  createAlbumSchema,
  addAlbumCommentSchema,
  approveAlbumSchema,
  generateDeliveryZipSchema,
  AlbumCommentItem,
} from '@photomagic/config';

export type { AlbumCommentItem };

export async function createAlbumAction(payload: unknown) {
  try {
    const validated = createAlbumSchema.parse(payload);
    const albumId = 'alb_' + Date.now();

    return createSuccessResponse({
      albumId,
      projectId: validated.projectId,
      title: validated.title,
      coverMaterial: validated.coverMaterial,
      pageCount: validated.pageCount,
      status: 'draft',
      createdAt: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to create album project';
    return createErrorResponse('INVALID_INPUT', msg);
  }
}

export async function addAlbumCommentAction(payload: unknown) {
  try {
    const validated = addAlbumCommentSchema.parse(payload);

    const newComment: AlbumCommentItem = {
      id: 'cmt_' + Date.now(),
      albumId: validated.albumId,
      spreadNumber: validated.spreadNumber,
      authorName: 'Eleanor Vance',
      pinX: validated.pinX,
      pinY: validated.pinY,
      comment: validated.comment,
      resolved: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    return createSuccessResponse(newComment);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to add revision comment';
    return createErrorResponse('INVALID_INPUT', msg);
  }
}

export async function approveAlbumAction(payload: unknown) {
  try {
    const validated = approveAlbumSchema.parse(payload);
    return createSuccessResponse({
      albumId: validated.albumId,
      approvedBy: validated.approvedBy,
      status: 'approved',
      approvedAt: new Date().toISOString(),
      message: 'Album layout approved! Sent to Italian Print Lab queue.',
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to approve album';
    return createErrorResponse('INVALID_INPUT', msg);
  }
}

export async function generateDeliveryZipAction(payload: unknown) {
  try {
    const validated = generateDeliveryZipSchema.parse(payload);
    const packageId = 'zip_' + Date.now();

    return createSuccessResponse({
      packageId,
      projectId: validated.projectId,
      title: validated.title,
      downloadPin: validated.downloadPin,
      downloadUrl: `https://delivery.photomagic.studio/zips/${packageId}.zip`,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to generate delivery zip';
    return createErrorResponse('INVALID_INPUT', msg);
  }
}
