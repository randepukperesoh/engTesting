import { useEffect, useState } from "react";

export interface IExam {
    id: number;
    title: string;
    description: string;
  }
  
  export const useGetExamList = () => {
    const [data, setData] = useState<IExam[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [refetchFlag, setRefetchFlag ] = useState(1)
  
    useEffect(() => {
      const fetchExamList = async () => {
        try {
          setIsLoading(false);
          const response = await fetch(
            "/back/main/admin/constructor/api/getExamList",
            { method: "POST" }
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
    }, [refetchFlag]);

    const refetch = () => {
      setRefetchFlag(prev => prev +1)
    }
  
    return { data, isLoading, error, refetch };
  };
  