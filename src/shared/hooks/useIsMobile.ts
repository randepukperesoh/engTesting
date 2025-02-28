import { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth <= 768 
  );

  const [isMobileNav, setIsMobileNav] = useState<boolean>(window.innerWidth <= 912)

  const resizeHandler = () => {
    setIsMobile(window.innerWidth <= 768); 
    setIsMobileNav(window.innerWidth <= 912)
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []); 
  return { isMobile, isMobileNav };
};