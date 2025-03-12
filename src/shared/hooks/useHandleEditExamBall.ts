import { toast } from "react-toastify";

const api = import.meta.env.VITE_API_URL;

const regex = /^\d+$/;

export const useHandleEditExamBall = (result_hash: string) => {
  const handleUpdateExamRandItem = async (
    ball: string,
    callback?: () => void
  ) => {
    try {
      if (!regex.test(ball) && ball !== '') throw new Error("");

      const formData = new FormData();
      formData.append("result_hash", result_hash);
      formData.append("ball", ball);

      const response = await fetch(
        api + "/main/admin/examcheaking/api/editExamBall",
        { method: "POST", body: formData }
      );

      const res: { status: boolean } = await response.json();

      if (!res.status) {
        throw new Error("Не удалось обновить баллы");
      }

      callback?.();
      toast.success("Баллы отредактирован");
    } catch (e) {
      console.error(e);
      toast.error((e as string) || "Не удалось отредактировать баллы");
    }
  };

  return {
    handleUpdateExamRandItem,
  };
};
