import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "state/stateAuth";

export default function GuardsClient() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
