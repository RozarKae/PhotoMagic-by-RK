'use client';

import React from 'react';
import { Button, Card } from '@photomagic/ui';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card variant="glass" className="max-w-md text-center p-8 flex flex-col items-center">
        <h2 className="text-xl font-bold text-text-primary mb-2">Module Not Found</h2>
        <p className="text-sm text-text-secondary mb-6">
          The studio administration route does not exist.
        </p>
        <Link href="/admin">
          <Button variant="primary">Return to Command Center</Button>
        </Link>
      </Card>
    </div>
  );
}
