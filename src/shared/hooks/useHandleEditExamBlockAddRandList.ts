import { toast } from "react-toastify";

export const useHandleEditExamBlockAddRandList = () => {
  const handleEditExamBlockAddRandList = async (
    list_id: string,
    block_id: string,
    callback?: () => void
  ) => {
    try {
      const formData = new FormData();
      formData.append("block_id", block_id);
      formData.append("list_id", list_id);

      const response = await fetch(
        "/back/main/admin/constructor/api/editExamBlockAddRandList",
        { method: "POST", body: formData }
      );

      const res: { status: boolean } = await response.json();

      if (!res.status) {
        throw new Error("Не удалось обновить статус");
      }

      callback?.();
      toast.success("Статус обнавлен");
    } catch (e) {
      console.error(e);
      toast.error((e as string) || "Не удалось обновить статус");
    }
  };

  return {
    handleEditExamBlockAddRandList,
  };
};
