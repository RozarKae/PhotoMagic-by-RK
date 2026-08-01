'use client';

import React from 'react';
import { Card, Button } from '@photomagic/ui';
import { Plus, UserPlus, UploadCloud, FileText } from 'lucide-react';
import Link from 'next/link';

interface QuickActionsProps {
  onNewBooking?: () => void;
  onAddClient?: () => void;
  onUploadGallery?: () => void;
  onCreateInvoice?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onNewBooking,
  onAddClient,
  onUploadGallery,
  onCreateInvoice,
}) => {
  return (
    <Card variant="glass" className="p-6 flex flex-col gap-4">
      <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
        Quick Actions
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Button
          variant="primary"
          onClick={onNewBooking}
          className="flex items-center gap-2 justify-center"
        >
          <Plus size={16} />
          <span>New Booking</span>
        </Button>

        <Button
          variant="secondary"
          onClick={onAddClient}
          className="flex items-center gap-2 justify-center"
        >
          <UserPlus size={16} />
          <span>Add Client</span>
        </Button>

        <Button
          variant="secondary"
          onClick={onUploadGallery}
          className="flex items-center gap-2 justify-center"
        >
          <UploadCloud size={16} />
          <span>Upload Gallery</span>
        </Button>

        <Button
          variant="secondary"
          onClick={onCreateInvoice}
          className="flex items-center gap-2 justify-center"
        >
          <FileText size={16} />
          <span>Create Invoice</span>
        </Button>
      </div>
    </Card>
  );
};
