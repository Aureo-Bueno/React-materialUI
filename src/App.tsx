import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './shared/forms/TranslateYup'

import { AppRoutes } from './routes';
import { SideBar } from './shared/components';
import { DrawerProvider } from './shared/context';
import { AppThemeProvider } from './shared/context/ThemeContext';


export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>

          <SideBar>
            <AppRoutes />
          </SideBar>
        </BrowserRouter>

      </DrawerProvider>
    </AppThemeProvider>
  );
}

