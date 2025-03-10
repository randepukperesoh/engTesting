import { useEffect, useState } from "react";

export interface IBlock {
  id: number;
  created_at: string;
  updated_at: string;
  group_id: number;
  type: string;
  data: string;
  status: string;
  order_num: number;
}

  export const useGetExamRandItems = (listId: string) => {
    const [data, setData] = useState<IBlock[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [refetchFlag, setRefetchFlag ] = useState(1)

    useEffect(() => {
      const fetchExamList = async () => {

        const formData = new FormData
        formData.append('group_id', listId)
        
        try {
          setIsLoading(false);
          const response = await fetch(
            "/back/main/admin/constructor/api/getExamRandItems",
            { method: "POST", body: formData }
          );
          const res
        //   : IExam[]
           = await response.json();
  
          setData(res);
        } catch (e) {
          setError("Не удалось получить список экзаменов");
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      };
      fetchExamList();
    }, [listId, refetchFlag]);

    const refetch = () => {
      setRefetchFlag(prev => prev +1)
    }
  
    return { data, isLoading, error, refetch };
  };
  