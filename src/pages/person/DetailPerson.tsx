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
import { ToolDetail } from "../../shared/components";
import { VTextField, VForm } from "../../shared/forms";
import { LayoutBasePage } from "../../shared/layouts";
import {
  useCreatePerson,
  useDeletePerson,
  usePersonById,
  useUpdatePerson,
} from "../../shared/hooks";
import { PersonFormData, PersonSchema } from "../../shared/schemas";
import { AutoCompleteCity } from "./components/AutoCompleteCity";

export function DetailPerson() {
  const { id = "new" } = useParams<"id">();
  const navigate = useNavigate();
  const isNew = id === "new";

  const {
    data: person,
    isLoading: isFetching,
    error: fetchError,
  } = usePersonById(id);
  const createMutation = useCreatePerson();
  const updateMutation = useUpdatePerson(Number(id));
  const deleteMutation = useDeletePerson();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
  } = useForm<PersonFormData>({
    resolver: zodResolver(PersonSchema),
    mode: "onBlur",
    defaultValues: {
      nameComplete: "",
      email: "",
      cityId: undefined,
    },
  });

  useEffect(() => {
    if (person && !isNew) {
      setValue("nameComplete", person.nameComplete);
      setValue("email", person.email);
      setValue("cityId", person.cityId);
    }
  }, [person, isNew, setValue]);

  const handleSave = useCallback(
    async (data: PersonFormData) => {
      try {
        if (isNew) {
          const newPersonId = await createMutation.mutateAsync(data);
          navigate(`/person/detail/${newPersonId}`);
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
    async (data: PersonFormData) => {
      try {
        if (isNew) {
          await createMutation.mutateAsync(data);
        } else {
          await updateMutation.mutateAsync(data);
        }
        navigate("/person");
      } catch (error) {
        console.error("Erro ao salvar:", error);
      }
    },
    [isNew, createMutation, updateMutation, navigate]
  );

  const handleDelete = useCallback(async () => {
    if (confirm("Realmente deseja apagar esta pessoa?")) {
      try {
        await deleteMutation.mutateAsync(Number(id));
        navigate("/person");
      } catch (error) {
        console.error("Erro ao deletar:", error);
      }
    }
  }, [id, deleteMutation, navigate]);

  const handleNew = useCallback(() => {
    navigate("/person/detail/new");
  }, [navigate]);

  const handleBack = useCallback(() => {
    navigate("/person");
  }, [navigate]);

  const isMutating =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;
  const mutationError =
    createMutation.error || updateMutation.error || deleteMutation.error;

  return (
    <LayoutBasePage
      title={isNew ? "Nova Pessoa" : person?.nameComplete || "Carregando..."}
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
          {(fetchError as Error).message || "Erro ao carregar pessoa"}
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

              {/* Nome Completo */}
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={8} md={6} lg={4} xl={2}>
                  <Controller
                    name="nameComplete"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <VTextField
                        {...field}
                        fullWidth
                        label="Nome Completo"
                        disabled={isMutating}
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              {/* Email */}
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={8} md={6} lg={4} xl={2}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <VTextField
                        {...field}
                        fullWidth
                        label="E-mail"
                        type="email"
                        disabled={isMutating}
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={8} md={6} lg={4} xl={2}>
                  <AutoCompleteCity control={control} disabled={isMutating} />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </VForm>
      )}
    </LayoutBasePage>
  );
}
