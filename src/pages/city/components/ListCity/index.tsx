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
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToolList } from "../../../../shared/components";
import { LayoutBasePage } from "../../../../shared/layouts";
import { Environment } from "../../../../shared/environment";
import { CitiesService } from "../../../../shared/services/api/cities/CitiesService";
import {
  useDebounce,
  useDeleteCity,
  usePaginatedCities,
  useUrlSearchParams,
} from "../../../../shared/hooks";
import { CityTableRow } from "../CityTableRow";

export function ListCities() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { debounce } = useDebounce();
  const { page, search, updateParams } = useUrlSearchParams();

  const { data, isError, error, isPending, isFetching, isPlaceholderData } =
    usePaginatedCities({
      page,
      search,
    });

  const cityData = data || { data: [], totCount: 0 };
  const {
    mutateAsync,
    isPending: isPendingDeleteCity,
    variables,
  } = useDeleteCity();

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
    navigate("/city/detail/new");
  }, [navigate]);

  const handleDelete = useCallback(
    async (id: number) => {
      if (confirm("Realmente deseja apagar esta cidade?")) {
        try {
          await mutateAsync(id);
        } catch (error) {
          console.error("Erro ao deletar:", error);
        }
      }
    },
    [mutateAsync]
  );

  useEffect(() => {
    const totalPages = Math.ceil(cityData.totCount / Environment.LIMIT_LINES);
    const nextPage = page + 1;

    if (nextPage <= totalPages) {
      queryClient.prefetchQuery({
        queryKey: ["cities", { page: nextPage, search }],
        queryFn: () => CitiesService.getAll(nextPage, search),
      });
    }
  }, [page, search, cityData.totCount, queryClient]);

  const totalPages = Math.ceil(cityData.totCount / Environment.LIMIT_LINES);

  return (
    <LayoutBasePage
      title="Listagem de Cidades"
      toolBar={
        <ToolList
          textButtonNew="Nova Cidade"
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
              <TableCell sx={{ fontWeight: 600 }}>Nome da Cidade</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isPending && (
              <TableRow>
                <TableCell colSpan={2} align="center" sx={{ py: 4 }}>
                  <CircularProgress size={40} />
                </TableCell>
              </TableRow>
            )}

            {isError && !isPending && (
              <TableRow>
                <TableCell colSpan={2}>
                  <Alert severity="error" sx={{ my: 1 }} onClose={() => {}}>
                    {error?.message || "Erro ao carregar dados"}
                  </Alert>
                </TableCell>
              </TableRow>
            )}

            {!isPending && cityData.totCount === 0 && (
              <TableRow>
                <TableCell colSpan={2} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="textSecondary">
                    {Environment.LIST_NULL}
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {cityData.data.map((city) => (
              <CityTableRow
                key={city.id}
                city={city}
                onDelete={handleDelete}
                isDeleting={isPendingDeleteCity && variables === city.id}
              />
            ))}
          </TableBody>

          <TableFooter>
            {isFetching && (
              <TableRow>
                <TableCell colSpan={2} sx={{ p: 0 }}>
                  <LinearProgress />
                </TableCell>
              </TableRow>
            )}

            {cityData.totCount > Environment.LIMIT_LINES && !isPending && (
              <TableRow>
                <TableCell colSpan={2} align="center" sx={{ py: 2 }}>
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

            {cityData.totCount > 0 && !isPending && (
              <TableRow>
                <TableCell colSpan={2} align="center" sx={{ py: 1 }}>
                  <Typography variant="caption" color="textSecondary">
                    Mostrando {cityData.data.length} de {cityData.totCount}{" "}
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
