import { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth <= 768 
  );

  const resizeHandler = () => {
    setIsMobile(window.innerWidth <= 768); 
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []); 
  return { isMobile };
};