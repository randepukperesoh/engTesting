import { useCallback, useState } from "react";

export const useChangeUserForDevice = () => {
  const [error, setError] = useState("");
  const [examId, setExamId] = useState(0);
  const [userId, setUserId]= useState(0);

  const handleChangeUserForDevice = useCallback(
    async (deviceId: string) => {
      try {
        const formData = new FormData();
        formData.append("user_id", userId+"");
        formData.append("device_id", deviceId);
        formData.append("exam_id", examId + "");

        await fetch("/back/main/admin/techmanager/api/ChangeUserForDevice", {
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
  };
};
