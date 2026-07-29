'use client';

import React from 'react';
import { Button, Card } from '@photomagic/ui';
import { FileQuestion } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card variant="glass" className="max-w-md w-full text-center flex flex-col items-center p-8">
        <div className="rounded-full bg-surface-elevated p-4 mb-4 text-gold-500">
          <FileQuestion size={36} />
        </div>
        <h2 className="text-xl font-bold text-text-primary mb-2">Page Not Found</h2>
        <p className="text-sm text-text-secondary mb-6">
          The event portal route or gallery asset you are looking for does not exist or has been
          moved.
        </p>
        <Link href="/portal">
          <Button variant="primary">Return to Portal Home</Button>
        </Link>
      </Card>
    </div>
  );
}
