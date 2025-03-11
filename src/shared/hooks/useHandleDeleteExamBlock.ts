import { toast } from "react-toastify";

const api = import.meta.env.VITE_API_URL;

export const useHandleDeleteExamBlock = () => {
  const handleDeleteExamBlock = async (
    blockId: string,
    callback?: () => void
  ) => {
    try {
      const formData = new FormData();
      formData.append("block_id", blockId);

      const response = await fetch(
        api + "/main/admin/constructor/api/deleteExamBlock",
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
    handleDeleteExamBlock,
  };
};
