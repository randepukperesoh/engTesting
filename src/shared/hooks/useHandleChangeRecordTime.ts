import { toast } from "react-toastify";

export const useHandleChangeRecordTime = (stepId: string) => {
  const handleChangeRecordTime = async (sec: string, callback?: () => void) => {
    try {
      if (Number(sec) < 5)
        throw new Error("Время не может быть меньше 5 секунд");

      const formData = new FormData();
      formData.append("step_id", stepId);
      formData.append("sec", sec + "");

      const response = await fetch(
        "/back/main/admin/constructor/api/updateExamStepRecordingTime",
        { method: "POST", body: formData }
      );

      const res: { status: boolean } = await response.json();

      if (!res.status) {
        throw new Error("Не удалось изменить время");
      }
      callback?.();
      toast.success("Время измененно");
    } catch (e) {
      console.error(e);
      toast.error("Не удалось изменить время");
    }
  };

  return {
    handleChangeRecordTime,
  };
};
