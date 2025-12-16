import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  CitiesService,
  type IListCity,
} from "../services/api/cities/CitiesService";

interface IUsePaginatedCitiesParams {
  page: number;
  search: string;
}

interface IUsePaginatedCitiesResponse {
  data: IListCity[];
  totCount: number;
}

export function usePaginatedCities({
  page,
  search,
}: IUsePaginatedCitiesParams) {
  return useQuery({
    queryKey: ["cities", { page, search }],
    queryFn: async (): Promise<IUsePaginatedCitiesResponse> => {
      const result = await CitiesService.getAll(page, search);

      if (result instanceof Error) {
        throw new Error(result.message);
      }

      return {
        data: result.data,
        totCount: result.totCount,
      };
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 2,
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 404) {
        return false;
      }
      return failureCount < 2;
    },
  });
}

export function useDeleteCity() {
  return {
    deleteById: async (id: number) => {
      const result = await CitiesService.deleteById(id);
      if (result instanceof Error) {
        throw new Error(result.message);
      }
      return result;
    },
  };
}
