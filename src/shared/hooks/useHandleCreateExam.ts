import { useState } from "react";
import { toast } from "react-toastify";

const api = import.meta.env.VITE_API_URL;

export const useHandleCreateExam = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateExam = async (callback?: () => void) => {
    try {
      if (!title && title.length >= 100) return;
      if (description.length >= 1000) return;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);

      const response = await fetch(
        api + "/main/admin/constructor/api/createExam",
        { method: "POST", body: formData }
      );

      const res: { status: boolean } = await response.json();

      if (!res.status) {
        throw new Error("Не удалось создать экзамен");
      }
      callback?.();
      toast.success("Экзамен создан");
    } catch (e) {
      console.error(e);
      toast.error("Не удалось создать экзамен");
    }
  };

  return {
    handleCreateExam,
    setTitle,
    setDescription,
  };
};
