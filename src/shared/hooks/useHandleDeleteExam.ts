import { toast } from "react-toastify";

const api = import.meta.env.VITE_API_URL;

export const useHandleDeleteExam = (examId: string) => {
  const handleDeleteExam = async (callback?: () => void) => {
    try {
      const formData = new FormData();
      formData.append("exam_id", examId);

      const response = await fetch(
        api + "/main/admin/constructor/api/deleteExam",
        { method: "POST", body: formData }
      );

      const res: { status: boolean } = await response.json();

      if (!res.status) {
        throw new Error("Не удалось удалить экзамен");
      }
      callback?.();
      toast.success("Экзамен удален");
    } catch (e) {
      console.error(e);
      toast.error("Не удалось удалить экзамен");
    }
  };

  return {
    handleDeleteExam,
  };
};
