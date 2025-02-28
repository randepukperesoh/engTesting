export const useHandleStopPing = () => {
    const handleStopPing = async () => {
      const formData = new FormData();
      formData.append("api", "TestPlaсeStopPing");
      await fetch("/back/auth/api/", { method: "POST", body: formData });
    };
  
    return { handleStopPing };
  };