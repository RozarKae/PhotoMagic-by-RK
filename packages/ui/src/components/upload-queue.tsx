'use client';

import React, { memo } from 'react';
import { RefreshCw, XCircle, CheckCircle2, AlertCircle, Image as ImageIcon } from 'lucide-react';

export interface UploadQueueItem {
  id: string;
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error' | 'cancelled';
  errorMessage?: string;
  publicId?: string;
  secureUrl?: string;
}

export interface UploadQueueProps {
  items: UploadQueueItem[];
  onRetryItem?: (id: string) => void;
  onCancelItem?: (id: string) => void;
  onClearCompleted?: () => void;
  className?: string;
}

export const UploadQueue: React.FC<UploadQueueProps> = memo(
  ({ items, onRetryItem, onCancelItem, onClearCompleted, className = '' }) => {
    if (items.length === 0) return null;

    const completedCount = items.filter((i) => i.status === 'success').length;
    const errorCount = items.filter((i) => i.status === 'error').length;
    const uploadingCount = items.filter(
      (i) => i.status === 'uploading' || i.status === 'pending',
    ).length;

    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
      <div
        className={`flex flex-col gap-3 bg-[#141414] border border-white/10 rounded-xl p-4 shadow-museum ${className}`}
      >
        {/* Queue Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-ivory font-hero tracking-wide">
              Cloudinary Upload Queue
            </span>
            <span className="font-mono text-[10px] text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/20">
              {items.length} Files Total
            </span>
          </div>

          <div className="flex items-center gap-3">
            {uploadingCount > 0 && (
              <span className="text-gold-400 font-mono font-semibold text-[11px] animate-pulse">
                Uploading ({uploadingCount} left)...
              </span>
            )}
            {completedCount > 0 && onClearCompleted && (
              <button
                type="button"
                onClick={onClearCompleted}
                className="text-[10px] text-silver hover:text-ivory font-mono uppercase tracking-wider underline"
              >
                Clear Completed ({completedCount})
              </button>
            )}
          </div>
        </div>

        {/* Queue Items List */}
        <div className="flex flex-col gap-2.5 max-h-60 overflow-y-auto pr-1">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-[#1D1D1D] border border-white/5 text-xs"
            >
              {/* File Icon & Info */}
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="p-2 rounded bg-black/40 text-gold-400 border border-gold-500/20 flex-shrink-0">
                  <ImageIcon size={16} />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-semibold text-ivory truncate">{item.file.name}</span>
                  <span className="font-mono text-[10px] text-silver/70">
                    {formatFileSize(item.file.size)}
                    {item.errorMessage && (
                      <span className="text-red-400 font-semibold ml-2">• {item.errorMessage}</span>
                    )}
                  </span>

                  {/* Progress Bar */}
                  {(item.status === 'uploading' || item.status === 'pending') && (
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden mt-1.5">
                      <div
                        className="h-full bg-gold-500 transition-all duration-300"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Status & Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {item.status === 'success' && (
                  <div className="flex items-center gap-1 text-emerald-400 text-[11px] font-mono">
                    <CheckCircle2 size={16} />
                    <span className="hidden sm:inline">Uploaded</span>
                  </div>
                )}

                {item.status === 'uploading' && (
                  <span className="font-mono text-gold-400 text-xs font-bold">
                    {item.progress}%
                  </span>
                )}

                {item.status === 'error' && (
                  <div className="flex items-center gap-1.5">
                    <div className="text-red-400 flex items-center gap-1 text-[11px] font-mono">
                      <AlertCircle size={15} />
                      <span>Failed</span>
                    </div>
                    {onRetryItem && (
                      <button
                        type="button"
                        onClick={() => onRetryItem(item.id)}
                        className="p-1 rounded text-gold-400 hover:bg-white/10 transition-colors"
                        title="Retry Upload"
                      >
                        <RefreshCw size={14} />
                      </button>
                    )}
                  </div>
                )}

                {(item.status === 'uploading' || item.status === 'pending') && onCancelItem && (
                  <button
                    type="button"
                    onClick={() => onCancelItem(item.id)}
                    className="p-1 rounded text-silver hover:text-red-400 hover:bg-white/10 transition-colors"
                    title="Cancel Upload"
                  >
                    <XCircle size={15} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
);

UploadQueue.displayName = 'UploadQueue';
