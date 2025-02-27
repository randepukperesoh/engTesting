import { FC, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../../shared/stores/useUserStore";

const useCheckCookie = () => {
  const { setIsGroup, setIsLogined } = useUserStore();

  useEffect(() => {
    console.log("ss");
    if (document.cookie.search("stToken")) {
      setIsLogined(true);
    }

    if (document.cookie.search("stTP_ConId")) {
      setIsGroup(true);
    }
  }, []);
};

const ProtectedRoute: FC = () => {
  useCheckCookie();

  const { isLogined, isGroup } = useUserStore();

  if (!isLogined && !isGroup) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
