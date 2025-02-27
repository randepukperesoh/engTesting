import { useNavigate } from "react-router-dom";

export const useExit = () => {
  const navigate = useNavigate();
  const handleExit = async () => {
    try {
      // const response =
       await fetch("/back/main/api/profile/exit");

      // const res = await response.json();

      navigate('/login');
    } catch (e) {
      console.error(e);
    }
  };

  return {
    handleExit,
  };
};
