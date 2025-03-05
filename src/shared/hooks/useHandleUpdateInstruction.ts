import { useState } from "react";
import { toast } from "react-toastify";

export const useHandleUpdateInstruction = (examId: string) => {
  const [text, setText] = useState("");
  
  const handleEditInstruction = async (callback?: () => void) => {
    try {
      if (!text.length || text.length >= 2000) {
        toast.error('Нельязя отправить пустое поле')
        throw new Error("Нельязя отправить пустое поле")
      }
      
      const formData = new FormData();
      formData.append("exam_id", examId)
      formData.append("text", text);
      
      const response = await fetch(
        "/back/main/admin/constructor/api/updateExamInstruction",
        { method: "POST", body: formData }
      );

      const res: { status: boolean } = await response.json();

      if (!res.status) {
        throw new Error("Не удалось обновить инструкцию");
      }

      callback?.();
      toast.success("Инструкция отредактирован");
    } catch (e) {
      console.error(e);
      toast.error((e as string) || "Не удалось отредактировать экзамен");
    }
  };

  return {
    handleEditInstruction,
    setText,
    };
};
