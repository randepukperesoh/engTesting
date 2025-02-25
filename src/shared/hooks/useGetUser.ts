import { useEffect, useState } from "react";

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
  
export const useGetUser = () => {
    const [data, setData] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
  
    useEffect(() => {
      const getUser = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(
            "https://speaktest.exesfull.com/main/admin/users/api/getUser",
            { method: "POST" }
          );
          const res: IUser = await response.json();
  
          setData(res);
        } catch (e) {
          console.log(e);
          setError(e as string);
        } finally {
          setIsLoading(false);
        }
      };
  
      getUser();
    }, []);
    return {
      data,
      isLoading,
      error,
    };
  };