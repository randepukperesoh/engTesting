import { useEffect, useState } from "react";

const api = import.meta.env.VITE_API_URL;

export interface IUser {
  id: number;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  other_name: string;
  login: string;
  last_enter_date: null;
  is_admin: string;
  is_active: string;
  img_url: string;
}

export const useGetUser = (id: number) => {
  const [data, setData] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const formData = new FormData();
      formData.append("user_id", String(id));

      try {
        setIsLoading(true);
        const response = await fetch(api + "/main/admin/users/api/getUser", {
          method: "POST",
          body: formData,
        });
        const res: IUser = await response.json();

        setData(res);
      } catch (e) {
        console.error(e);
        setError(e as string);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, [id]);

  return {
    data,
    isLoading,
    error,
  };
};
