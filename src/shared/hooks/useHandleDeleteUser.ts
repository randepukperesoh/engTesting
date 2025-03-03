import { toast } from "react-toastify";

export const useHandleDeleteUser = () => {
    const handleDeleteUser = async (id: number, callback?: () => void) => {
      const formData = new FormData();
      formData.append("device_id", String(id));
      await fetch("/back/main/admin/techmanager/api/DeleteUerForDevice", {
        method: "POST",
        body: formData,
      });

    toast.success('Пользователь удален')
  
      callback?.();
    };
  
    return { handleDeleteUser };
  };