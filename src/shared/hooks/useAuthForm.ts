import { useCallback, useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";

export const useAuthForm = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    
    const {setIsLogined} = useUserStore();

    const navigate = useNavigate();

    const handleLogin = useCallback( async () => {
      const formData = new FormData();
      formData.append("login", login);
      formData.append("password", password);
      formData.append("api", "AuthByPassword");
  
      const response = await fetch("https://speaktest.exesfull.com/auth/api/", {
        method: "POST",
        body: formData,
      });

      const res = await response.json();

      setIsLogined(res.status)

      navigate(res.status? '/': 'login')
    }, [login, navigate, password, setIsLogined]);
  
    return {
      handleLogin,
      login,
      setLogin,
      password,
      setPassword,
    };
  };
  