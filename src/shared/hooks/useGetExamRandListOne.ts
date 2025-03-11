import { useEffect, useState } from "react";

const api = import.meta.env.VITE_API_URL;

export interface IList {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  status: string;
}

export const useGetExamRandListOne = (list_id: string) => {
  const [data, setData] = useState<IList | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const formData = new FormData();
        formData.append("list_id", list_id);
        setIsLoading(true);
        const response = await fetch(
          api + "/main/admin/constructor/api/getExamRandListOne",
          {
            method: "POST",
            body: formData,
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
  }, [list_id]);

  return { data, isLoading, error };
};
