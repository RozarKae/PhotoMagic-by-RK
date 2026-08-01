'use client';

import React from 'react';
import { Button, Card } from '@photomagic/ui';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card variant="glass" className="max-w-md text-center p-8 flex flex-col items-center">
        <h1 className="text-6xl font-bold text-gold-500 mb-2">404</h1>
        <h2 className="text-xl font-bold text-text-primary mb-2">Story Not Found</h2>
        <p className="text-sm text-text-secondary mb-6">
          The portfolio story or page you requested does not exist.
        </p>
        <Link href="/">
          <Button variant="primary">Return Home</Button>
        </Link>
      </Card>
    </div>
  );
}
