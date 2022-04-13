import { useMemo } from "react";
import { useSearchParams } from "react-router-dom"
import { ToolList } from "../../shared/components"
import { LayoutBasePage } from "../../shared/layouts"


export const ListCity: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const search = useMemo(() => {
        return searchParams.get('search') || ''; 
    }, [searchParams]);

    return (
        <LayoutBasePage 
           title='Listagem de Cidades' 
           toolBar={
             <ToolList  
                textButtonNew='New City'
                viewInputSearch
                textSearch={search}
                alterTextSearch={text => setSearchParams({search: text}, {replace: true})}
             />
            }
        >

        </LayoutBasePage>
    )
}