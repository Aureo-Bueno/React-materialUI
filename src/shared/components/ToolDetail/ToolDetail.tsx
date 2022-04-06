import { Box, Button, Divider, Icon, Paper, useTheme } from "@mui/material";

interface IToolDetailProps{
  textButtonNew?: string;
  viewButtonNew?: boolean;
  viewButtonBack?: boolean;
  viewButtonDelete?: boolean;
  viewButtonSave?: boolean;
  viewButtonSaveAndBack?: boolean;

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
            {viewButtonSave && (<Button
                    color='primary'
                    disableElevation
                    variant='contained'
                    onClick={onClickSave}
                    startIcon={<Icon>save</Icon>}
                >Salvar</Button>
            )}
            {viewButtonSaveAndBack && (<Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={onClickSaveAndBack}
                    startIcon={<Icon>save</Icon>}
                >Salvar e Voltar</Button>
            )}
            {viewButtonDelete && (<Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={onClickDelete}
                    startIcon={<Icon>delete</Icon>}
                >Apagar</Button>
            )}
            {viewButtonNew && (<Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={onClickNew}
                    startIcon={<Icon>add</Icon>}
                >{textButtonNew}</Button>
            )}

            <Divider variant='middle' orientation='vertical' />

            {viewButtonBack &&(<Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={onClickBack}
                    startIcon={<Icon>arrow_back</Icon>}
                >Voltar</Button>
            )}
        </Box>
    );
};