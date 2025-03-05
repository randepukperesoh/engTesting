import { toast } from "react-toastify";

export const useHandleToggleExamIsOpen = (examId: string) => {
  const handleToggleExamIsOpen = async (status: string, callback?: () => void) => {
    try {
      const formData = new FormData();
      formData.append("exam_id", examId);
      formData.append("status", status);

      const response = await fetch(
        "/back/main/admin/constructor/api/updateExamInstruction",
        { method: "POST", body: formData }
      );

      const res: { status: boolean } = await response.json();

      if (!res.status) {
        throw new Error("Не удалось обновить статус");
      }

      callback?.()
      toast.success("Статус обнавлен");
    } catch (e) {
      console.error(e);
      toast.error((e as string) || "Не удалось обновить статус");
    }
  };

  return {
    handleToggleExamIsOpen,
  };
};
