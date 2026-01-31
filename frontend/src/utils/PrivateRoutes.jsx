import { Navigate, Outlet } from "react-router";

export default function PrivateRoutes() {
  const isAuthenticated = !!localStorage.getItem("access");

  return isAuthenticated ? <Outlet /> : <Navigate to="/login/" />;
}
