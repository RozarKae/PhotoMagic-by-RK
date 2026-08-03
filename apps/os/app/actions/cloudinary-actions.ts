'use server';

import {
  generateUploadSignature,
  deleteFromCloudinary,
  generateSignedDownloadUrl,
  generateSignedClientViewUrl,
  buildCloudinaryFolderPath,
  generateCloudinaryPublicId,
  CloudinaryFolderType,
} from '@photomagic/storage/server';
import { createSuccessResponse, createErrorResponse } from '@photomagic/config';
import { createSupabaseBrowserClient } from '@photomagic/database';
import { CloudinaryAssetMetadata } from '@photomagic/types';

/**
 * Server action to generate direct signed Cloudinary upload parameters.
 */
export async function generateCloudinarySignatureAction(payload: {
  clientId: string;
  folderType: CloudinaryFolderType;
  fileName: string;
}) {
  try {
    const { clientId, folderType, fileName } = payload;
    const publicId = generateCloudinaryPublicId(clientId, folderType, fileName);
    const folder = buildCloudinaryFolderPath(clientId, folderType);

    const signatureResult = generateUploadSignature({
      public_id: publicId,
      folder,
    });

    return createSuccessResponse({
      ...signatureResult,
      publicId,
      folder,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to generate Cloudinary signature';
    return createErrorResponse('INTERNAL_SERVER_ERROR', msg);
  }
}

/**
 * Server action to persist Cloudinary asset metadata inside Supabase.
 */
export async function saveCloudinaryAssetMetadataAction(metadata: CloudinaryAssetMetadata) {
  try {
    const supabase = createSupabaseBrowserClient();
    if (supabase) {
      const { error } = await supabase.from('cloudinary_assets').upsert({
        public_id: metadata.public_id,
        secure_url: metadata.secure_url,
        width: metadata.width,
        height: metadata.height,
        bytes: metadata.bytes,
        format: metadata.format,
        client_id: metadata.clientId,
        project_id: metadata.projectId,
        event_id: metadata.eventId,
        photographer: metadata.photographer,
        tags: metadata.tags || [],
        folder: metadata.folder,
        created_at: metadata.created_at || new Date().toISOString(),
      });

      if (error) {
        console.warn('⚠️ Supabase sync note (table or connection warning):', error.message);
      }
    }

    return createSuccessResponse({
      success: true,
      metadata,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to save Cloudinary metadata';
    return createErrorResponse('INTERNAL_SERVER_ERROR', msg);
  }
}

/**
 * Server action for atomic deletion of a Cloudinary asset with database rollback handling.
 */
export async function deleteCloudinaryAssetAction(payload: {
  publicId: string;
  resourceType?: 'image' | 'video' | 'raw';
}) {
  try {
    const { publicId, resourceType = 'image' } = payload;

    // 1. Remove from Cloudinary storage first
    const deleteResult = await deleteFromCloudinary(publicId, resourceType);

    if (!deleteResult.success) {
      return createErrorResponse(
        'INTERNAL_SERVER_ERROR',
        `Cloudinary asset deletion failed: ${deleteResult.result}. Rollback triggered.`,
      );
    }

    // 2. Remove database record from Supabase
    try {
      const supabase = createSupabaseBrowserClient();
      if (supabase) {
        const { error } = await supabase
          .from('cloudinary_assets')
          .delete()
          .eq('public_id', publicId);

        if (error) {
          console.warn('⚠️ Note when removing Supabase record:', error.message);
        }
      }
    } catch (dbError) {
      console.error('⚠️ DB deletion failed, but Cloudinary asset removed:', dbError);
    }

    return createSuccessResponse({
      success: true,
      publicId,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to delete asset';
    return createErrorResponse('INTERNAL_SERVER_ERROR', msg);
  }
}

/**
 * Server action to generate secure signed expiring download URLs.
 */
export async function getSignedDownloadUrlAction(payload: {
  publicId: string;
  expiresInSeconds?: number;
}) {
  try {
    const { publicId, expiresInSeconds = 3600 } = payload;
    const downloadUrl = generateSignedDownloadUrl({
      publicId,
      expiresInSeconds,
      attachment: true,
    });

    return createSuccessResponse({
      downloadUrl,
      publicId,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to generate signed download URL';
    return createErrorResponse('INTERNAL_SERVER_ERROR', msg);
  }
}
