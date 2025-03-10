import { useState } from "react";
import { toast } from "react-toastify";

export const useHandleCreateExamRandList = () => {
  const [title, setTitle] = useState("");

  const handleCreateExamRandList = async (callback?: () => void) => {
    try {
      if (!title) throw new Error("Заполните поля");

      const formData = new FormData();
      formData.append("title", title);

      const response = await fetch(
        "/back/main/admin/constructor/api/createExamRandList",
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
    handleCreateExamRandList,
    setTitle,
  };
};
