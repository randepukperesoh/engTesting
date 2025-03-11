import { useState } from "react";
import { toast } from "react-toastify";

const api = import.meta.env.VITE_API_URL;

export type BlockType = "title" | "bold" | "text" | "image";

export const useHandleCreateExamBlock = (stepId: string) => {
  const [data, setData] = useState("");
  const [type, setType] = useState<BlockType>("text");

  const handleCreateExamBlock = async (callback?: () => void) => {
    try {
      if (!data) throw new Error("Заполните поля");

      const formData = new FormData();
      formData.append("step_id", stepId);
      formData.append("data", data);
      formData.append("type", type);

      const response = await fetch(
        api + "/main/admin/constructor/api/createExamBlock",
        { method: "POST", body: formData }
      );

      const res: { status: boolean } = await response.json();

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
    handleCreateExamBlock,
    setData,
    setType,
    type,
  };
};
