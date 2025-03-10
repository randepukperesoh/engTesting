import { useEffect, useState } from "react";

export interface IExamInfo {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  img_url: null;
  is_open: boolean;
  is_delete: boolean;
  user_id: number;
  instruction_text: string;
  recording_time: number;
  training_time: number;
  step_id: string;
}

export const useGetExamSteps = (examId: string) => {
  const [data, setData] = useState<IExamInfo[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [refetchFlag, setRefetchFlag] = useState(1);

  useEffect(() => {
    const fetchExaminfo = async () => {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("exam_id", examId);

        const response = await fetch(
          "/back/main/admin/constructor/api/getExamSteps",
          { method: "POST", body: formData }
        );

        const res: IExamInfo[] = await response.json();
        setData(res);
      } catch (e) {
        console.error(e);
        setError("Не удалось получить информацию");
      } finally {
        setIsLoading(false);
      }
    };
    fetchExaminfo();
  }, [examId, refetchFlag]);

  const refetch = () => setRefetchFlag((prev) => prev + 1);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
