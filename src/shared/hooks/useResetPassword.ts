import { useState } from "react";

export const useResetPassword = () => {
  const [password, setPassword] = useState("");

  const handleReset = async (callback?: () => void) => {
    const formData = new FormData();
    formData.append("password", password);

    const response = await fetch("/back/main/api/profile/ChangePassword", {
      method: "POST",
      body: formData,
    });

    const res = await response.json();

    console.log({ res });
    callback?.();
  };

  return {
    setPassword,
    handleReset,
  };
};
