import { useCallback } from "react";
import { toast } from "react-toastify";

const api = import.meta.env.VITE_API_URL;

export const useUploadAudiio = (
  sh: string,
  stepsId: number[] | null,
  step: number
) => {
  const handleUpload = useCallback(
    async (audioBlob: Blob) => {
      if (!stepsId) return null;
      const formData = new FormData();
      formData.append("file", audioBlob, "recording.wav");
      formData.append("step_id", String(stepsId[step]));
      formData.append("sh", sh);
      try {
        const response = await fetch(
          api + "/main/examination/api/uploadAudio",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          console.error("Ошибка при отправке аудио:", response.statusText);
        }

        toast.success("Ответ отправлен");
      } catch (error) {
        console.error("Ошибка при отправке аудио:", error);
      }
    },
    [sh, step, stepsId]
  );

  return { handleUpload };
};
