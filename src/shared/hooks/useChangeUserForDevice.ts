import { useCallback, useState } from "react";

const api = import.meta.env.VITE_API_URL;

export const useChangeUserForDevice = () => {
  const [error, setError] = useState("");
  const [examId, setExamId] = useState(0);
  const [userId, setUserId] = useState(0);

  const handleChangeUserForDevice = useCallback(
    async (deviceId: string) => {
      try {
        const formData = new FormData();
        formData.append("user_id", userId + "");
        formData.append("device_id", deviceId);
        formData.append("exam_id", examId + "");

        await fetch(api + "/main/admin/techmanager/api/ChangeUserForDevice", {
          method: "POST",
          body: formData,
        });
      } catch (e) {
        setError("Не удалось сменить девайс");
        console.error(e);
      }
    },
    [examId, userId]
  );

  return {
    handleChangeUserForDevice,
    setExamId,
    setUserId,
    error,
    examId,
  };
};
