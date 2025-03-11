import { useEffect, useMemo, useState } from "react";

const api = import.meta.env.VITE_API_URL;

export interface IPlace {
  id: number;
  created_at: string;
  title: string;
  code: string;
  alert: null;
}

export const useGetPlaceList = () => {
  const [data, setData] = useState<IPlace[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlaceList = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          api + "/main/admin/techmanager/api/getPlaceList",
          { method: "POST" }
        );
        const res: IPlace[] = await response.json();
        setData(res);
      } catch (e) {
        setError("Не удалось получить аудитории");
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaceList();
  }, []);

  const optionList = useMemo(() => {
    return data.map((el) => ({ value: el.id, label: el.title }));
  }, [data]);

  return {
    data: optionList,
    isLoading,
    error,
  };
};
