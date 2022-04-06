import { useTheme, Typography, IconButton, Icon, useMediaQuery, Theme } from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode } from "react";
import { useDrawerContext } from "../context";

interface ILayoutBasePAgeProps{
  title: string;
  toolBar?: ReactNode;
  
}
export const LayoutBasePage: React.FC<ILayoutBasePAgeProps> = ({children, title, toolBar}) => {
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
    const theme = useTheme();

    const { toggleDrawerOpen } = useDrawerContext();
    

    return (
        <Box height="100%" display="flex" flexDirection="column" gap={1}>
            <Box padding={1} display="flex" alignItems="center" gap={1} height={theme.spacing(12)}>
             {smDown && (
                <IconButton onClick={toggleDrawerOpen}>
                 <Icon>menu</Icon>
                </IconButton>
             )}
             
              <Typography 
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                variant={smDown ? 'h5': mdDown ? 'h4' : 'h3'}
              >
                 {title}
              </Typography>
            </Box>

            {toolBar && (
              <Box>
                {toolBar}
              </Box>
            )}

            <Box flex={1} overflow="auto">    
              {children}
            </Box>
        </Box>
    );
};