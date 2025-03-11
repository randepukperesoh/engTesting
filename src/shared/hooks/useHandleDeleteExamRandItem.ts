import { toast } from "react-toastify";

const api = import.meta.env.VITE_API_URL;

export const useHandleDeleteExamRandItem = () => {
  const handleDeleteExamRandItem = async (
    itemId: string,
    callback?: () => void
  ) => {
    try {
      const formData = new FormData();
      formData.append("item_id", itemId);

      const response = await fetch(
        api + "/main/admin/constructor/api/deleteExamRandItem",
        { method: "POST", body: formData }
      );

      const res: { status: boolean } = await response.json();

      if (!res.status) {
        throw new Error("Не удалось удалить блок");
      }
      callback?.();
      toast.success("Блок удалено");
    } catch (e) {
      console.error(e);
      toast.error("Не удалось удалить блок");
    }
  };

  return {
    handleDeleteExamRandItem,
  };
};
