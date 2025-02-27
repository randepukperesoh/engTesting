import { useState } from "react";

// interface AudioRecorderState {
//   isRecording: boolean; // Состояние записи
//   audioBlob: Blob | null; // Записанный аудио-файл
//   error: string | null; // Ошибка
// }



const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  let mediaRecorder: MediaRecorder | null = null; // Локальная переменная для MediaRecorder

  // Начало записи
  const startRecording = () => {
    if (isRecording) return;

    setIsRecording(true);
    setError(null);

    const audioChunks: BlobPart[] = [];

    const initRecorder = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunks.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(audioChunks, { type: "audio/mp3" });
          setAudioBlob(blob);
          setIsRecording(false);
        };

        mediaRecorder.start();
      } catch (err) {
        console.error("Ошибка записи аудио:", err);
        setError("Не удалось начать запись аудио.");
        setIsRecording(false);
      }
    };

    initRecorder();
  };

  // Остановка записи
  const stopRecording = () => {
    if (!isRecording || !mediaRecorder) return;

    // Если mediaRecorder существует, останавливаем его
    mediaRecorder.stop();
    mediaRecorder = null; // Обнуляем ссылку после остановки
  };

  // Отправка файла на сервер
  const uploadAudio = async (stepId: string, sh: string) => {
    if (!audioBlob) {
      setError("Сначала запишите аудио!");
      return;
    }

    const formData = new FormData();
    formData.append("file", new File([audioBlob], "recording.mp3", { type: "audio/mp3" }));
    formData.append("step_id", stepId);
    formData.append("sh", sh);

    try {
      const response = await fetch(
        "/back/main/examination/api/uploadAudio",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Аудио успешно загружено!");
      } else {
        setError("Произошла ошибка при загрузке аудио.");
      }
    } catch (err) {
      console.error("Ошибка при отправке аудио:", err);
      setError("Произошла ошибка при отправке аудио.");
    }
  };

  return {
    isRecording,
    audioBlob,
    error,
    startRecording,
    stopRecording,
    uploadAudio,
  };
};

export default useAudioRecorder;