import { toast } from "react-toastify";

const api = import.meta.env.VITE_API_URL;

export const useHandleChangeTrainingTime = (stepId: string) => {
  const handleChangeTrainingTime = async (
    sec: string,
    callback?: () => void
  ) => {
    try {
      if (Number(sec) < 5)
        throw new Error("Время не может быть меньше 5 секунд");

      const formData = new FormData();
      formData.append("step_id", stepId);
      formData.append("sec", sec + "");

      const response = await fetch(
        api + "/main/admin/constructor/api/updateExamStepTrainingTime",
        { method: "POST", body: formData }
      );

      const res: { status: boolean } = await response.json();

      if (!res.status) {
        throw new Error("Не удалось изменить время");
      }
      callback?.();
      toast.success("Время изменено");
    } catch (e) {
      console.error(e);
      toast.error("Не удалось изменить время");
    }
  };

  return {
    handleChangeTrainingTime,
  };
};
