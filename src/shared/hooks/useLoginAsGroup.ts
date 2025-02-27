import { useCallback, useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";

interface IGroup {
  id: boolean | number;
  created_at: string;
  title: string;
  code: string;
  alert: string | null;
}

export const useLoginAsGroup = () => {
  const [code, setCode] = useState("123456");

  const navigate = useNavigate();

  const { setIsGroup } = useUserStore();

  const handleLoginAsGroup = useCallback(async () => {
    const data = new FormData();
    data.append("code", code);
    data.append("api", "searchTechPlace");
    const response = await fetch("/back/auth/api/", {
      method: "POST",
      body: data,
    });

    const res: IGroup = await response.json();

    const value = res.id !== false;

    setIsGroup(value);

    value && navigate("/testing");
  }, [code, setIsGroup]);

  return { handleLoginAsGroup, setCode };
};
