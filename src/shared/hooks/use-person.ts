import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  PersonService,
  type IListPerson,
} from "../services/api/person/PersonService";
import { keepPreviousData } from "@tanstack/react-query";
import { PersonFormData } from "../schemas";

export function usePaginatedPeople({
  page,
  search,
}: {
  page: number;
  search: string;
}) {
  return useQuery({
    queryKey: ["people", { page, search }],
    queryFn: async () => {
      const result = await PersonService.getAll(page, search);

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

export function usePersonById(id: number | string) {
  const isNew = id === "new";

  return useQuery({
    queryKey: ["people", id],
    queryFn: async () => {
      if (isNew) return null;

      const result = await PersonService.getById(Number(id));

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

export function useCreatePerson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: PersonFormData) => {
      const result = await PersonService.create(data);

      if (result instanceof Error) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (newPersonId) => {
      queryClient.invalidateQueries({
        queryKey: ["people"],
      });

      queryClient.prefetchQuery({
        queryKey: ["people", newPersonId],
        queryFn: () => PersonService.getById(newPersonId),
      });
    },
  });
}

export function useUpdatePerson(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: PersonFormData) => {
      const result = await PersonService.updateById(id, {
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
        queryKey: ["people", id],
      });

      queryClient.invalidateQueries({
        queryKey: ["people"],
      });
    },
  });
}

export function useDeletePerson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const result = await PersonService.deleteById(id);

      if (result instanceof Error) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["people"],
      });
    },
  });
}
