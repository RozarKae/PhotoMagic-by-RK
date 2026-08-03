'use server';

import {
  createSuccessResponse,
  createErrorResponse,
  addAlbumCommentSchema,
  approveAlbumSchema,
  AlbumCommentItem,
} from '@photomagic/config';

export type { AlbumCommentItem };

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
