'use client';

import React from 'react';
import { Skeleton } from '@photomagic/ui';

export default function Loading() {
  return (
    <div className="p-12 max-w-6xl mx-auto flex flex-col gap-8 items-center">
      <Skeleton height="60px" width="500px" />
      <Skeleton height="24px" width="350px" />
      <Skeleton height="400px" width="100%" className="mt-8 rounded-xl" />
    </div>
  );
}
