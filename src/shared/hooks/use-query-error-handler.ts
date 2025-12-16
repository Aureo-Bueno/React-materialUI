import { useCallback } from "react";
import { useQueryProvider } from "../context/QueryProvider";

export function useQueryErrorHandler() {
  const { queryClient } = useQueryProvider();

  const refetchWithErrorHandling = useCallback(
    async (queryKey: unknown[]) => {
      try {
        await queryClient.refetchQueries({
          queryKey,
          type: "active",
        });
      } catch (error) {
        console.error("Erro ao refetch:", error);
        throw error;
      }
    },
    [queryClient]
  );

  const invalidateAndRefetch = useCallback(
    async (queryKey: unknown[]) => {
      try {
        await queryClient.invalidateQueries({ queryKey });
      } catch (error) {
        console.error("Erro ao invalidar query:", error);
        throw error;
      }
    },
    [queryClient]
  );

  const clearAllCache = useCallback(() => {
    queryClient.clear();
  }, [queryClient]);

  return {
    refetchWithErrorHandling,
    invalidateAndRefetch,
    clearAllCache,
    queryClient,
  };
}
