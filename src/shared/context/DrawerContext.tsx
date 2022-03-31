import { createContext, useCallback, useContext, useState } from "react";
import { ThemeProvider } from '@mui/material';
import { DarkTheme, LightTheme } from '../themes';
import { Box } from "@mui/system";



interface IDrawerContextData{
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
    return useContext(DrawerContext);
}

export const DrawerProvider: React.FC = ({children}) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen)

    }, []);

    return (
        <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen}}>
            {children}
        </DrawerContext.Provider>
    )
}