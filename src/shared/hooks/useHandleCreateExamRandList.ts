import { useState } from "react";
import { toast } from "react-toastify";

const api = import.meta.env.VITE_API_URL;

export const useHandleCreateExamRandList = () => {
  const [title, setTitle] = useState("");

  const handleCreateExamRandList = async (callback?: () => void) => {
    try {
      if (!title) throw new Error("Заполните поля");

      const formData = new FormData();
      formData.append("title", title);

      const response = await fetch(
        api + "/main/admin/constructor/api/createExamRandList",
        { method: "POST", body: formData }
      );

      const res = await response.json();

      if (!res.status) {
        throw new Error("Не удалось создать список");
      }
      callback?.();
      toast.success("Список создан");
    } catch (e) {
      console.error(e);
      toast.error("Не удалось создать список");
    }
  };

  return {
    handleCreateExamRandList,
    setTitle,
  };
};
