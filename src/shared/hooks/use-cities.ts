import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CitiesService,
  type IListCity,
} from "../services/api/cities/CitiesService";
import { CityFormData } from "../schemas";

export function useCityById(id: number | string) {
  const isNew = id === "new";

  return useQuery({
    queryKey: ["cities", id],
    queryFn: async () => {
      if (isNew) return null;

      const result = await CitiesService.getById(Number(id));

      if (result instanceof Error) {
        throw new Error(result.message);
      }

      return result;
    },
    enabled: !isNew,
    staleTime: 1000 * 60 * 10,
    retry: 2,
  });
}

export function useCreateCity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CityFormData) => {
      const result = await CitiesService.create(data);

      if (result instanceof Error) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (newCityId) => {
      queryClient.invalidateQueries({
        queryKey: ["cities"],
      });

      queryClient.prefetchQuery({
        queryKey: ["cities", newCityId],
        queryFn: () => CitiesService.getById(newCityId),
      });
    },
  });
}

export function useUpdateCity(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CityFormData) => {
      const result = await CitiesService.updateById(id, {
        id,
        ...data,
      });

      if (result instanceof Error) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cities", id],
      });

      queryClient.invalidateQueries({
        queryKey: ["cities"],
      });
    },
  });
}

export function useDeleteCity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const result = await CitiesService.deleteById(id);

      if (result instanceof Error) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cities"],
      });
    },
  });
}
