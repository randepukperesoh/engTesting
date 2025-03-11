import { useState } from "react";
import { toast } from "react-toastify";

const api = import.meta.env.VITE_API_URL;

export const useHandleCreateExamRandGroup = () => {
  const [title, setTitle] = useState("");

  const handleCreateExamRandGroup = async (
    list_id: string,
    callback?: () => void
  ) => {
    try {
      if (!title) throw new Error("Заполните поля");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("list_id", list_id);

      const response = await fetch(
        api + "/main/admin/constructor/api/createExamRandGroup",
        { method: "POST", body: formData }
      );

      const res = await response.json();

      if (!res.status) {
        throw new Error("Не удалось создать блок");
      }
      callback?.();
      toast.success("Блок создан");
    } catch (e) {
      console.error(e);
      toast.error("Не удалось создать блок");
    }
  };

  return {
    handleCreateExamRandGroup,
    setTitle,
  };
};
