'use client';

import React, { useState, memo } from 'react';
import Image, { ImageProps } from 'next/image';
import { buildCloudinaryUrl, CloudinaryPresets } from '@photomagic/storage';

export interface CloudinaryImageProps extends Omit<ImageProps, 'src'> {
  publicId?: string;
  src?: string;
  preset?: 'thumbnail' | 'galleryPreview' | 'medium' | 'highRes';
  aspectRatio?: string;
  fallbackSrc?: string;
}

export const CloudinaryImage: React.FC<CloudinaryImageProps> = memo(
  ({
    publicId,
    src,
    preset = 'galleryPreview',
    alt = 'PhotoMagic Studio Image',
    className = '',
    fill = false,
    width,
    height,
    fallbackSrc = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    ...props
  }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const identifier = publicId || src || '';

    let imageUrl = fallbackSrc;
    if (!hasError && identifier) {
      if (preset && CloudinaryPresets[preset] && !identifier.startsWith('http')) {
        imageUrl = CloudinaryPresets[preset](identifier);
      } else {
        imageUrl = buildCloudinaryUrl(identifier, {
          width: typeof width === 'number' ? width : undefined,
          height: typeof height === 'number' ? height : undefined,
          quality: 'auto',
          format: 'auto',
          progressive: true,
        });
      }
    }

    return (
      <div
        className={`relative overflow-hidden bg-[#141414] ${fill ? 'w-full h-full' : ''} ${className}`}
      >
        {/* Shimmer Placeholder */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-[#1D1D1D] animate-pulse z-10 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full border-2 border-gold-500/30 border-t-gold-500 animate-spin" />
          </div>
        )}

        <Image
          src={imageUrl}
          alt={alt}
          fill={fill}
          width={!fill ? width || 800 : undefined}
          height={!fill ? height || 600 : undefined}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`transition-opacity duration-500 ease-out object-cover ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...props}
        />
      </div>
    );
  },
);

CloudinaryImage.displayName = 'CloudinaryImage';
