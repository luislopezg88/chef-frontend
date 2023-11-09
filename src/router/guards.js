import { Outlet, Navigate } from "react-router-dom";
//import { useAuth } from "../auth/AuthProvider";

export default function ProtectedRoute() {
  const auth = { isAuthenticated: true }; //useAuth();

  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
