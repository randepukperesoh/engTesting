import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../../shared/stores/useUserStore";

const ProtectedRoute: FC = () => {
  const { isLogined, isGroup } = useUserStore();

  if (!isLogined && !isGroup) {
    return <Navigate to="/login" replace />;
  }

  if (isGroup) {
    return <Navigate to="/testing" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
