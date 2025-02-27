import { useEffect, useState } from "react";

export interface IExam {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  img_url: string | null;
  is_open: boolean;
  is_delete: boolean;
  user_id: number;
  instruction_text: string;
}

export const useGetExamInfo = () => {
  const [data, setData] = useState<IExam | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExam = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/back/main/examination/api/getExamInfo", {
          method: "POST",
          credentials: "include",
          body: new FormData(),
        });

        const res: IExam = await response.json();
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
