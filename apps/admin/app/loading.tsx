'use client';

import React from 'react';
import { Skeleton } from '@photomagic/ui';

export default function Loading() {
  return (
    <div className="p-8 max-w-6xl mx-auto flex flex-col gap-6">
      <Skeleton height="36px" width="300px" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        <Skeleton height="120px" />
        <Skeleton height="120px" />
        <Skeleton height="120px" />
        <Skeleton height="120px" />
      </div>
      <Skeleton height="350px" className="mt-4" />
    </div>
  );
}
