import { useEffect, useState } from "react";

const api = import.meta.env.VITE_API_URL;

export interface IBall {
  status: boolean;
  has_ball: boolean;
  info: {
    id: number;
    created_at: string;
    updated_at: string;
    user_id: number;
    result_hash: string;
    ball: string;
  } | null;
}

export const useGetExamBall = (hash: string, isOpenModal: boolean) => {
  const [data, setData] = useState<IBall | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [refetchFlag, setRefetchFlag] = useState(1);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        if (!isOpenModal) throw new Error("");
        setIsLoading(true);
        const formData = new FormData();
        formData.append("result_hash", hash);
        const response = await fetch(
          api + "/main/admin/examcheaking/api/getExamBall",
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
  }, [hash, isOpenModal, refetchFlag]);

  const refetch = () => setRefetchFlag((prev) => prev + 1);

  return { data, error, isLoading, refetch };
};
