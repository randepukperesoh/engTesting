import { useState } from "react";
import { toast } from "react-toastify";

export const useResetPassword = () => {
  const [password, setPassword] = useState("");

  const handleReset = async (callback?: () => void) => {
    const formData = new FormData();
    formData.append("password", password);

    await fetch("/back/main/api/profile/ChangePassword", {
      method: "POST",
      body: formData,
    });

    
    toast.success('Пароль успешно изменен')
    
    callback?.();
  };

  return {
    setPassword,
    handleReset,
  };
};
