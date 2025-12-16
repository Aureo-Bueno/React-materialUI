import {
  Box,
  Grid,
  LinearProgress,
  Paper,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToolDetail } from "../../../../shared/components";
import { VTextField, VForm } from "../../../../shared/forms";
import { LayoutBasePage } from "../../../../shared/layouts";
import {
  useCityById,
  useCreateCity,
  useDeleteCity,
  useUpdateCity,
} from "../../../../shared/hooks";
import { CityFormData, CitySchema } from "../../../../shared/schemas";

export function DetailCity() {
  const { id = "new" } = useParams<"id">();
  const navigate = useNavigate();
  const isNew = id === "new";

  const {
    data: city,
    isLoading: isFetching,
    error: fetchError,
  } = useCityById(id);
  const createMutation = useCreateCity();
  const updateMutation = useUpdateCity(Number(id));
  const deleteMutation = useDeleteCity();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
    reset,
  } = useForm<CityFormData>({
    resolver: zodResolver(CitySchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (city && !isNew) {
      setValue("name", city.name);
    }
  }, [city, isNew, setValue]);

  const handleSave = useCallback(
    async (data: CityFormData) => {
      try {
        if (isNew) {
          const newCityId = await createMutation.mutateAsync(data);
          navigate(`/city/detail/${newCityId}`);
        } else {
          await updateMutation.mutateAsync(data);
        }
      } catch (error) {
        console.error("Erro ao salvar:", error);
      }
    },
    [isNew, createMutation, updateMutation, navigate]
  );

  const handleSaveAndBack = useCallback(
    async (data: CityFormData) => {
      try {
        if (isNew) {
          await createMutation.mutateAsync(data);
        } else {
          await updateMutation.mutateAsync(data);
        }
        navigate("/city");
      } catch (error) {
        console.error("Erro ao salvar:", error);
      }
    },
    [isNew, createMutation, updateMutation, navigate]
  );

  const handleDelete = useCallback(async () => {
    if (confirm("Realmente deseja apagar esta cidade?")) {
      try {
        await deleteMutation.mutateAsync(Number(id));
        navigate("/city");
      } catch (error) {
        console.error("Erro ao deletar:", error);
      }
    }
  }, [id, deleteMutation, navigate]);

  const handleNew = useCallback(() => {
    navigate("/city/detail/new");
  }, [navigate]);

  const handleBack = useCallback(() => {
    navigate("/city");
  }, [navigate]);

  const isMutating =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;
  const mutationError =
    createMutation.error || updateMutation.error || deleteMutation.error;

  return (
    <LayoutBasePage
      title={isNew ? "Nova Cidade" : city?.name || "Carregando..."}
      toolBar={
        <ToolDetail
          textButtonNew="Nova"
          viewButtonSaveAndBack
          viewButtonNew={!isNew}
          viewButtonDelete={!isNew}
          onClickSave={handleSubmit(handleSave)}
          onClickSaveAndBack={handleSubmit(handleSaveAndBack)}
          onClickBack={handleBack}
          onClickDelete={handleDelete}
          onClickNew={handleNew}
          disabled={isMutating || isFetching}
        />
      }
    >
      {fetchError && !isFetching && (
        <Alert severity="error" sx={{ m: 1 }}>
          {(fetchError as Error).message || "Erro ao carregar cidade"}
        </Alert>
      )}

      {isFetching && !isNew && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 300,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {mutationError && (
        <Alert severity="error" sx={{ m: 1 }}>
          {(mutationError as Error).message || "Erro ao processar"}
        </Alert>
      )}

      {(!isFetching || isNew) && (
        <VForm onSubmit={handleSubmit(handleSave)}>
          <Box
            margin={1}
            display="flex"
            flexDirection="column"
            component={Paper}
            variant="outlined"
          >
            <Grid container direction="column" padding={2} spacing={2}>
              {/* Loading Bar */}
              {isMutating && (
                <Grid item>
                  <LinearProgress variant="indeterminate" />
                </Grid>
              )}

              <Grid item>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Geral
                </Typography>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={8} md={6} lg={4} xl={2}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <VTextField
                        {...field}
                        fullWidth
                        label="Nome"
                        disabled={isMutating}
                        error={!!error}
                        helperText={error?.message}
                        inputProps={{
                          "aria-describedby": error ? "name-error" : undefined,
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </VForm>
      )}
    </LayoutBasePage>
  );
}
