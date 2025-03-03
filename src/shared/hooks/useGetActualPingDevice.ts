import { useEffect, useState } from "react";

export interface IACtualDevice {
  id: number;
    created_at: string;
    updated_at: string;
    rand_code: string;
    is_active: boolean;
    action: null;
    last_ping_date: string;
    fio: string;
    place_id: number;
    num: number;
}
export const useGetActualPingDevice = () => {
  
  const [placeId, setPlaceId] = useState(1);
  const [data, setData] = useState<IACtualDevice[]>([]); 
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchActualPingDevice = async () => {
      try {
        const data = new FormData();
        data.append("place_id", String(placeId));
        const response = await fetch(
          "/back/main/admin/techmanager/api/getActualPingDevices",
          { method: "POST", body: data }
        );
        const res: IACtualDevice[] = await response.json();

        setData(res);
      } catch (e) {
        console.error(e);
        setError("не удалось получить");
      }
    };

    const intervalId = setInterval(fetchActualPingDevice, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [placeId]);

  return { data, error,placeId, setPlaceId };
};
