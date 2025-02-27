import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCallback } from "react";

export const useExit = () => {
  const { setIsGroup, setIsLogined } = useUserStore();
  const navigate = useNavigate();

  const handleExit = useCallback(async () => {
    try {
      setIsLogined(false);
      setIsGroup(false);

      navigate("/login");

      await fetch("/back/main/api/profile/exit", {
        method: "POST",
        credentials: "include",
        body: new FormData(),
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  return {
    handleExit,
  };
};
