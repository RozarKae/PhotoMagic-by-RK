export interface CloudinaryTransformationOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'limit' | 'scale' | 'thumb' | 'crop';
  gravity?: 'auto' | 'face' | 'center' | 'faces';
  quality?: 'auto' | 'auto:good' | 'auto:best' | 'auto:eco' | number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  progressive?: boolean;
  blur?: number;
  extraTransformations?: string[];
}

const DEFAULT_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';

/**
 * Builds an optimized Cloudinary delivery URL using URL parameter transformations.
 */
export function buildCloudinaryUrl(
  publicIdOrUrl: string,
  options: CloudinaryTransformationOptions = {},
): string {
  if (!publicIdOrUrl) return '';

  // If already a full URL and not a Cloudinary URL, return as-is
  if (publicIdOrUrl.startsWith('http://') || publicIdOrUrl.startsWith('https://')) {
    if (!publicIdOrUrl.includes('res.cloudinary.com')) {
      return publicIdOrUrl;
    }
  }

  // Extract publicId if full Cloudinary URL passed
  let publicId = publicIdOrUrl;
  if (publicIdOrUrl.includes('res.cloudinary.com')) {
    const parts = publicIdOrUrl.split('/upload/');
    if (parts.length > 1) {
      // Strip any existing transformations prefix
      const pathAfterUpload = parts[1];
      const slashIndex = pathAfterUpload.search(/\/v\d+\//);
      if (slashIndex !== -1) {
        publicId = pathAfterUpload.substring(pathAfterUpload.indexOf('/', slashIndex + 1) + 1);
      } else {
        const firstSlash = pathAfterUpload.indexOf('/');
        publicId = pathAfterUpload.substring(firstSlash + 1);
      }
    }
  }

  const {
    width,
    height,
    crop = 'limit',
    gravity,
    quality = 'auto',
    format = 'auto',
    progressive = true,
    blur,
    extraTransformations = [],
  } = options;

  const transforms: string[] = [`f_${format}`, `q_${quality}`];

  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (crop) transforms.push(`c_${crop}`);
  if (gravity) transforms.push(`g_${gravity}`);
  if (progressive) transforms.push('fl_progressive');
  if (blur) transforms.push(`e_blur:${blur}`);

  if (extraTransformations.length > 0) {
    transforms.push(...extraTransformations);
  }

  const transformString = transforms.join(',');
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || DEFAULT_CLOUD_NAME;
  const cleanPublicId = publicId.startsWith('/') ? publicId.slice(1) : publicId;

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${cleanPublicId}`;
}

/**
 * Pre-defined Cloudinary transformations for common app viewports.
 */
export const CloudinaryPresets = {
  /** 300x300 Square Auto-Face Crop Thumbnail */
  thumbnail: (publicId: string) =>
    buildCloudinaryUrl(publicId, {
      width: 300,
      height: 300,
      crop: 'fill',
      gravity: 'auto',
      quality: 'auto',
      format: 'auto',
      progressive: true,
    }),

  /** 800px Responsive Gallery Preview */
  galleryPreview: (publicId: string) =>
    buildCloudinaryUrl(publicId, {
      width: 800,
      crop: 'limit',
      quality: 'auto',
      format: 'auto',
      progressive: true,
    }),

  /** 1200px Medium Screen View */
  medium: (publicId: string) =>
    buildCloudinaryUrl(publicId, {
      width: 1200,
      crop: 'limit',
      quality: 'auto',
      format: 'auto',
      progressive: true,
    }),

  /** 2400px High-Resolution Proof Display */
  highRes: (publicId: string) =>
    buildCloudinaryUrl(publicId, {
      width: 2400,
      crop: 'limit',
      quality: 'auto:best',
      format: 'auto',
      progressive: true,
    }),

  /** Low-Quality Blur Placeholder for Progressive Image Loading */
  blurPlaceholder: (publicId: string) =>
    buildCloudinaryUrl(publicId, {
      width: 30,
      crop: 'scale',
      quality: 'auto:eco',
      format: 'auto',
      blur: 1000,
    }),
};
