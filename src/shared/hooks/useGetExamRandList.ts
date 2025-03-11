import { useEffect, useState } from "react";

const api = import.meta.env.VITE_API_URL;

export interface IItem {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  status: string;
}

export const useGetExamRandList = () => {
  const [data, setData] = useState<IItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [refetchFlag, setRefetchFlag] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchExamList = async () => {
      const formData = new FormData();
      formData.append("search", search);

      try {
        setIsLoading(false);
        const response = await fetch(
          api + "/main/admin/constructor/api/getExamRandList",
          { method: "POST", body: formData }
        );
        const res =
          //   : IExam[]
          await response.json();

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
