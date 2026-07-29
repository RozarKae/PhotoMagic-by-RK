'use client';

import React from 'react';
import { Button, Card } from '@photomagic/ui';
import { AlertOctagon } from 'lucide-react';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card variant="glass" className="max-w-md text-center p-8 flex flex-col items-center">
        <div className="rounded-full bg-status-error/10 p-4 mb-4 text-status-error">
          <AlertOctagon size={36} />
        </div>
        <h2 className="text-xl font-bold text-text-primary mb-2">Website Error</h2>
        <p className="text-sm text-text-secondary mb-6">
          Unable to load showcase data. Please refresh.
        </p>
        <Button variant="primary" onClick={reset}>
          Reload Showcase
        </Button>
      </Card>
    </div>
  );
}
