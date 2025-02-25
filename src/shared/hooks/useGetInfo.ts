import { useEffect, useState } from "react";

export interface IProfile {
  created_at: string;
  first_name: string;
  id: number;
  img_url: string;
  is_active: boolean;
  is_admin: boolean;
  last_enter_date: string;
  last_name: string;
  login: string;
  other_name: string;
  updated_at: string;
}

export const useGetInfo = () => {
  const [data, setData] = useState<IProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "/main/api/profile/getInfo",
          { method: "POST", credentials: "include" } 
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const res: IProfile = await response.json();
        setData(res);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        setError(e.message || "Произошла ошибка при получении данных");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInfo();
  }, []);

  return { data, isLoading, error };
};