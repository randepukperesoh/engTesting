import { toast } from "react-toastify";

export const useFinish = () => {
  const handlePostFinish = async () => {
    await fetch("/back/main/examination/api/finish", {
      method: "POST",
      body: new FormData(),
    });

    toast.success("Тест пройден");
  };

  return { handlePostFinish };
};