const api = import.meta.env.VITE_API_URL;

export const useHandleStopPing = () => {
  const handleStopPing = async () => {
    const formData = new FormData();
    formData.append("api", "TestPlaсeStopPing");
    await fetch(api + "/auth/api/", { method: "POST", body: formData });
  };

  return { handleStopPing };
};
