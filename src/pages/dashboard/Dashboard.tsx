import { ToolList } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";


export const Dashboard = () => {

    return(
        <LayoutBasePage 
          title='Página Inicial' 
          toolBar={(
                <ToolList 
                   viewInputSearch    
                   textButtonNew='Nova'
                />
            )}
        >
            Testando
        </LayoutBasePage>
    );
};