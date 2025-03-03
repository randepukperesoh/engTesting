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
    select_user_id: null | number;
    fio: null;
  }
  
  export const useTestPlacePing = (step: number) => {
    const [data, setData] = useState<IPing | null>(null);
    const [error, setError] = useState("");
  
    useEffect(() => {
      const fetchPing = async () => {
        try {
          const formData = new FormData
          formData.append('api', 'TestPlacePing')
          const response = await fetch(
            "/back/auth/api/",
            { method: "POST" , body: formData}
          );
          const res: IPing = await response.json();
  
          setData(res);
        } catch (e) {
          setError("Связь с сервером прервалась");
          console.error(e);
        }
      };
  
      const intervalId = step !== 2 ?setInterval(fetchPing, 2500) : 1;
  
      return () => {
        clearInterval(intervalId);
        if(step === 2){
          clearInterval(intervalId)
        }
      };
    }, [step]);
  
    return { data, error };
  };
  