import { useEffect, useState } from "react";

export interface IUser {
    id: number;
    last_name: string;
    first_name: string;
    other_name: string;
    login: string;
}

export const useSearchUser = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState<IUser[] | null>(null);
    const [error, setError] = useState("");

      
        useEffect(() => {
          const fetchPlaceList = async () => {
            try {
                const formData= new FormData
                formData.append('search', search)
              const response = await fetch(
                "/back/main/admin/techmanager/api/SearchUser",
                { method: "POST", body: formData}
              );
              const res: IUser[] = await response.json();
              setData(res);
            } catch (e) {
              setError("Не удалось получить аудитории");
              console.error(e);
            }
          };
      
          fetchPlaceList();
        }, [search]);
      

    return{
        data, error, setSearch
    }
}