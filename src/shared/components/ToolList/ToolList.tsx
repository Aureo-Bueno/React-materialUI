import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";

interface IToolListProps{
    textSearch?: string;
    viewInputSearch?: boolean;
    alterTextSearch?: (newText: string) => void;
    textButtonNew?: string;
    viewButtonNew?: boolean;
    onClickNew?: () => void;
}
export const ToolList: React.FC<IToolListProps> = ({
    textSearch =  '',
    viewInputSearch = false,
    alterTextSearch,
    onClickNew,
    textButtonNew = 'Novo',
    viewButtonNew = true,
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
            {viewInputSearch && (
              <TextField
                    size="small"
                    value={textSearch}
                    placeholder='Pesquisar...'
                    onChange={(e) => alterTextSearch?.(e.target.value)}
               />
            )}

            <Box flex={1} display="flex" justifyContent="end">
               {viewButtonNew && (
                 <Button
                   color='primary'
                   disableElevation
                   variant='contained'
                   onClick={onClickNew}
                   endIcon={<Icon>add</Icon>}
                 >
                   {textButtonNew}
                 </Button>
               )}
            </Box>
        </Box>
    );
}