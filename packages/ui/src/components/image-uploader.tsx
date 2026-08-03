'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Button } from './button';
import { UploadQueue, UploadQueueItem } from './upload-queue';
import { UploadCloud, Folder, FileCheck, AlertCircle } from 'lucide-react';
import { CloudinaryFolderType } from '@photomagic/storage';

export interface ImageUploaderProps {
  clientId?: string;
  projectId?: string;
  defaultFolder?: CloudinaryFolderType;
  allowMultiple?: boolean;
  maxParallelUploads?: number;
  onUploadStart?: () => void;
  onUploadComplete?: (
    uploadedAssets: { publicId: string; secureUrl: string; width?: number; height?: number }[],
  ) => void;
  onSingleSuccess?: (asset: { publicId: string; secureUrl: string }) => void;
  uploadSignatureAction?: (params: {
    clientId: string;
    folderType: CloudinaryFolderType;
    fileName: string;
  }) => Promise<{
    signature: string;
    timestamp: number;
    apiKey: string;
    cloudName: string;
    publicId: string;
    folder: string;
  }>;
  className?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  clientId = 'client_default',
  projectId,
  defaultFolder = 'proofs',
  allowMultiple = true,
  maxParallelUploads = 3,
  onUploadStart,
  onUploadComplete,
  onSingleSuccess,
  uploadSignatureAction,
  className = '',
}) => {
  const [selectedFolder, setSelectedFolder] = useState<CloudinaryFolderType>(defaultFolder);
  const [queue, setQueue] = useState<UploadQueueItem[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesAdded = (files: File[]) => {
    if (files.length === 0) return;

    const newItems: UploadQueueItem[] = files.map((file, idx) => ({
      id: `up_${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 6)}`,
      file,
      progress: 0,
      status: 'pending',
    }));

    setQueue((prev) => [...prev, ...newItems]);
    processUploadQueue([...queue, ...newItems]);
  };

  const uploadSingleFile = async (item: UploadQueueItem) => {
    setQueue((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, status: 'uploading', progress: 10 } : i)),
    );

    try {
      let signatureData;
      if (uploadSignatureAction) {
        signatureData = await uploadSignatureAction({
          clientId,
          folderType: selectedFolder,
          fileName: item.file.name,
        });
      } else {
        // Fallback simulation signature if action not passed
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';
        signatureData = {
          signature: '',
          timestamp: Math.floor(Date.now() / 1000),
          apiKey: '',
          cloudName,
          publicId: `photomagic/clients/${clientId}/${selectedFolder}/${item.file.name.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}`,
          folder: `photomagic/clients/${clientId}/${selectedFolder}`,
        };
      }

      // Upload via FormData to Cloudinary API endpoint
      const formData = new FormData();
      formData.append('file', item.file);
      formData.append('public_id', signatureData.publicId);
      formData.append('folder', signatureData.folder);

      if (signatureData.signature && signatureData.apiKey) {
        formData.append('api_key', signatureData.apiKey);
        formData.append('timestamp', signatureData.timestamp.toString());
        formData.append('signature', signatureData.signature);
      } else {
        formData.append('upload_preset', 'unsigned_preset');
      }

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error(`Upload failed with status code ${response.status}`);
      }

      const data = await response.json();

      setQueue((prev) =>
        prev.map((i) =>
          i.id === item.id
            ? {
                ...i,
                status: 'success',
                progress: 100,
                publicId: data.public_id,
                secureUrl: data.secure_url,
              }
            : i,
        ),
      );

      onSingleSuccess?.({ publicId: data.public_id, secureUrl: data.secure_url });
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Upload failed';
      setQueue((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, status: 'error', errorMessage: msg } : i)),
      );
    }
  };

  const processUploadQueue = async (currentQueue: UploadQueueItem[]) => {
    onUploadStart?.();
    const pendingItems = currentQueue.filter((i) => i.status === 'pending');

    // Execute in parallel batches
    for (let i = 0; i < pendingItems.length; i += maxParallelUploads) {
      const batch = pendingItems.slice(i, i + maxParallelUploads);
      await Promise.all(batch.map((item) => uploadSingleFile(item)));
    }

    // Check complete
    setTimeout(() => {
      setQueue((finalQueue) => {
        const completed = finalQueue
          .filter((i) => i.status === 'success' && i.publicId && i.secureUrl)
          .map((i) => ({ publicId: i.publicId!, secureUrl: i.secureUrl! }));
        if (completed.length > 0) {
          onUploadComplete?.(completed);
        }
        return finalQueue;
      });
    }, 300);
  };

  const handleRetryItem = (id: string) => {
    setQueue((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: 'pending', errorMessage: undefined } : i)),
    );
    const item = queue.find((i) => i.id === id);
    if (item) {
      uploadSingleFile({ ...item, status: 'pending' });
    }
  };

  const handleCancelItem = (id: string) => {
    setQueue((prev) => prev.map((i) => (i.id === id ? { ...i, status: 'cancelled' } : i)));
  };

  const handleClearCompleted = () => {
    setQueue((prev) => prev.filter((i) => i.status !== 'success'));
  };

  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      {/* Folder Destination Selector */}
      <div className="flex items-center justify-between bg-[#141414] p-3 rounded-xl border border-white/10 text-xs">
        <div className="flex items-center gap-2 text-silver">
          <Folder size={16} className="text-gold-400" />
          <span className="font-semibold text-ivory">Target Cloudinary Folder:</span>
        </div>

        <select
          value={selectedFolder}
          onChange={(e) => setSelectedFolder(e.target.value as CloudinaryFolderType)}
          className="bg-[#1D1D1D] text-gold-400 font-mono text-xs px-3 py-1.5 rounded-lg border border-gold-500/30 focus:outline-none focus:ring-1 focus:ring-gold-500"
        >
          <option value="raw">raw/ (8K Masters)</option>
          <option value="edited">edited/ (Color Graded)</option>
          <option value="proofs">proofs/ (Client Proofing)</option>
          <option value="album">album/ (Album Spreads)</option>
          <option value="delivery">delivery/ (Final Releases)</option>
          <option value="thumbnails">thumbnails/ (Thumbnails)</option>
        </select>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          if (e.dataTransfer.files) {
            handleFilesAdded(Array.from(e.dataTransfer.files));
          }
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 ${
          isDragOver
            ? 'border-gold-500 bg-gold-500/10 shadow-kodakGlow'
            : 'border-white/15 bg-[#141414] hover:border-gold-500/50 hover:bg-[#1D1D1D]'
        }`}
      >
        <div className="rounded-full bg-[#1D1D1D] p-3 text-gold-400 border border-gold-500/30 shadow-kodakGlow">
          <UploadCloud size={28} />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-ivory font-hero tracking-wide">
            {allowMultiple ? 'Drag & Drop Multiple Photos' : 'Drag & Drop Photo'}
          </span>
          <span className="text-xs text-silver font-mono">
            Auto-optimizes with Cloudinary f_auto & q_auto transformations
          </span>
        </div>
        <Button variant="outline" size="sm" className="mt-2 font-mono text-xs">
          Browse Files
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple={allowMultiple}
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files) {
              handleFilesAdded(Array.from(e.target.files));
            }
          }}
        />
      </div>

      {/* Upload Queue Component */}
      <UploadQueue
        items={queue}
        onRetryItem={handleRetryItem}
        onCancelItem={handleCancelItem}
        onClearCompleted={handleClearCompleted}
      />
    </div>
  );
};
