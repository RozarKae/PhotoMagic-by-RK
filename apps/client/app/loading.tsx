'use client';

import React from 'react';
import { Skeleton, Card } from '@photomagic/ui';

export default function Loading() {
  return (
    <div className="p-8 max-w-5xl mx-auto flex flex-col gap-6">
      <Skeleton height="40px" width="300px" />
      <Skeleton height="20px" width="450px" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card variant="glass" className="h-48 flex flex-col justify-between">
          <Skeleton height="24px" width="60%" />
          <Skeleton height="16px" width="80%" />
          <Skeleton height="36px" width="100%" />
        </Card>
        <Card variant="glass" className="h-48 flex flex-col justify-between">
          <Skeleton height="24px" width="60%" />
          <Skeleton height="16px" width="80%" />
          <Skeleton height="36px" width="100%" />
        </Card>
        <Card variant="glass" className="h-48 flex flex-col justify-between">
          <Skeleton height="24px" width="60%" />
          <Skeleton height="16px" width="80%" />
          <Skeleton height="36px" width="100%" />
        </Card>
      </div>
    </div>
  );
}
