import { useMemo } from "react";

const get4NumberAsString = () => String((Math.random() * 10000).toFixed(0));

export const useUnicId = () => {
  const id = useMemo(() => {
    return `${get4NumberAsString()}-${get4NumberAsString()}-${get4NumberAsString()}-${get4NumberAsString()}`;
  }, []);

  return { id };
};