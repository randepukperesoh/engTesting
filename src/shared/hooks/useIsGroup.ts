import { useState } from "react";

export const useIsGroup = () => {
    const [isGroup, setIsGroup] = useState(false);
  
    const handleChangeToGroup = () => setIsGroup(true);
  
    const handleChangeToUser = () => setIsGroup(false);
  
    return { isGroup, handleChangeToGroup, handleChangeToUser };
  };