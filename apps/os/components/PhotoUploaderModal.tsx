'use client';

import React from 'react';
import { Modal, ImageUploader } from '@photomagic/ui';
import {
  generateCloudinarySignatureAction,
  saveCloudinaryAssetMetadataAction,
} from '../app/actions/cloudinary-actions';

interface PhotoUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  galleryId: string;
  onUploadComplete: () => void;
}

export const PhotoUploaderModal: React.FC<PhotoUploaderModalProps> = ({
  isOpen,
  onClose,
  galleryId,
  onUploadComplete,
}) => {
  const handleSignatureRequest = async (params: {
    clientId: string;
    folderType: any;
    fileName: string;
  }) => {
    const res = await generateCloudinarySignatureAction({
      clientId: params.clientId || galleryId || 'client_demo',
      folderType: params.folderType || 'proofs',
      fileName: params.fileName,
    });

    if (!res.success) {
      throw new Error(res.error?.message || 'Failed to generate Cloudinary upload signature');
    }
    return res.data;
  };

  const handleSingleSuccess = async (asset: { publicId: string; secureUrl: string }) => {
    await saveCloudinaryAssetMetadataAction({
      public_id: asset.publicId,
      secure_url: asset.secureUrl,
      width: 1920,
      height: 1080,
      bytes: 1024000,
      format: 'webp',
      created_at: new Date().toISOString(),
      clientId: galleryId,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cloudinary High-Speed Direct Upload">
      <div className="flex flex-col gap-4">
        <ImageUploader
          clientId={galleryId || 'client_demo'}
          defaultFolder="proofs"
          allowMultiple
          uploadSignatureAction={handleSignatureRequest}
          onSingleSuccess={handleSingleSuccess}
          onUploadComplete={() => {
            onUploadComplete();
          }}
        />
      </div>
    </Modal>
  );
};
