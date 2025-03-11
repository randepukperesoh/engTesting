import { useState } from "react";
import { toast } from "react-toastify";

const api = import.meta.env.VITE_API_URL;

export const useResetPassword = () => {
  const [password, setPassword] = useState("");

  const handleReset = async (callback?: () => void) => {
    const formData = new FormData();
    formData.append("password", password);

    await fetch(api + "/main/api/profile/ChangePassword", {
      method: "POST",
      body: formData,
    });

    toast.success("Пароль успешно изменен");

    callback?.();
  };

  return {
    setPassword,
    handleReset,
  };
};
