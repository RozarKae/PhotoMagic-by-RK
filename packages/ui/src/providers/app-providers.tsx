'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@photomagic/auth';
import { SoundProvider } from '../hooks/use-sound-fx';

export interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 Minutes
            gcTime: 1000 * 60 * 30, // 30 Minutes
            retry: 2,
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            networkMode: 'online',
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: 1,
            networkMode: 'online',
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SoundProvider>{children}</SoundProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
