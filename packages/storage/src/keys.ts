export const STORAGE_BUCKETS = {
  RAW: process.env.R2_BUCKET_RAW || 'photomagic-raw-dev',
  PROOFS: process.env.R2_BUCKET_PROOFS || 'photomagic-proofs-dev',
  DELIVERIES: process.env.R2_BUCKET_DELIVERIES || 'photomagic-deliveries-dev',
  ZIPS: process.env.R2_BUCKET_ZIPS || 'photomagic-zips-dev',
} as const;

export function buildPhotoStorageKeys(
  workspaceId: string,
  photoId: string,
  extension: string = 'webp',
) {
  return {
    rawKey: `workspaces/${workspaceId}/raw/${photoId}.${extension}`,
    proofKey: `workspaces/${workspaceId}/proofs/${photoId}.webp`,
    thumbKey: `workspaces/${workspaceId}/thumbs/${photoId}.webp`,
    zipKey: `workspaces/${workspaceId}/zips/delivery-${photoId}.zip`,
  };
}
