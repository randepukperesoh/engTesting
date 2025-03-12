import { toast } from "react-toastify";

const api = import.meta.env.VITE_API_URL;

export const useFinish = () => {
  const handlePostFinish = async () => {
    await fetch(api + "/main/examination/api/finish", {
      method: "POST",
      body: new FormData(),
    });

    toast.success("Тест пройден");
    window.location.reload();
  };

  return { handlePostFinish };
};
