import { useState } from "react";

interface IdecodingResponse {
  file_name: string;
  status: boolean;
  recode_result: string;
}

export const useGetDecoding = () => {
  const [data, setData] = useState<IdecodingResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetDecoding = async (audioName: string) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("file_name", audioName);

      const response = await fetch(
        "/back/main/admin/examcheaking/api/getRecordAudio",
        {
          method: "POST",
          body: formData,
        }
      );

      const res: IdecodingResponse = await response.json();

      setData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleGetDecoding,
    data,
    isLoading,
  };
};
