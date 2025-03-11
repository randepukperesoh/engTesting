import { useCallback, useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const api = import.meta.env.VITE_API_URL;

export const useAuthForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const { setIsLogined } = useUserStore();

  const navigate = useNavigate();

  const handleLogin = useCallback(async () => {
    const formData = new FormData();
    formData.append("login", login);
    formData.append("password", password);
    formData.append("api", "AuthByPassword");

    const response = await fetch(api+ "/auth/api/", {
      method: "POST",
      body: formData,
    });

    const res: { status: boolean } = await response.json();

    const { status } = res;
    setIsLogined(status);

    if(!status){
      toast.error('Неверный логин или пароль')
    }
    navigate(status ? "/" : "");
  }, [login, navigate, password, setIsLogined]);

  return {
    handleLogin,
    login,
    setLogin,
    password,
    setPassword,
  };
};