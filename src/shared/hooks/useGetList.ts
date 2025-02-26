import { useEffect, useState } from "react";

export interface IList {
  id: number;
  last_name: string;
  first_name: string;
  other_name: string;
  is_active: string;
  is_admin: string;
}

export const useGetList = () => {
  const [data, setData] = useState<IList[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch("/back/main/admin/users/api/getList", {
          method: "POST",
          credentials: "include",
        });
        const res: IList[] = await response.json();

        setData(res);
      } catch (e) {
        setError(e as string);
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchList();
  }, []);

  return { data, isLoading, error };
};
