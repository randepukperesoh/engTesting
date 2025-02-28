import { useCallback, useMemo, useState } from "react";
import { IList } from "./useGetList";

export const useSearchInList = (data: IList[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const memoizedData = useMemo(() => {
    if (!searchQuery) {
      return data;
    }

    const lowerCaseQuery = searchQuery.toLowerCase().trim();

    
    return data.filter((el) => {
      return el.last_name?.toLowerCase().includes(lowerCaseQuery);
    });
  }, [data, searchQuery]);

  const handleChangeSearchQuery = useCallback(
    (value: string) => setSearchQuery(value),
    []
  );

  return { handleChangeSearchQuery, memoizedData };
};
