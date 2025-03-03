import { useEffect, useState } from "react";
import { useUserStore } from "../stores/useUserStore";

export const useGetTestPlaseRegister = () => {
  const [data, setData] = useState(false);
  const [error, setError] = useState("");

  const { id, placeId } = useUserStore();

  useEffect(() => {
    const fetchRegister = async () => {
      try {
        const data = new FormData();
        data.append("code", String(id));
        data.append("place_id", placeId);
        data.append("api", "TestPlaseRegister");
        const response = await fetch("/back/auth/api/", {
          method: "POST",
          body: data,
        });
        const res = await response.json();

        setData(res);
      } catch (e) {
        console.error(e);
        setError("Не удалось зарегестрировать девайс");
      }
    };
    fetchRegister();
  }, []);

  return { data, error };
};
