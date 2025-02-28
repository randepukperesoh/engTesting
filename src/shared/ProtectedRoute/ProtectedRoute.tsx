import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: FC = () => {
  const hasToken = document.cookie.includes("stToken");
  const hasGroupId = document.cookie.includes("stTP_ConId");

  // if (!hasToken) {
  //   return <Navigate to="/login" />;
  // } else if (hasToken) {
  //   return <Outlet />;
  // }

  // if (!hasGroupId) {
  //   return <Navigate to="/login" />;
  // } else if (hasGroupId) {
  //   return <Outlet />;
  // }

  return <Outlet />;
};

export default ProtectedRoute;
