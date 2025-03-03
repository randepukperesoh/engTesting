import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute: FC = () => {
  const location = useLocation();
  const hasToken = document.cookie.includes("stToken");
  const hasGroupId = document.cookie.includes("stTP_ConId");

  if (location.pathname === "/testing") {
    if (!hasGroupId) {
      return <Navigate to="/login" />;
    }
    return <Outlet />;
  }

  if (!hasToken && !hasGroupId) {
    return <Navigate to="/login" />;
  }

  if (hasToken && !hasGroupId) {
    return <Outlet />;
  }

  if (hasToken && hasGroupId) {
    if (location.pathname !== "/testing") {
      return <Navigate to="/testing" />;
    }
    return <Outlet />;
  }

  if (hasGroupId && !hasToken) {
    if (location.pathname !== "/testing") {
      return <Navigate to="/testing" />;
    }
    return <Outlet />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
