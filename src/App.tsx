import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './shared/forms/TranslateYup'

import { AppRoutes } from './routes';
import { Login, SideBar } from './shared/components';
import { AuthProvider, DrawerProvider } from './shared/context';
import { AppThemeProvider } from './shared/context/ThemeContext';


export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>
          <DrawerProvider>
            <BrowserRouter>

              <SideBar>
                <AppRoutes />
              </SideBar>
            </BrowserRouter>

          </DrawerProvider>
        </Login>
        
      </AppThemeProvider>
    </AuthProvider>
  );
}

