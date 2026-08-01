'use client';

import React from 'react';
import { Button, Card } from '@photomagic/ui';
import { AlertCircle } from 'lucide-react';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-canvas">
      <Card
        variant="glass"
        className="max-w-md text-center p-8 flex flex-col items-center border-gold-500/30"
      >
        <div className="rounded-full bg-status-error/10 p-4 mb-4 text-status-error border border-status-error/20">
          <AlertCircle size={32} />
        </div>
        <h2 className="font-heading text-2xl font-bold text-ivory mb-2">
          Studio OS Telemetry Exception
        </h2>
        <p className="text-sm text-silver font-light leading-relaxed mb-6">
          A client state exception was safely isolated by the Executive Command Center boundary.
        </p>
        <Button variant="primary" onClick={reset}>
          Reset Dashboard Telemetry
        </Button>
      </Card>
    </div>
  );
}
