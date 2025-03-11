import { translateTypesToEng } from "./../consts/select";
import { useState } from "react";
import { toast } from "react-toastify";

const api = import.meta.env.VITE_API_URL;

export const useHandleUpdateExamRandItem = () => {
  const [type, setType] = useState("");
  const [data, setData] = useState("");

  const handleUpdateExamRandItem = async (
    item_id: string,
    defaultData: string,
    defaultType: string,
    callback?: () => void
  ) => {
    try {
      const resType = type
        ? translateTypesToEng[type]
        : translateTypesToEng[defaultType];

      const formData = new FormData();
      formData.append("item_id", item_id);
      formData.append("type", resType);
      formData.append("data", data || defaultData);

      const response = await fetch(
        api + "/main/admin/constructor/api/updateExamRandItem",
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
