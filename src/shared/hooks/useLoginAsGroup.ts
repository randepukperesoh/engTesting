import { useCallback, useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";

interface IGroup {
  id: boolean | number;
  created_at: string;
  title: string;
  code: string;
  alert: string | null;
}

const createCode = () => `${Math.random()*1000}-${Math.random()*1000}-${Math.random()*1000}-${Math.random()*1000}`
  

const getDeviceCode = () =>{
  
  const code = localStorage.getItem('deviceCode')

  const testCode = createCode()

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  code && localStorage.setItem('deviceCode', testCode)

  return code || testCode
}

export const useLoginAsGroup = () => {
  const [code, setCode] = useState("123456");

  const navigate = useNavigate();

  const { setIsGroup } = useUserStore();
  
  const deviceCode = getDeviceCode()

  const handleLoginAsGroup = useCallback(async () => {
    const data = new FormData();
    data.append("code", code);
    data.append("api", "searchTechPlace");
    data.append('webVersion', '2')
    data.append('device_code', deviceCode)
    const response = await fetch("/back/auth/api/", {
      method: "POST",
      body: data,
    });

    const res: IGroup = await response.json();

    const value = res.id !== false;

    setIsGroup(value);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    value && navigate("/testing");
  }, [code, deviceCode, navigate, setIsGroup]);

  return { handleLoginAsGroup, setCode };
};
