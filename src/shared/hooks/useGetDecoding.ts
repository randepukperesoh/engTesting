import { useState } from "react";

const api = import.meta.env.VITE_API_URL;

interface IdecodingResponse {
  id: number;
  created_at: string;
  updated_at: string;
  file_name: string;
  recode_status: string;
  recode_result: string | null;
}

export const useGetDecoding = () => {
  const [data, setData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleGetDecoding = async (audioName: string) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("file_name", audioName);

      const response = await fetch(
        api + "/main/admin/examcheaking/api/getRecordAudio",
        {
          method: "POST",
          body: formData,
        }
      );

      const res: IdecodingResponse = await response.json();

      setStatus(res.recode_status);

      setData(res.recode_result);
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
    status,
  };
};
