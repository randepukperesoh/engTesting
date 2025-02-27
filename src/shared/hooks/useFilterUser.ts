import { useMemo } from "react";
import { IList } from "./useGetList";

export const useFilterUser = (arr: IList[] | null, isAdmin: boolean) => {
  const res = useMemo(() => {
    if (!arr) return [];
    return isAdmin ? arr.filter((el) => el.is_admin === "true") : arr;
  }, [arr, isAdmin]);

  return { filteredData: res };
};
