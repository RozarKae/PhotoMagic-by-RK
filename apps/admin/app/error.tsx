'use client';

import React from 'react';
import { Button, Card } from '@photomagic/ui';
import { AlertCircle } from 'lucide-react';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card variant="glass" className="max-w-md text-center p-8 flex flex-col items-center">
        <div className="rounded-full bg-status-error/10 p-4 mb-4 text-status-error">
          <AlertCircle size={36} />
        </div>
        <h2 className="text-xl font-bold text-text-primary mb-2">Studio OS Exception</h2>
        <p className="text-sm text-text-secondary mb-6">
          A production telemetry error was caught by the Command Center boundary.
        </p>
        <Button variant="primary" onClick={reset}>
          Reset Dashboard State
        </Button>
      </Card>
    </div>
  );
}
