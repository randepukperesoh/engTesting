import { useState } from "react";
import { toast } from "react-toastify";

const api = import.meta.env.VITE_API_URL;

export const useHandleUpdateExamRandList = () => {
  const [text, setText] = useState("");

  const handleUpdateExamRandList = async (
    list_id: string,
    callback?: () => void
  ) => {
    try {
      if (!text.length || text.length >= 2000) {
        toast.error("Нельязя отправить пустое поле");
        throw new Error("Нельязя отправить пустое поле");
      }

      const formData = new FormData();
      formData.append("list_id", list_id);
      formData.append("title", text);

      const response = await fetch(
        api + "/main/admin/constructor/api/updateExamRandList",
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
    handleUpdateExamRandList,
    setText,
  };
};
