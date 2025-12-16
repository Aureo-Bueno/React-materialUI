import { Card, CardContent, Box, Typography, Skeleton, Alert } from "@mui/material";
import { IStatCardProps } from "./types";

export function StatCard({
  title,
  value,
  isLoading,
  error,
  icon,
}: IStatCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: 3,
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          {icon}
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>

        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <Skeleton variant="text" width={100} height={48} />
          </Box>
        )}

        {error && !isLoading && (
          <Alert severity="error" sx={{ my: 2 }}>
            {error.message || "Erro ao carregar dados"}
          </Alert>
        )}

        {!isLoading && !error && value !== undefined && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 4,
              minHeight: 120,
            }}
          >
            <Typography
              variant="h2"
              component="div"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {value.toLocaleString("pt-BR")}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
