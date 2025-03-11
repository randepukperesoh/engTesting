import { useState } from "react";

const api = import.meta.env.VITE_API_URL;

export const useChangeUserPassword = (id: string) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const validatePassword = (password: string): boolean => {
    if (password.length < 4) {
      setError("Пароль должен содержать минимум 4 символов.");
      return false;
    }
    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      setError("Пароль должен содержать буквы и цифры.");
      return false;
    }
    setError(null);
    return true;
  };

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ): boolean => {
    if (password !== confirmPassword) {
      setError("Пароли не совпадают.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleChangePassword = async () => {
    if (!validatePassword(password)) {
      return;
    }

    if (!validateConfirmPassword(password, confirmPassword)) {
      return;
    }

    // ПОЧИНИТЬ ВАЛИДАЦИЮ
    const data = new FormData();
    data.append("user_id", id);
    data.append("password", password);
    try {
      await fetch(api + "/main/admin/users/api/UserChangePassword", {
        method: "POST",
        body: data,
      });
    } catch (err) {
      setError("Произошла ошибка при изменении пароля.");
      console.error(err);
    }
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    handleChangePassword,
  };
};
