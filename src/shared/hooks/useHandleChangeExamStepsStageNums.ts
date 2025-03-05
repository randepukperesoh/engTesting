import { toast } from "react-toastify";

export const useHandleChangeExamStepsStageNums = () => {
  const handleChangeExamStepsStageNums = async (
    firstId: string,
    secondId: string
  ) => {
    try {
      const formData = new FormData();
      formData.append("step_first", firstId);
      formData.append("step_second", secondId);

      const response = await fetch(
        "back/main/admin/constructor/api/ChangeExamStepsStageNums",
        {
          method: "POST",
          body: formData,
        }
      );

      const res: { status: boolean } = await response.json();

      if (!res.status) throw new Error("Ошибка изменения порядка");

      toast.success("Порядок изменен");
    } catch (e) {
      console.error(e);
      toast.error("Не удалось изменеть порядк");
    }
  };

  return {
    handleChangeExamStepsStageNums,
  };
};
