import { useEffect, useState } from "react";

const api = import.meta.env.VITE_API_URL;

export interface IReSult {
  user_id: number;
  last_name: string;
  first_name: string;
  other_name: string;
  login: string;
  window_hash: string;
  exam_date: string;
}

export const useGetResults = () => {
  const [data, setData] = useState<IReSult[] | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch(
        api + "/main/admin/examcheaking/api/getResults",
        {
          method: "POST",
          body: new FormData(),
        }
      );

      const res = await response.json();

      setData(res);
    };

    fetchResults();
  }, []);
  return { data };
};
