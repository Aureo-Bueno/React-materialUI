import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Pagination,
  LinearProgress,
  Alert,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToolList } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";
import { Environment } from "../../shared/environment";
import {
  useDebounce,
  useDeletePerson,
  usePaginatedPeople,
  useUrlSearchParams,
} from "../../shared/hooks";
import { PersonTableRow } from "./components/PersonTableRow";

export function ListPerson() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { debounce } = useDebounce();
  const { page, search, updateParams } = useUrlSearchParams();

  const {
    data,
    isLoading,
    isError,
    error,
    isPending,
    isFetching,
    isPlaceholderData,
  } = usePaginatedPeople({
    page,
    search,
  });

  const peopleData = data || { data: [], totCount: 0 };
  const deletePersonMutation = useDeletePerson();

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await deletePersonMutation.mutateAsync(id);
    },
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(["people", { page, search }], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.filter((person: any) => person.id !== deletedId),
          totCount: oldData.totCount - 1,
        };
      });
    },
    onError: (error) => {
      console.error("Erro ao deletar:", error);
    },
  });

  const handleSearchChange = useCallback(
    (searchText: string) => {
      debounce(() => {
        updateParams(1, searchText);
      });
    },
    [debounce, updateParams]
  );

  const handlePageChange = useCallback(
    (_: React.ChangeEvent<unknown>, newPage: number) => {
      updateParams(newPage, search);
    },
    [search, updateParams]
  );

  const handleNew = useCallback(() => {
    navigate("/person/detail/new");
  }, [navigate]);

  const handleDelete = useCallback(
    async (id: number) => {
      await deleteMutation.mutateAsync(id);
    },
    [deleteMutation]
  );

  const totalPages = Math.ceil(peopleData.totCount / Environment.LIMIT_LINES);

  return (
    <LayoutBasePage
      title="Listagem de Pessoas"
      toolBar={
        <ToolList
          textButtonNew="Nova Pessoa"
          viewInputSearch
          textSearch={search}
          onClickNew={handleNew}
          alterTextSearch={handleSearchChange}
        />
      }
    >
      <TableContainer component={Paper} variant="outlined" sx={{ m: 1 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "background.paper" }}>
              <TableCell width="80px" sx={{ fontWeight: 600 }}>
                Ações
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Nome Completo</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isPending && (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                  <CircularProgress size={40} />
                </TableCell>
              </TableRow>
            )}

            {isError && !isPending && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Alert severity="error" sx={{ my: 1 }}>
                    {(error as Error)?.message || "Erro ao carregar dados"}
                  </Alert>
                </TableCell>
              </TableRow>
            )}

            {!isPending && peopleData.totCount === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="textSecondary">
                    {Environment.LIST_NULL}
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {peopleData.data.map((person) => (
              <PersonTableRow
                key={person.id}
                person={person}
                onDelete={handleDelete}
                onEdit={(id) => navigate(`/person/detail/${id}`)}
                isDeleting={
                  deleteMutation.isPending &&
                  deleteMutation.variables === person.id
                }
              />
            ))}
          </TableBody>

          {/* Footer */}
          <TableFooter>
            {/* Loading Bar */}
            {isFetching && (
              <TableRow>
                <TableCell colSpan={3} sx={{ p: 0 }}>
                  <LinearProgress />
                </TableCell>
              </TableRow>
            )}

            {/* Pagination */}
            {peopleData.totCount > Environment.LIMIT_LINES && !isPending && (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 2 }}>
                  <Pagination
                    page={page}
                    count={totalPages}
                    onChange={handlePageChange}
                    disabled={isPlaceholderData || isFetching}
                    variant="outlined"
                    shape="rounded"
                  />
                </TableCell>
              </TableRow>
            )}

            {peopleData.totCount > 0 && !isPending && (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 1 }}>
                  <Typography variant="caption" color="textSecondary">
                    Mostrando {peopleData.data.length} de {peopleData.totCount}{" "}
                    registros
                    {isFetching && " (atualizando...)"}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBasePage>
  );
}
