import { useState } from "react";

type UploadError = string | null;

export const useHandleUploadImage = () => {
  const [file, setFile] = useState<File | null>(null); // Состояние выбранного файла
  const [isLoading, setIsLoading] = useState<boolean>(false); // Состояние загрузки
  const [error, setError] = useState<UploadError>(null); // Состояние ошибки

  // Объединенная функция для выбора файла и отправки его на сервер
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      setError("Файл не выбран");
      setFile(null);
      return;
    }

    setFile(selectedFile); // Сохраняем выбранный файл
    setError(null); // Сбрасываем ошибку

    setIsLoading(true); // Начинаем загрузку
    const formData = new FormData();
    formData.append("file", selectedFile); // Добавляем файл в FormData

    try {
      const response = await fetch('/back/main/admin/constructor/api/imageUp', {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result: {status: boolean, url: 'string'} = await response.json();

        return result.url; // Возвращаем результат загрузки
      } else {
        setError(`Ошибка сервера: ${response.statusText}`);
        return ''
      }
    } catch (err) {
      setError(`Произошла ошибка: ${err}`);
    } finally {
        setIsLoading(false); // Завершаем загрузку
    }
  };

  return {
    file, // Текущий выбранный файл
    isLoading, // Состояние загрузки
    error, // Ошибка загрузки
    handleUpload, // Объединенная функция для выбора и отправки файла

  };
};