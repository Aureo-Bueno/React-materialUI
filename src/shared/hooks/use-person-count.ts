import { useQuery } from "@tanstack/react-query";
import { PersonService } from "../services/api/person/PersonService";
import { useQueryErrorHandler } from "./use-query-error-handler";

export function usePersonCount() {
  const { invalidateAndRefetch } = useQueryErrorHandler();

  return useQuery({
    queryKey: ["person", "count"],
    queryFn: async () => {
      const result = await PersonService.getAll(1);
      if (result instanceof Error) {
        throw new Error(result.message);
      }
      return result.totCount;
    },
    retry: 2,
  });
}
