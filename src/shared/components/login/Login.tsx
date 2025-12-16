import { ReactNode, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useAuthContext } from "../../context";
import { LoginFormData, LoginSchema } from "../../schemas";
import { ILoginProps } from "./types";

export function Login({ children }: ILoginProps) {
  const { isAuthenticated, login } = useAuthContext();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /**
   * Callback memoizado para submit do formulário
   * Evita recriação desnecessária a cada render
   */
  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        await login(data.email, data.password);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Erro ao fazer login";
        setError("root", {
          type: "manual",
          message: errorMessage,
        });
      }
    },
    [login, setError]
  );

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <Box
      component="section"
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
      }}
      role="region"
      aria-label="Área de login"
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 320,
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
            aria-labelledby="login-title"
          >
            <Typography
              id="login-title"
              variant="h6"
              align="center"
              component="h1"
              sx={{ fontWeight: 600, mb: 1 }}
            >
              Identifique-se
            </Typography>

            {errors.root && (
              <Alert severity="error" role="alert">
                {errors.root.message}
              </Alert>
            )}

            <Controller
              name="email"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  disabled={isSubmitting}
                  error={!!error}
                  helperText={error?.message}
                  inputProps={{
                    autoComplete: "email",
                    "aria-describedby": error ? "email-error" : undefined,
                  }}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Senha"
                  type="password"
                  variant="outlined"
                  fullWidth
                  disabled={isSubmitting}
                  error={!!error}
                  helperText={error?.message}
                  inputProps={{
                    autoComplete: "current-password",
                    "aria-describedby": error ? "password-error" : undefined,
                  }}
                />
              )}
            />
          </Box>
        </CardContent>

        <CardActions
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 2,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting || !isValid}
            onClick={handleSubmit(onSubmit)}
            sx={{
              minWidth: 120,
              position: "relative",
            }}
            aria-busy={isSubmitting}
            aria-label={isSubmitting ? "Entrando..." : "Fazer login"}
          >
            {isSubmitting ? (
              <>
                <CircularProgress
                  size={20}
                  color="inherit"
                  sx={{
                    position: "absolute",
                    left: "50%",
                    marginLeft: "-10px",
                  }}
                />
                <span style={{ visibility: "hidden" }}>Login</span>
              </>
            ) : (
              "Login"
            )}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
