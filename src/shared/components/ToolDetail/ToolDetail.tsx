import { Box, Button, Divider, Icon, Paper, Skeleton, Theme, Typography, useMediaQuery, useTheme } from "@mui/material";

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
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery((theme: Theme) =>theme.breakpoints.down('md'));

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
            {(viewButtonSave && !viewButtonSaveLoad ) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='contained'
                    onClick={onClickSave}
                    startIcon={<Icon>save</Icon>}
                >
                  <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                     Salvar
                  </Typography>
                </Button>
            )}

            {viewButtonSaveLoad && (
                <Skeleton width={110} height={60} />
            )}
            
            {(viewButtonSaveAndBack && !viewButtonSaveAndBackLoad && !smDown && !mdDown) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={onClickSaveAndBack}
                    startIcon={<Icon>save</Icon>}
                >
                   <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                    Salvar e Voltar
                   </Typography>
                </Button>
            )}

           { (viewButtonSaveAndBackLoad && !smDown && !mdDown) &&( 
              <Skeleton width={180} height={60} />
           )}

            {(viewButtonDelete && !viewButtonDeleteLoad) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={onClickDelete}
                    startIcon={<Icon>delete</Icon>}
                >
                   <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                     Apagar
                   </Typography>
                </Button>
            )}
            
           {viewButtonDeleteLoad &&( 
             <Skeleton width={110} height={60} />
           )}
            
            {(viewButtonNew && !viewButtonNewLoad && !smDown) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={onClickNew}
                    startIcon={<Icon>add</Icon>}
                >
                   <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                    {textButtonNew}
                   </Typography>
                </Button>
            )}

            {(viewButtonNewLoad && !smDown) && (
              <Skeleton width={110} height={60} />
            )}
            
            {viewButtonBack && (viewButtonNew || viewButtonDelete || viewButtonSave || viewButtonSaveAndBack) && (
              <Divider variant='middle' orientation='vertical' />
            )}


            {(viewButtonBack && !viewButtonBackLoad) &&(
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={onClickBack}
                    startIcon={<Icon>arrow_back</Icon>}
                >
                   <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                       Voltar
                   </Typography>
                </Button>
            )}
            {viewButtonBackLoad &&(
              <Skeleton width={110} height={60} />
            )}
        </Box>
    );
};