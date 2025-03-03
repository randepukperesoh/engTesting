import { toast } from "react-toastify";

export const useHandleClearAll = (place_id: string) => {
    const handleClearAll = async () => {
      const formData = new FormData();
      formData.append("place_id", place_id);
      fetch("back/main/admin/techmanager/api/clerAllPlaceWithDevices", {
        method: "POST",
        body: formData,
      });
  
      toast.success("Аудитория очищена");
    };
  
    return {
      handleClearAll,
    };
  };