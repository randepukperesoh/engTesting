import { useEffect, useState } from "react";
import { useUserStore } from "../stores/useUserStore";

const api = import.meta.env.VITE_API_URL;

export interface IPing {
  id: number;
  created_at: string;
  updated_at: string;
  rand_code: string;
  is_active: true;
  action: null;
  last_ping_date: string;
  place_id: number;
  num: number;
  select_user_id: null | number;
  fio: null;
}

export const useTestPlacePing = (step: number) => {
  const [data, setData] = useState<IPing | null>(null);
  const [error, setError] = useState("");

  const { setId } = useUserStore();

  useEffect(() => {
    const fetchPing = async () => {
      try {
        const formData = new FormData();
        formData.append("api", "TestPlacePing");
        const response = await fetch(api + "/auth/api/", {
          method: "POST",
          body: formData,
        });
        const res: IPing = await response.json();

        setId(res.num);

        setData(res);
      } catch (e) {
        setError("Связь с сервером прервалась");
        console.error(e);
      }
    };

    const intervalId = step !== 2 ? setInterval(fetchPing, 2500) : 1;

    return () => {
      clearInterval(intervalId);
      if (step === 2) {
        clearInterval(intervalId);
      }
    };
  }, [setId, step]);

  return { data, error };
};
