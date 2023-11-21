import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "state/stateAuth";

export default function Guards({ rol }) {
  const { isAuthenticated, info } = useAuth();
  /*return isAuthenticated && rol === info.role ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );*/
  if (isAuthenticated) {
    if (rol === info.rol) {
      return <Outlet />;
    } else {
      console.log("error-rol");
    }
  } else {
    return <Navigate to="/" />;
  }
}
