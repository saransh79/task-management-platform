import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: (failureCount, error) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((error as any)?.response?.status === 401) {
          return false;
        }
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: (failureCount, error) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((error as any)?.response?.status === 401) {
          return false;
        }
        return failureCount < 1;
      },
    },
  },
});
