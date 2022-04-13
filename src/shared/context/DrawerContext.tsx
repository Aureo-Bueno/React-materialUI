import { createContext, useCallback, useContext, useState } from "react";
import { ThemeProvider } from '@mui/material';
import { DarkTheme, LightTheme } from '../themes';
import { Box } from "@mui/system";

interface IDrawerOption{
    icon: string;
    path: string;
    label: string;
}

interface IDrawerContextData{
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
    drawerOptions: IDrawerOption[];
    setDrawerOption: (newDrawerOptions: IDrawerOption[]) => void;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
    return useContext(DrawerContext);
}

export const DrawerProvider: React.FC = ({children}) => {
    const [drawerOptions, setIsDrawerOptions] = useState<IDrawerOption[]>([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);

    }, []);

    const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
        setIsDrawerOptions(newDrawerOptions);

    }, []);

    return (
        <DrawerContext.Provider value={{ isDrawerOpen, drawerOptions ,toggleDrawerOpen, setDrawerOption: handleSetDrawerOptions}}>
            {children}
        </DrawerContext.Provider>
    )
}