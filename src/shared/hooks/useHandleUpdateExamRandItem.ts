import { useState } from "react";
import { toast } from "react-toastify";

export const useHandleUpdateExamRandItem = () => {
  const [type, setType] = useState("");
  const [data, setData] = useState("");

  const handleUpdateExamRandItem = async (
    item_id: string,
    callback?: () => void
  ) => {
    try {
      if (!type || !data.length ) {
        toast.error("Нельязя отправить пустое поле");
        throw new Error("Нельязя отправить пустое поле");
      }

      const formData = new FormData();
      formData.append("item_id", item_id);
      formData.append("type", type);
      formData.append("data", data);

      const response = await fetch(
        "/back/main/admin/constructor/api/updateExamRandItem",
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
    handleUpdateExamRandItem,
    setType,
    setData,
  };
};
