import { toast } from "react-toastify";

export const useHandleDeleteTask = (stepId: string) => {
  const handleDeleteTask = async (callback?: () => void) => {
    try {
      const formData = new FormData();
      formData.append("step_id", stepId);

      const response = await fetch(
        "/back/main/admin/constructor/api/deleteExamStepInfo",
        { method: "POST", body: formData }
      );

      const res: { status: boolean } = await response.json();

      if (!res.status) {
        throw new Error("Не удалось удалить задание");
      }
      callback?.();
      toast.success("Задние удалено");
    } catch (e) {
      console.error(e);
      toast.error("Не удалось удалить задание");
    }
  };

  return {
    handleDeleteTask,
  };
};
