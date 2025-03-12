import { useEffect, useState } from "react";

const api = import.meta.env.VITE_API_URL;

export interface IExam {
  id: number;
  title: string;
  description: string;
}

export const useGetExamList = () => {
  const [data, setData] = useState<IExam[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [refetchFlag, setRefetchFlag] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchExamList = async () => {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("search", search);

        const response = await fetch(
          api + 
          "/main/admin/constructor/api/getExamList",
          {
            method: "POST",
            body: formData,
            credentials: "include",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": "true",
            },
          }
        );
        const res: IExam[] = await response.json();

        setData(res);
      } catch (e) {
        setError("Не удалось получить список экзаменов");
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExamList();
  }, [refetchFlag, search]);

  const refetch = () => {
    setRefetchFlag((prev) => prev + 1);
  };

  return { data, isLoading, error, refetch, setSearch };
};
