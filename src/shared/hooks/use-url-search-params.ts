import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

export function useUrlSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";

  const updateParams = useCallback(
    (newPage?: number, newSearch?: string) => {
      const params = new URLSearchParams();

      if (newPage && newPage > 1) {
        params.set("page", newPage.toString());
      }

      if (newSearch && newSearch.trim()) {
        params.set("search", newSearch.trim());
      }

      setSearchParams(params, { replace: true });
    },
    [setSearchParams]
  );

  const resetParams = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  return {
    page,
    search,
    updateParams,
    resetParams,
  };
}
