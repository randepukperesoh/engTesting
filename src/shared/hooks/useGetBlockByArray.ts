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

export const useGetBlockByArray = (json: string[], isOpen: boolean) => {
  const [data, setData] = useState<IBlock[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        if (!isOpen) return null;
        setIsLoading(true);
        const formData = new FormData();
        formData.append("json", "[" + json.toString() + "]");
        const response = await fetch(
          api + "/main/admin/examcheaking/api/getBlockByArray",
          {
            method: "POST",
            body: formData,
          }
        );
        const res: IBlock[] = await response.json();

        setData(res);
      } catch (e) {
        setError("Не удалось получить результаты");
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlocks();
  }, [isOpen, json]);

  return { data, error, isLoading };
};
