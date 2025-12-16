import { useEffect } from "react";
import {
  AppThemeProvider,
  AuthProvider,
  DrawerProvider,
  useDrawerContext,
} from "./shared/context";
import { DRAWER_ROUTES } from "./routes";
import { Login, SideBar } from "./shared/components";
import { Outlet } from "react-router-dom";

function DrawerLayout() {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions(DRAWER_ROUTES);
  }, [setDrawerOptions]);

  return (
    <SideBar>
      <Outlet />
    </SideBar>
  );
}

export function App() {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>
          <DrawerProvider>
            <DrawerLayout />
          </DrawerProvider>
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
}
