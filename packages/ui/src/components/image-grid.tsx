'use client';

import React, { memo } from 'react';
import { GalleryImage, GalleryImageProps } from './gallery-image';
import { EmptyState } from './empty-state';
import { Image as ImageIcon } from 'lucide-react';

export interface ImageGridProps {
  images?: GalleryImageProps[];
  columns?: 2 | 3 | 4 | 5;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  onSelectImage?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  onDownloadImage?: (id: string) => void;
  className?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  children?: React.ReactNode;
}

export const ImageGrid: React.FC<ImageGridProps> = memo(
  ({
    images = [],
    columns = 3,
    aspectRatio = 'video',
    onSelectImage,
    onToggleFavorite,
    onDownloadImage,
    className = '',
    emptyTitle = 'No Media Assets',
    emptyDescription = 'No images have been uploaded to this studio gallery yet.',
    children,
  }) => {
    if (!children && images.length === 0) {
      return (
        <EmptyState
          icon={<ImageIcon size={32} />}
          title={emptyTitle}
          description={emptyDescription}
        />
      );
    }

    const columnClasses = {
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
      5: 'grid-cols-1 sm:grid-cols-3 lg:grid-cols-5',
    }[columns];

    const aspectClasses = {
      square: 'aspect-square',
      video: 'aspect-video',
      portrait: 'aspect-[3/4]',
      auto: 'h-64',
    }[aspectRatio];

    return (
      <div className={`grid ${columnClasses} gap-5 ${className}`}>
        {children
          ? children
          : images.map((img) => (
              <GalleryImage
                key={img.id}
                {...img}
                className={`${aspectClasses} ${img.className || ''}`}
                onSelect={onSelectImage}
                onToggleFavorite={onToggleFavorite}
                onDownload={onDownloadImage}
              />
            ))}
      </div>
    );
  },
);

ImageGrid.displayName = 'ImageGrid';
