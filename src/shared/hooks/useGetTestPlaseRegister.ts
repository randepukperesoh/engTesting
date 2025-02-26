import { useEffect, useId, useState } from "react";

export const useGetTestPlaseRegister = () => {
    const [data, setData] = useState(false);
    const [error, setError] = useState("");
  
    const code = useId();
    useEffect(() => {
      const fetchRegister = async () => {
        try {
          const data = new FormData();
          data.append("code", code);
          data.append("place_id", "1");
          data.append("api", "TestPlaseRegister");
          const response = await fetch(
            "https://speaktest.exesfull.com/auth/api/",
            {
              method: "POST",
            }
          );
          const res = await response.json();
  
          setData(res);
        } catch (e) {
          console.error(e);
          setError("Не удалось зарегестрировать девайс");
        }
      };
      fetchRegister();
    }, [code]);
  
    return { data, error };
  };
  