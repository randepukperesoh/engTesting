import { useEffect, useState } from "react";

export interface ISteps {
    id: number;
    created_at: string;
    updated_at: string;
    exam_id: number;
    user_id: number;
    title: string;
    description: string;
    status: string;
    stage_num: number;
    training_time: number;
    recording_time: number;
    has_training: boolean;
}

export const useGetExamsStepsAll = () => {
  const [data, setData] = useState<ISteps[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExam = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "/back/main/admin/constructor/api/getExamStepsAll",
          {
            method: "POST",
            body: new FormData(),
          }
        );

        const res = await response.json();

        setData(res);
      } catch (e) {
        console.error(e);
        setError("Не удалось получить данные о экзамене");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExam();
  }, []);
  return { data, isLoading, error };
};

