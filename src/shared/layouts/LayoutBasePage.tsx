import { useTheme, Typography, IconButton, Icon, useMediaQuery, Theme } from "@mui/material";
import { Box } from "@mui/system";
import { useDrawerContext } from "../context";

interface ILayoutBasePAgeProps{
  title: string;
  
}
export const LayoutBasePage: React.FC<ILayoutBasePAgeProps> = ({children, title}) => {
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const theme = useTheme();

    const { toggleDrawerOpen } = useDrawerContext();
    

    return (
        <Box height="100%" display="flex" flexDirection="column" gap={1}>
            <Box padding={1} display="flex" alignItems="center" height={theme.spacing(12)}>
             {smDown && (
                <IconButton onClick={toggleDrawerOpen}>
                 <Icon>menu</Icon>
                </IconButton>
             )}
             
              <Typography variant="h5">
                 {title}
              </Typography>
            </Box>

            <Box >
               Barra de Ferramentas
            </Box>

            <Box >
              {children}
            </Box>
        </Box>
    );
};