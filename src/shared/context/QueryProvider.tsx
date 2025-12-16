import { ReactNode, createContext, useContext, useEffect } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

interface QueryProviderContextType {
  queryClient: QueryClient;
  isDevToolsEnabled: boolean;
}

const QueryProviderContext = createContext<
  QueryProviderContextType | undefined
>(undefined);

interface QueryProviderProps {
  children: ReactNode;
  queryClient: QueryClient;
  enableDevTools?: boolean;
  enableErrorLog?: boolean;
}

export function QueryProvider({
  children,
  queryClient,
  enableDevTools = import.meta.env.DEV,
  enableErrorLog = import.meta.env.DEV,
}: QueryProviderProps) {
  useEffect(() => {
    if (enableErrorLog) {
      console.log(
        "[QueryProvider] Initialized with staleTime:",
        queryClient.getDefaultOptions().queries?.staleTime
      );
    }

    const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
      if (event.type === "observerOptionsUpdated" && enableErrorLog) {
        console.debug("[QueryCache Event]:", event);
      }
    });

    return () => unsubscribe();
  }, [queryClient, enableErrorLog]);

  const contextValue: QueryProviderContextType = {
    queryClient,
    isDevToolsEnabled: enableDevTools,
  };

  return (
    <QueryProviderContext.Provider value={contextValue}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </QueryProviderContext.Provider>
  );
}

export function useQueryProvider() {
  const context = useContext(QueryProviderContext);
  if (!context) {
    throw new Error(
      "useQueryProvider deve ser usado dentro de <QueryProvider>"
    );
  }
  return context;
}
