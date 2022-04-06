import { ToolBar } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";


export const Dashboard = () => {

    return(
        <LayoutBasePage 
          title='Página Inicial' 
          toolBar={(
                <ToolBar 
                   viewInputSearch    
                   textButtonNew='Nova'
                />
            )}
        >
            Testando
        </LayoutBasePage>
    );
};