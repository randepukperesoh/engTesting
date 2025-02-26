import { useEffect, useState } from "react";
import { IPlace } from "./useGetPlaceList";

export const useGetActualPingDevice = (id: number) => {
  const [data, setData] = useState<IPlace[]>([]); // здесь будет другое
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchActualPingDevice = async () => {
      try {
        const data = new FormData();
        data.append("place_id", String(id));
        const response = await fetch(
          "/back/main/admin/techmanager/api/getActualPingDevices",
          { method: "POST", body: data }
        );
        const res = await response.json();

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
  }, [id]);

  return { data, error };
};
