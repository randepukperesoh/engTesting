import { useEffect, useState } from "react";

export const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<ErrorEvent | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newMediaRecorder = new MediaRecorder(stream);
      const audioChunks: BlobPart[] = [];

      newMediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      newMediaRecorder.onerror = (err) => {
        setError(err);
      };

      newMediaRecorder.onstop = () => {
        // Очищаем ошибку после остановки записи
        setError(null);
      };

      newMediaRecorder.start();
      setMediaRecorder(newMediaRecorder);
      setIsRecording(true); // Устанавливаем флаг записи в true
    } catch (err) {
      setError(err as ErrorEvent);
      setIsRecording(false); // Если произошла ошибка, устанавливаем false
    }
  };

  const stopRecording = (): Promise<Blob> => {
    return new Promise((resolve) => {
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        const audioChunks: BlobPart[] = []; // Создаём новый массив для хранения данных

        // Перехватываем данные при остановке
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunks.push(event.data);
          }
        };

        // Обрабатываем завершение записи
        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          resolve(audioBlob); // Разрешаем промис с созданным blob
          setIsRecording(false); // Устанавливаем флаг записи в false
        };

        mediaRecorder.stop(); // Останавливаем запись
      } else {
        setIsRecording(false); // Если запись уже остановлена, устанавливаем false
        resolve(new Blob([], { type: 'audio/wav' })); // Возвращаем пустой blob
      }
    });
  };

  useEffect(() => {
    return () => {
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop(); // Останавливаем запись при размонтировании компонента
        setIsRecording(false); // Устанавливаем флаг записи в false
      }
    };
  }, [mediaRecorder]);

  return { isRecording, startRecording, stopRecording, error };
};