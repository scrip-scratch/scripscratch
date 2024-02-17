import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const isAuthenticated = Math.random() < 0.1;

  const from = "/";

  return isAuthenticated === true ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: { pathname: from } }} />
  );
};
