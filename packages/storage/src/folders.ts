export type CloudinaryFolderType =
  'raw' | 'edited' | 'proofs' | 'album' | 'delivery' | 'thumbnails';

/**
 * Builds standardized Cloudinary folder paths for client assets.
 * Format: photomagic/clients/{clientId}/{folderType}
 */
export function buildCloudinaryFolderPath(
  clientId: string,
  folderType: CloudinaryFolderType = 'proofs',
): string {
  const cleanClientId = clientId.trim().replace(/[^a-zA-Z0-9_-]/g, '_');
  return `photomagic/clients/${cleanClientId}/${folderType}`;
}

/**
 * Generates non-duplicate, clean public_id strings for Cloudinary assets.
 * Incorporates timestamp and random hash to prevent collisions.
 */
export function generateCloudinaryPublicId(
  clientId: string,
  folderType: CloudinaryFolderType,
  originalFileName: string,
): string {
  const folder = buildCloudinaryFolderPath(clientId, folderType);

  // Extract base filename without extension
  const baseName =
    originalFileName.substring(0, originalFileName.lastIndexOf('.')) || originalFileName;

  // Clean special characters
  const cleanBaseName = baseName
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '_')
    .substring(0, 40);

  const timestamp = Date.now();
  const randomHex = Math.random().toString(36).substring(2, 8);

  return `${folder}/${cleanBaseName}_${timestamp}_${randomHex}`;
}
