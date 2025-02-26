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

const customCookie =
  "stToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcm9tIjoiTWlkZGxlQXV0aCIsInVzZXJfaWQiOjMsImlhdCI6MTc0MDQ5NjMyNSwiZXhwIjoxNzQwNzU1NTI1fQ.OiTVLkzFz_Ec0tWDDCkZbYVXUhJW5ET6M_1w8NCI5CM";

export const useGetInfo = () => {
  const [data, setData] = useState<IProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    document.cookie = customCookie;
  }, []);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setIsLoading(true);

        // Создаем объект FormData
        const formData = new FormData();

        // Делаем запрос без явного Content-Type
        const response = await fetch("/back/main/api/profile/getInfo", {
          method: "POST",
          credentials: "include", // Включает отправку кук
          headers: {
            Cookie: customCookie, // Явно добавляем куку
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const res: IProfile = await response.json();
        setData(res);
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
