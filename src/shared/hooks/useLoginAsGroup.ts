import { useCallback, useState } from "react";
import { useUserStore } from "../stores/useUserStore";

export const useLoginAsGroup = () => {
    const [code, setCode] = useState("");

    const {setIsGroup} = useUserStore();
  
    const handleLoginAsGroup = useCallback(async () => {
      const data = new FormData();
      data.append("code", code);
      data.append("api", "searchTechPlace");
      const response = await fetch("/back/auth/api/", {
        method: "POST",
        body: data,
      });

      const res = await response.json();

      setIsGroup(res)
  
      console.log(data);
    }, [code, setIsGroup]);
  
    return { handleLoginAsGroup, setCode };
  };