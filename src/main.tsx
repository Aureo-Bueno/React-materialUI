import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { appRoutes } from "./routes";
import { QueryProvider } from "./shared/context/QueryProvider";
import { queryClient } from "./shared/config/queryClient";

const container = document.getElementById("root");
if (!container) throw new Error("Root container missing in index.html");

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <QueryProvider
      queryClient={queryClient}
      enableDevTools={true}
      enableErrorLog={true}
    >
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            {appRoutes.map((route) => (
              <Route
                key={route.path || "catch-all"}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryProvider>
  </React.StrictMode>
);
