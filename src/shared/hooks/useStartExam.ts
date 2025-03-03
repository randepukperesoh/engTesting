import { useEffect } from "react";

// Функция для проверки наличия куки stToken
const checkForStToken = (): boolean => {
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  return cookies.some((cookie) => cookie.startsWith("stToken="));
};

export const useStartExam = () => {
  useEffect(() => {
    const startExam = async () => {
      const formData = new FormData();
      formData.append("api", "TechDeviceUser_startExam");
      await fetch("/back/auth/api/", { method: "POST", body: formData });
    };

    // Запускаем интервал
    const intervalId = setInterval(async () => {
      if (checkForStToken()) {
        // Если кука stToken найдена, останавливаем интервал
        clearInterval(intervalId);
        console.log("Кука stToken найдена, запросы остановлены.");
      } else {
        // Если куки stToken нет, отправляем запрос
        await startExam();
      }
    }, 2500); // Интервал 2500 мс

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(intervalId);
  }, []);
};