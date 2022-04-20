import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom"
import { ToolList } from "../../shared/components"
import { useDebounce } from "../../shared/hooks";
import { LayoutBasePage } from "../../shared/layouts"
import { PersonService } from "../../shared/services/api/person/PersonService";


export const ListPerson: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce(3000, false);

    const search = useMemo(() => {
        return searchParams.get('search') || ''; 
    }, [searchParams]);

    useEffect(() => {

        debounce(() => {
            PersonService.getAll(1, search)
            .then((result) => {
                if(result instanceof Error){
                   alert(result.message);
                }else{
                    console.log(result);
                }
            });
        });
    }, [search]);

    return (
        <LayoutBasePage 
           title='Listagem de Pessoas' 
           toolBar={
             <ToolList  
                textButtonNew='Nova Pessoa'
                viewInputSearch
                textSearch={search}
                alterTextSearch={text => setSearchParams({search: text}, {replace: true})}
             />
            }
        >

        </LayoutBasePage>
    )
}