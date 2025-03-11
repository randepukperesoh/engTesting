import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCallback } from "react";

const api = import.meta.env.VITE_API_URL;

export const useExit = () => {
  const { setIsGroup, setIsLogined } = useUserStore();
  const navigate = useNavigate();

  const handleExit = useCallback(async () => {
    try {
      setIsLogined(false);
      setIsGroup(false);

      navigate("/login");

      await fetch(api + "/main/api/profile/exit", {
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
