'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { store } from '@/store';
import { queryClient } from '@/lib/queryClient';
import { Toaster } from 'sonner';
import AuthInitializer from './AuthInitializer';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthInitializer />
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
          }}
        />
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
      </QueryClientProvider>
    </Provider>
  );
}
