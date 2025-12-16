import { Grid, Box, Container, Typography, Alert } from "@mui/material";
import { useMemo } from "react";
import { PeopleAlt, LocationCity } from "@mui/icons-material";
import { ToolList } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";
import { useCitiesCount, usePersonCount } from "../../shared/hooks";
import { StatCard } from "../../shared/components/StateCard";

export function Dashboard() {
  const citiesQuery = useCitiesCount();
  const personQuery = usePersonCount();

  const hasError = citiesQuery.isError || personQuery.isError;

  const stats = useMemo(
    () => [
      {
        id: "persons",
        title: "Total de Pessoas",
        value: personQuery.data,
        isLoading: personQuery.isLoading,
        error: personQuery.error as Error | null,
        icon: <PeopleAlt sx={{ color: "#667eea", fontSize: 28 }} />,
      },
      {
        id: "cities",
        title: "Total de Cidades",
        value: citiesQuery.data,
        isLoading: citiesQuery.isLoading,
        error: citiesQuery.error as Error | null,
        icon: <LocationCity sx={{ color: "#764ba2", fontSize: 28 }} />,
      },
    ],
    [personQuery, citiesQuery]
  );

  return (
    <LayoutBasePage
      title="Página Inicial"
      toolBar={<ToolList viewButtonNew={false} />}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {hasError && (
          <Alert
            severity="warning"
            sx={{ mb: 3 }}
            onClose={() => {
              citiesQuery.refetch();
              personQuery.refetch();
            }}
          >
            Houve um problema ao carregar alguns dados.
            <Typography
              component="span"
              sx={{ ml: 1, cursor: "pointer", textDecoration: "underline" }}
              onClick={() => {
                citiesQuery.refetch();
                personQuery.refetch();
              }}
            >
              Tentar novamente
            </Typography>
          </Alert>
        )}

        <Grid container spacing={3}>
          {stats.map((stat) => (
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6} key={stat.id}>
              <StatCard
                title={stat.title}
                value={stat.value}
                isLoading={stat.isLoading}
                error={stat.error}
                icon={stat.icon}
              />
            </Grid>
          ))}
        </Grid>

        {!citiesQuery.isLoading &&
          !personQuery.isLoading &&
          citiesQuery.data === 0 &&
          personQuery.data === 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 200,
                mt: 4,
              }}
            >
              <Typography variant="h6" color="textSecondary">
                Nenhum dado disponível no momento
              </Typography>
            </Box>
          )}
      </Container>
    </LayoutBasePage>
  );
}
