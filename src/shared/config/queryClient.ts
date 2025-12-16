import {
  QueryClient,
  QueryCache,
  MutationCache,
  type DefaultError,
} from "@tanstack/react-query";

function getRetryDelay(attemptIndex: number): number {
  const baseDelay = 1000;
  const exponentialDelay = baseDelay * Math.pow(2, attemptIndex);
  const maxDelay = 30000;
  return Math.min(exponentialDelay, maxDelay);
}

export function createQueryClient(options?: {
  onError?: (error: Error) => void;
  onSuccess?: (data: unknown) => void;
  enableLogging?: boolean;
}) {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error: any) => {
          if (
            error?.response?.status === 401 ||
            error?.response?.status === 403 ||
            error?.response?.status === 404
          ) {
            return false;
          }
          return failureCount < 2;
        },
        retryDelay: getRetryDelay,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        refetchOnReconnect: "always",
        refetchOnMount: "always",
      },
      mutations: {
        retry: 1,
        retryDelay: getRetryDelay,
      },
    },

    queryCache: new QueryCache({
      onError: (error: DefaultError) => {
        options?.enableLogging &&
          console.error("[Query Error]:", error.message);
        options?.onError?.(error as Error);
      },
      onSuccess: (data) => {
        options?.enableLogging && console.log("[Query Success]:", data);
        options?.onSuccess?.(data);
      },
    }),

    mutationCache: new MutationCache({
      onError: (error: DefaultError) => {
        options?.enableLogging &&
          console.error("[Mutation Error]:", error.message);
        options?.onError?.(error as Error);
      },
      onSuccess: (data) => {
        options?.enableLogging && console.log("[Mutation Success]:", data);
        options?.onSuccess?.(data);
      },
    }),
  });
}

export const queryClient = createQueryClient({
  enableLogging: import.meta.env.DEV,
});
