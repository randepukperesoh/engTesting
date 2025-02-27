import { useCallback, useMemo, useState } from "react";
import { IList } from "./useGetList";

export const useSearchInList = (data: IList[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const memoizedData = useMemo(() => {
    if (!searchQuery) {
      // Если строка поиска пустая, возвращаем все данные
      return data;
    }

    const lowerCaseQuery = searchQuery.toLowerCase().trim();

    // Фильтруем данные
    return data.filter((el) => {
      // Проверяем совпадения в last_name, first_name или других доступных полях
      return el.last_name?.toLowerCase().includes(lowerCaseQuery);
    });
  }, [data, searchQuery]);

  const handleChangeSearchQuery = useCallback(
    (value: string) => setSearchQuery(value),
    []
  );

  return { handleChangeSearchQuery, memoizedData };
};
