import { useEffect, useState } from "react";

const api = import.meta.env.VITE_API_URL;

export interface IBlock {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  step_id: number;
  is_rand: boolean;
  randcode: string | null;
  type: Exclude<string, "audio">;
  data: string;
  order_num: number;
  status: string;
}

export const useGetExamBlock = (stepId: string) => {
  const [data, setData] = useState<IBlock[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [refetchFlag, setRefetchFlag] = useState(1);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("step_id", stepId);
        const response = await fetch(
          api + "/main/admin/constructor/api/getExamBlock",
          {
            method: "POST",
            body: formData,
          }
        );
        const res = await response.json();

        setData(res);
      } catch (e) {
        setError("Не удалось получить результаты");
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlocks();
  }, [stepId, refetchFlag]);

  const refetch = () => setRefetchFlag((prev) => prev + 1);

  return { data, error, isLoading, refetch };
};
