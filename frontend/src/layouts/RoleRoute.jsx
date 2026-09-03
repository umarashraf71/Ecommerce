import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

function RoleRoute({ allowedRoles }) {

  const { isAuthenticated, userRole } = useAuth();

  // User is not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // User doesn't have required role
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default RoleRoute;