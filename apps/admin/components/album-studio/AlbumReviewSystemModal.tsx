'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Modal } from '@photomagic/ui';
import { Eye, CheckCircle2, XCircle, Lock, MessageSquare, BookOpen, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';

interface AlbumReviewSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlbumReviewSystemModal: React.FC<AlbumReviewSystemModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentSpread, setCurrentSpread] = useState(1);
  const [spreadApproved, setSpreadApproved] = useState(false);
  const [reviewComments, setReviewComments] = useState([
    { id: 'c-1', spread: 1, user: 'Eleanor Vance (Client)', text: 'Can we enhance the lighting on the bride brooch in photo #2?', time: '10:45 AM' },
  ]);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Interactive Client Album Review & Proofing Hub">
      <div className="flex flex-col gap-6 p-2 text-xs">
        <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <Eye size={18} className="text-gold-500" />
            <span className="font-bold text-text-primary text-sm">Spread #{currentSpread} Digital Proof Review</span>
          </div>
          <Badge variant={spreadApproved ? 'success' : 'gold'}>
            {spreadApproved ? 'Spread Approved & Locked' : 'Pending Client Feedback'}
          </Badge>
        </div>

        {/* Side-by-Side Review Stage */}
        <div className="p-6 rounded-2xl bg-canvas border border-border-subtle flex flex-col items-center gap-4">
          <div className="relative w-full max-w-2xl h-64 bg-surface-base rounded-xl border border-gold-500/30 flex overflow-hidden shadow-2xl">
            <div className="flex-1 p-2 border-r border-border-subtle">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80"
                alt="Page Left"
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className="flex-1 p-2">
              <img
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80"
                alt="Page Right"
                className="w-full h-full object-cover rounded"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCurrentSpread((s) => Math.max(1, s - 1))}
              disabled={currentSpread === 1}
            >
              <ChevronLeft size={14} /> Previous Spread
            </Button>
            <span className="font-mono text-text-primary text-xs font-bold">Spread {currentSpread} / 15</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCurrentSpread((s) => Math.min(15, s + 1))}
              disabled={currentSpread === 15}
            >
              Next Spread <ChevronRight size={14} />
            </Button>
          </div>
        </div>

        {/* Approval Actions & Spatial Pin Comments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-3">
            <h4 className="font-bold text-text-primary">Spread Approval Controls</h4>
            <p className="text-[11px] text-text-secondary">Approving locks the spread layout from accidental modifications.</p>
            <div className="flex gap-2">
              <Button
                variant={spreadApproved ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSpreadApproved(!spreadApproved)}
                className="flex items-center gap-1 text-xs"
              >
                <CheckCircle2 size={14} /> {spreadApproved ? 'Approved & Locked' : 'Approve Spread'}
              </Button>
              <Button variant="secondary" size="sm" className="flex items-center gap-1 text-xs text-status-error">
                <XCircle size={14} /> Request Revision
              </Button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-2">
            <h4 className="font-bold text-text-primary flex items-center gap-1.5">
              <MessageSquare size={14} className="text-gold-500" /> Client Notes & Revision Pin Log
            </h4>
            {reviewComments.map((c) => (
              <div key={c.id} className="p-2.5 rounded-lg bg-surface-elevated text-[11px] flex flex-col gap-0.5">
                <span className="font-bold text-text-primary">{c.user}</span>
                <span className="text-text-secondary">{c.text}</span>
                <span className="text-[9px] text-text-tertiary font-mono self-end">{c.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
