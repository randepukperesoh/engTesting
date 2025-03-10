import { useState } from "react";
import { toast } from "react-toastify";
import { OPTIONS_MOCK_DESC, translateTypesToEng } from "../consts/select";

export const useHandleCreateExamRandItem = () => {
  const [type, setType] = useState(OPTIONS_MOCK_DESC[0]);
  const [data, setData] = useState("");

  const handleCreateExamRandGroup = async (
    group_id: string,
    callback?: () => void
  ) => {
    try {
      if (!type || !data) throw new Error("Заполните поля");

      const formData = new FormData();
      formData.append("type", translateTypesToEng[type]);
      formData.append("data", data);
      formData.append("group_id", group_id);

      const response = await fetch(
        "/back/main/admin/constructor/api/createExamRandItem",
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
    handleCreateExamRandGroup,
    setType,
    setData,
  };
};
