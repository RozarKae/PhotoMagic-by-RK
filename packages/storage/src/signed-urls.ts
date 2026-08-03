import { getCloudinaryConfig } from './cloudinary-client';
import { v2 as cloudinary } from 'cloudinary';

export interface SignedUrlOptions {
  publicId: string;
  expiresInSeconds?: number;
  resourceType?: 'image' | 'video' | 'raw';
  attachment?: boolean;
  filename?: string;
  transformations?: Record<string, any>;
}

/**
 * Generates an expiring, signed private URL for Cloudinary asset downloads or client access.
 */
export function generateSignedDownloadUrl({
  publicId,
  expiresInSeconds = 3600, // 1 hour default
  resourceType = 'image',
  attachment = true,
  filename,
  transformations = {},
}: SignedUrlOptions): string {
  const config = getCloudinaryConfig();

  cloudinary.config({
    cloud_name: config.cloudName,
    api_key: config.apiKey,
    api_secret: config.apiSecret,
    secure: true,
  });

  const expiresAt = Math.floor(Date.now() / 1000) + expiresInSeconds;

  const urlOptions: Record<string, any> = {
    resource_type: resourceType,
    type: 'upload',
    sign_url: true,
    expires_at: expiresAt,
    ...transformations,
  };

  if (attachment) {
    urlOptions.flags = 'attachment';
  }

  return cloudinary.url(publicId, urlOptions);
}

/**
 * Generates an authenticated signed view URL for the Private Client Screening Room.
 */
export function generateSignedClientViewUrl(
  publicId: string,
  expiresInSeconds: number = 7200,
): string {
  return generateSignedDownloadUrl({
    publicId,
    expiresInSeconds,
    attachment: false,
    transformations: {
      fetch_format: 'auto',
      quality: 'auto',
      flags: 'progressive',
    },
  });
}
