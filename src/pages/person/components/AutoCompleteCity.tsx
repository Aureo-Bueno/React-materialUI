import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../../shared/hooks";
import { CitiesService } from "../../../shared/services/api/cities/CitiesService";


type TAutoCompleteOption = {
    id: number;
    label: string;
}

interface IAutoCompleteCityProps {
    isExternalLoading?: boolean;
}
export const AutoCompleteCity: React.FC<IAutoCompleteCityProps> = ({ isExternalLoading = false }) => {
   
    const {fieldName, registerField, defaultValue, error, clearError} = useField('cityId');
    const { debounce } = useDebounce();

   const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
   
   const [options, setOptions] = useState<TAutoCompleteOption[]>([]);
   const [isLoading, setIsLoading] = useState(false);
   const [search, setSearch] = useState('');

   useEffect(() => {
       registerField({
           name: fieldName,
           getValue: () => selectedId ,
           setValue: (_, newSelectedId) => selectedId,

       });
   }, [registerField, fieldName, selectedId]);
    
   useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            CitiesService.getAll(1,search )
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                    // alert(result.message);
                    } else {
                        console.log(result);

                        setOptions(result.data.map(city => ({id: city.id, label: city.name})));
                    }
                });
        });
   }, [search]);

   const autoCompleteSelectedOption = useMemo(() => {
        if(!selectedId) return null;

        const selectedOption = options.find(opcao => opcao.id === selectedId);
        if(!selectedOption) return null;

        return selectedOption;
    }, [selectedId, options]);
   
    return (
        <Autocomplete 
          openText='Abrir'
          closeText='Fechar'
          noOptionsText='Sem Opções'
          loadingText='Carregando'

          value={autoCompleteSelectedOption}
          loading={isLoading}
          disabled={isExternalLoading}
          popupIcon={isExternalLoading ||isLoading ? <CircularProgress size={28} /> : undefined}
          onInputChange={(_, newValue) => setSearch(newValue)}
          options={options}
          onChange={(_, newValue) => {setSelectedId(newValue?.id); setSearch(''); clearError();}}
          renderInput={(params) => (
              <TextField 
               {...params}
               label="Cidade"
               error={!!error}
               helperText={error}
              />
            )}
        />
    );
};