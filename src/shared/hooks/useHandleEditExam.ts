import { useState } from "react";
import { toast } from "react-toastify";

export const useHandleEditExam = (examId: string) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleEditExam = async (callback?: () => void) => {
    try {
      if (!title && title.length >= 100) return;
      if (description.length >= 1000) return;

      const formData = new FormData();
      formData.append("exam_id", examId)
      formData.append("title", title);
      formData.append("description", description);

      const response = await fetch(
        "/back/main/admin/constructor/api/updateExam",
        { method: "POST", body: formData }
      );

      const res: { status: boolean } = await response.json();

      if (!res.status) {
        throw new Error("Не удалось создать экзамен");
      }
      callback?.();
      toast.success("Экзамен отредактирован");
    } catch (e) {
      console.error(e);
      toast.error("Не удалось отредактировать экзамен");
    }
  };

  return {
    handleEditExam,
    setTitle,
    setDescription,
  };
};
