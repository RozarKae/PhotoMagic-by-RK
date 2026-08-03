'use client';

import React, { useEffect } from 'react';
import { Button, Card } from '@photomagic/ui';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Portal Application Error Boundary Caught:', error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card variant="glass" className="max-w-md w-full text-center flex flex-col items-center p-8">
        <div className="rounded-full bg-status-error/10 p-4 mb-4 text-status-error">
          <AlertTriangle size={36} />
        </div>
        <h2 className="text-xl font-bold text-text-primary mb-2">Something Went Wrong</h2>
        <p className="text-sm text-text-secondary mb-6">
          We encountered an unexpected error while rendering this portal page. Your selections and
          state remain safe.
        </p>
        <Button variant="primary" onClick={reset}>
          Try Again
        </Button>
      </Card>
    </div>
  );
}
