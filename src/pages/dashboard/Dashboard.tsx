import { ToolDetail } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";


export const Dashboard = () => {

    return(
        <LayoutBasePage 
          title='Página Inicial' 
          toolBar={(
                <ToolDetail viewButtonSaveAndBack />
            )}
        >
            Testando
        </LayoutBasePage>
    );
};