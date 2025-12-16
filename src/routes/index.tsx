import { Navigate, type RouteObject } from "react-router-dom";
import {
  Dashboard,
  ListPerson,
  DetailPerson,
  ListCities,
  DetailCity,
} from "../pages";

export const appRoutes: RouteObject[] = [
  { path: "/home", element: <Dashboard /> },
  { path: "/person", element: <ListPerson /> },
  { path: "/person/detail/:id", element: <DetailPerson /> },
  { path: "/city", element: <ListCities /> },
  { path: "/city/detail/:id", element: <DetailCity /> },
  { path: "*", element: <Navigate to="/home" replace /> },
];

export const DRAWER_ROUTES = [
  { icon: "home", path: "/home", label: "Home" },
  { icon: "location_city", path: "/city", label: "Cidade" },
  { icon: "people", path: "/person", label: "Pessoa" },
];
