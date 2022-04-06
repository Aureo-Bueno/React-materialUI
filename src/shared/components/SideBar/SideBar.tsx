import {  Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material"
import { Box } from "@mui/system"
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { useAppThemeContext, useDrawerContext } from "../../context";

interface IListItemLinkProps{
    to: string;
    icon: string;
    label: string;
    onClick: (() => void) | undefined;
}
const ListItemLink: React.FC<IListItemLinkProps> = ({to, icon, label, onClick}) => {

    const navigate = useNavigate();

    const resolvedPath = useResolvedPath(to);
    const match = useMatch({path: resolvedPath.pathname, end: false});
    
    const handleClick = () => {
        navigate(to);
        onClick?.();
    };

    return (
        <ListItemButton selected={!!match}  onClick={onClick}>
            <ListItemIcon>
                <Icon>{ icon }</Icon>
                </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    )
}


export const SideBar: React.FC = ({ children }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
    const { toggleTheme } = useAppThemeContext();

    return(
        <>
            <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
                <Box width={theme.spacing(20)} height="100%" display="flex" flexDirection="column">
                    <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
                      <Avatar sx={{ height: theme.spacing(12), width: theme.spacing(12)}} alt="Aureo" src="" />
                    </Box>
                    <Divider />

                    <Box flex={1}>
                        <List component="nav">
                            {drawerOptions.map(drawerOption =>(
                                <ListItemLink 
                                    key={drawerOption.path}
                                    icon={drawerOption.icon}
                                    to={drawerOption.path}
                                    label={drawerOption.label} 
                                    onClick={smDown ? toggleDrawerOpen : undefined} 
                                />
                            ))}
                        </List>
                    </Box>

                    <Box>
                        <List component="nav">
                            <ListItemButton onClick={toggleTheme}>
                                <ListItemIcon>
                                    <Icon>dark_mode</Icon>
                                </ListItemIcon>
                                <ListItemText primary="Alternar Theme" />
                            </ListItemButton>
                        </List>
                    </Box>
                </Box>
            </Drawer>
            <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(20)}>
             {children}
            </Box>
        </>
    )
}