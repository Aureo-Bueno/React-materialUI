import { Box, Button, Divider, Icon, Paper, Skeleton, useTheme } from "@mui/material";

interface IToolDetailProps{
  textButtonNew?: string;
  viewButtonNew?: boolean;
  viewButtonBack?: boolean;
  viewButtonDelete?: boolean;
  viewButtonSave?: boolean;
  viewButtonSaveAndBack?: boolean;

  viewButtonNewLoad?: boolean,
  viewButtonBackLoad?: boolean,
  viewButtonDeleteLoad?: boolean,
  viewButtonSaveLoad?: boolean,
  viewButtonSaveAndBackLoad?: boolean,


  onClickNew?: () => void;
  onClickBack?: () => void;
  onClickDelete?: () => void;
  onClickSave?: () => void;
  onClickSaveAndBack?: () => void;
}
export const ToolDetail: React.FC<IToolDetailProps> = ({
    textButtonNew = 'Novo',

    viewButtonNew = true,
    viewButtonBack = true,
    viewButtonDelete = true,
    viewButtonSave = true,
    viewButtonSaveAndBack = false,

    viewButtonNewLoad = false,
    viewButtonBackLoad = false,
    viewButtonDeleteLoad = false,
    viewButtonSaveLoad = false,
    viewButtonSaveAndBackLoad = false,

    onClickNew,
    onClickBack,
    onClickDelete,
    onClickSave,
    onClickSaveAndBack,
}) => {
    const theme = useTheme();
    return (
        <Box 
          gap={1}
          height={theme.spacing(5)} 
          marginX={1} 
          padding={1}
          paddingX={2}
          display="flex"
          alignItems="center"
          component={Paper}
        >
            {(viewButtonSave && !viewButtonSaveLoad ) && (<Button
                    color='primary'
                    disableElevation
                    variant='contained'
                    onClick={onClickSave}
                    startIcon={<Icon>save</Icon>}
                >Salvar</Button>
            )}

            {viewButtonSaveLoad && (
                <Skeleton width={110} height={60} />
            )}
            
            {(viewButtonSaveAndBack && !viewButtonSaveAndBackLoad ) && (<Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={onClickSaveAndBack}
                    startIcon={<Icon>save</Icon>}
                >Salvar e Voltar</Button>
            )}

           { viewButtonSaveAndBackLoad &&( 
              <Skeleton width={180} height={60} />
           )}

            {(viewButtonDelete && !viewButtonDeleteLoad) && (<Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={onClickDelete}
                    startIcon={<Icon>delete</Icon>}
                >Apagar</Button>
            )}
            
           {viewButtonDeleteLoad &&( 
             <Skeleton width={110} height={60} />
           )}
            
            {(viewButtonNew && !viewButtonNewLoad) && (<Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={onClickNew}
                    startIcon={<Icon>add</Icon>}
                >{textButtonNew}</Button>
            )}

            {viewButtonNewLoad &&(
              <Skeleton width={110} height={60} />
            )}
            <Divider variant='middle' orientation='vertical' />
            


            {(viewButtonBack && !viewButtonBackLoad) &&(<Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={onClickBack}
                    startIcon={<Icon>arrow_back</Icon>}
                >Voltar</Button>
            )}
            {viewButtonBackLoad &&(
              <Skeleton width={110} height={60} />
            )}
        </Box>
    );
};