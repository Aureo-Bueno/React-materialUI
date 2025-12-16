import {
  Autocomplete,
  CircularProgress,
  TextField,
  type AutocompleteProps,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { Controller, type Control, type FieldPath } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { CitiesService } from "../../../shared/services/api/cities/CitiesService";
import { PersonFormData } from "../../../shared/schemas";
import { useDebounce } from "../../../shared/hooks";

type TAutoCompleteOption = {
  id: number;
  label: string;
};

interface IAutoCompleteCityProps {
  control: Control<PersonFormData>;
  disabled?: boolean;
}

export function AutoCompleteCity({
  control,
  disabled = false,
}: IAutoCompleteCityProps) {
  const { debounce } = useDebounce(300);
  const [search, setSearch] = useState("");

  const { data: citiesData, isLoading } = useQuery({
    queryKey: ["cities", "autocomplete", search],
    queryFn: async () => {
      const result = await CitiesService.getAll(1, search);

      if (result instanceof Error) {
        throw new Error(result.message);
      }

      return result.data.map((city) => ({
        id: city.id,
        label: city.name,
      }));
    },
    staleTime: 1000 * 60 * 5,
    enabled: search.length > 0,
  });

  const options = citiesData || [];

  const handleInputChange = useCallback(
    (_: React.SyntheticEvent, newValue: string) => {
      debounce(() => {
        setSearch(newValue);
      });
    },
    [debounce]
  );

  return (
    <Controller
      name="cityId"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          options={options}
          getOptionLabel={(option: TAutoCompleteOption | number) => {
            if (typeof option === "number") {
              return options.find((o) => o.id === option)?.label || "";
            }
            return option.label;
          }}
          isOptionEqualToValue={(option, value) => {
            if (typeof value === "number") {
              return option.id === value;
            }
            return option.id === value?.id;
          }}
          value={
            field.value
              ? options.find((o) => o.id === field.value) || null
              : null
          }
          onChange={(_, newValue) => {
            field.onChange(newValue?.id || null);
          }}
          onInputChange={handleInputChange}
          loading={isLoading}
          disabled={disabled || isLoading}
          fullWidth
          openText="Abrir"
          closeText="Fechar"
          noOptionsText={search ? "Sem Opções" : "Digite para buscar"}
          loadingText="Carregando"
          popupIcon={isLoading ? <CircularProgress size={20} /> : undefined}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Cidade"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
      )}
    />
  );
}
