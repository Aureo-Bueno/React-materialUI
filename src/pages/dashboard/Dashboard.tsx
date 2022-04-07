import { ToolDetail } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";


export const Dashboard = () => {

    return(
        <LayoutBasePage 
          title='Página Inicial' 
          toolBar={(
                <ToolDetail viewButtonNew viewButtonSaveAndBack viewButtonSaveAndBackLoad viewButtonBack={false} />
            )}
        >
            Testando
        </LayoutBasePage>
    );
};