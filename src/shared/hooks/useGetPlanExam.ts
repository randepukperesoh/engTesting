import { useEffect, useState } from "react";

export interface IPlanBlock {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  step_id: number;
  is_rand: boolean;
  randcode: null | string;
  type: string;
  data: string;
  order_num: number;
  status: string;
}

export const useGetPlanExam = (step: number | null, sh: string) => {
  const [data, setData] = useState<IPlanBlock[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        setIsLoading(true);
        const data = new FormData();
        data.append("step_id", String(step));
        data.append("sh", sh);
        const response = await fetch(
          "/back/main/examination/api/getPlanBlocks",
          {
            method: "POST",
            body: data,
          }
        );

        const res = await response.json();

        setData(res);
      } catch (e) {
        console.error(e);
        setError("Не удалось получить план экзамена");
      } finally {
        setIsLoading(false);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    step && fetchPlan();
  }, [sh, step]);

  return { data, isLoading, error };
};
