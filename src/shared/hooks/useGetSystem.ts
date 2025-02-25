import { useEffect, useState } from "react";

export const useGetSystem = () => {
      const [data, setData] = useState<any>({});
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState<string>("");

  useEffect(() => {
    const getFolderSize = async () => {
      try{
        setIsLoading(true)
      const response = await fetch(
        "https://speaktest.exesfull.com/main/api/profile/getFolderSize",
        { method: "POST" }
      );
      const res = await response.json();
      setData(res)
    }
    catch(e) {
        setError(e as string)
      console.error(e)
    }
    finally{
      setIsLoading(false)
    }
  };

  getFolderSize();
  }, []);
  return {data, isLoading, error};
};