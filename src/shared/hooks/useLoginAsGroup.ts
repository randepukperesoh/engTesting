import { useCallback, useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface IGroup {
  id?: boolean;
  conect?:{
    status: boolean
  };
place?:{
  id: boolean | number;
  created_at: string;
  title: string;
  code: string;
  alert: string | null;
}
}

const createCode = () => `${(Math.random()*1000).toFixed()}-${(Math.random()*1000).toFixed()}-${(Math.random()*1000).toFixed()}-${(Math.random()*1000).toFixed()}`
  

const getDeviceCode = () => {
  
  const code = localStorage.getItem('deviceCode')

  const testCode = createCode()

  if(!code) {
    localStorage.setItem('deviceCode', testCode)
  }

    return  localStorage.getItem('deviceCode')!

}

export const useLoginAsGroup = () => {
  const [code, setCode] = useState("123456");

  const navigate = useNavigate();

  const { setIsGroup, setPlaceId } = useUserStore();
  
  const deviceCode = getDeviceCode()

  const handleLoginAsGroup = useCallback(async () => {
    try{
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

    if(res?.id === false) {
      throw new Error('Не верный код')
    }

    const req = !!res.place?.id

    setPlaceId(String(res.place?.id))

    setIsGroup(req);

    navigate( req ? "/testing" : '');}
    
    catch {
      toast.error('Неверный логин или пароль')
    }
  }, [code, deviceCode, navigate, setIsGroup, setPlaceId]);

  return { handleLoginAsGroup, setCode };
};
