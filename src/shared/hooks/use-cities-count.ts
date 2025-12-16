import { useQuery } from "@tanstack/react-query";
import { CitiesService } from "../services/api/cities/CitiesService";
import { useQueryErrorHandler } from "./use-query-error-handler";

export function useCitiesCount() {
  const { invalidateAndRefetch } = useQueryErrorHandler();

  return useQuery({
    queryKey: ["cities", "count"],
    queryFn: async () => {
      const result = await CitiesService.getAll(1);
      if (result instanceof Error) {
        throw new Error(result.message);
      }
      return result.totCount;
    },
    retry: 2,
  });
}
