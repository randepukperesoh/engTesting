import { useMemo, useState } from "react";
import { IExam } from "./useGetExamList";

export const useSearchInExamList = (data: IExam[]) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
  
    // Функция для фильтрации данных
    const filteredData = useMemo(() => {
      return data.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [data, searchQuery]);
  
    return {
      searchQuery,
      setSearchQuery,
      filteredData,
    };
  };
  