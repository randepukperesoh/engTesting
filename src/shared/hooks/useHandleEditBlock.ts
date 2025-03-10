import { useState } from "react";
import { toast } from "react-toastify";
import { translateTypesToEng } from "../consts/select";

export const useHandleEditBlock = () => {
  const [data, setData] = useState("");
  const [type, setType] = useState("");

  const handleEditBlock = async (
    blockId: string,
    defaultData: string,
    defaultType: string,
    callback?: () => void
  ) => {
    try {
      // if (!type || !data) throw new Error("Нельзя отправить пустые поял");

      const formData = new FormData();
      formData.append("block_id", blockId);
      formData.append("type", translateTypesToEng[type] || defaultType);
      formData.append("data", data || defaultData);

      const response = await fetch(
        "/back/main/admin/constructor/api/editExamBlock",
        { method: "POST", body: formData }
      );

      const res: { status: boolean } = await response.json();

      if (!res.status) {
        throw new Error("Не удалось создать блок");
      }
      callback?.();
      toast.success("Блок отредактирован");
    } catch (e) {
      console.error(e);
      toast.error("Не удалось отредактировать блок");
    }
  };

  return {
    handleEditBlock,
    setData,
    setType,
  };
};
