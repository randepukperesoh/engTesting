import { useState } from "react";
import { toast } from "react-toastify";

const api = import.meta.env.VITE_API_URL;

export const useHandleCreateTask = (examId: string) => {
  const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");

  const handleCreateTask = async (callback?: () => void) => {
    try {
      if (!title && title.length >= 100) return;
      // if (description.length >= 1000) return;

      const formData = new FormData();
      formData.append("exam_id", examId);
      formData.append("title", title);
      // formData.append("description", description);

      const response = await fetch(
        api + "/main/admin/constructor/api/createExamStep",
        { method: "POST", body: formData }
      );

      const res: { status: boolean } = await response.json();

      if (!res.status) {
        throw new Error("Не удалось создать задание");
      }
      callback?.();
      toast.success("Задание создано");
    } catch (e) {
      console.error(e);
      toast.error("Не удалось создать экзамен");
    }
  };

  return {
    handleCreateTask,
    setTitle,
    // setDescription,
  };
};
