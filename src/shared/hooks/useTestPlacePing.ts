import { useEffect, useState } from "react";

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
    select_user_id: null;
    fio: null;
  }
  
  export const useTestPlacePing = () => {
    const [data, setData] = useState<IPing | null>(null);
    const [error, setError] = useState("");
  
    useEffect(() => {
      const fetchPing = async () => {
        try {
          const response = await fetch(
            "https://speaktest.exesfull.com/auth/api/",
            { method: "POST" }
          );
          const res: IPing = await response.json();
  
          setData(res);
        } catch (e) {
          setError("Связь с сервером прервалась");
          console.error(e);
        }
      };
  
      const intervalId = setInterval(fetchPing, 3000);
  
      return () => {
        clearInterval(intervalId);
      };
    }, []);
  
    return { data, error };
  };
  