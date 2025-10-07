'use client';

import { useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HttpError } from '@/utils/returnFetchJson';
import { authStore, sessionExpiredModalAtom } from '@/store/authAtom';
import AppErrorBoundary from '@/components/common/AppErrorBoundary';

const Providers = ({ children }: any): React.JSX.Element => {
  const [queryClient] = useState(() => {
    const handleUnauthorizedError = (error: unknown) => {
      const isModalOpen = authStore.get(sessionExpiredModalAtom);

      if (isModalOpen) {
        return;
      }

      if (error instanceof HttpError && error.status === 401) {
        queryClient.clear();
        authStore.set(sessionExpiredModalAtom, true);
      }
    };

    return new QueryClient({
      queryCache: new QueryCache({
        onError: handleUnauthorizedError
      }),
      mutationCache: new MutationCache({
        onError: handleUnauthorizedError
      }),
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 0,
          staleTime: 0
        }
      }
    });
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AppErrorBoundary>
        {children}
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      </AppErrorBoundary>
    </QueryClientProvider>
  );
};

export default Providers;
