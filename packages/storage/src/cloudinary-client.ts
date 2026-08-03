import { v2 as cloudinary, UploadApiResponse, UploadApiOptions } from 'cloudinary';

export interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

/**
 * Validates Cloudinary environment variables and configures the SDK.
 * Throws helpful error messages if required variables are missing.
 */
export function getCloudinaryConfig(): CloudinaryConfig {
  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const missing: string[] = [];
  if (!cloudName) missing.push('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME');
  if (!apiKey) missing.push('CLOUDINARY_API_KEY');
  if (!apiSecret) missing.push('CLOUDINARY_API_SECRET');

  if (missing.length > 0) {
    throw new Error(
      `❌ Cloudinary Storage Error: Missing environment variables: [${missing.join(', ')}]. ` +
        `Please add them to your .env.local file.`,
    );
  }

  return {
    cloudName: cloudName!,
    apiKey: apiKey!,
    apiSecret: apiSecret!,
  };
}

/**
 * Returns a configured instance of Cloudinary SDK v2.
 */
export function getCloudinaryInstance() {
  const config = getCloudinaryConfig();
  cloudinary.config({
    cloud_name: config.cloudName,
    api_key: config.apiKey,
    api_secret: config.apiSecret,
    secure: true,
  });
  return cloudinary;
}

/**
 * Server-side upload function for Cloudinary.
 */
export async function uploadToCloudinary(
  fileSource: string, // File path or base64 data URI or remote URL
  options: UploadApiOptions = {},
): Promise<UploadApiResponse> {
  const client = getCloudinaryInstance();
  return await client.uploader.upload(fileSource, {
    resource_type: 'auto',
    ...options,
  });
}

/**
 * Server-side asset destruction with rollback handling.
 */
export async function deleteFromCloudinary(
  publicId: string,
  resourceType: 'image' | 'video' | 'raw' = 'image',
): Promise<{ success: boolean; result: string }> {
  try {
    const client = getCloudinaryInstance();
    const result = await client.uploader.destroy(publicId, {
      resource_type: resourceType,
      invalidate: true,
    });

    if (result.result === 'ok' || result.result === 'not_found') {
      return { success: true, result: result.result };
    }
    return { success: false, result: result.result };
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown Cloudinary deletion failure';
    console.error(`❌ Cloudinary Delete Error for [${publicId}]:`, msg);
    return { success: false, result: msg };
  }
}

/**
 * Generates signed parameters for secure direct client-side upload.
 */
export function generateUploadSignature(params: Record<string, any>) {
  const config = getCloudinaryConfig();
  const timestamp = Math.round(new Date().getTime() / 1000);

  const paramsToSign = {
    ...params,
    timestamp,
  };

  const client = getCloudinaryInstance();
  const signature = client.utils.api_sign_request(paramsToSign, config.apiSecret);

  return {
    signature,
    timestamp,
    apiKey: config.apiKey,
    cloudName: config.cloudName,
  };
}
