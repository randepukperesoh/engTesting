import { useState, useEffect } from "react";

interface MicrophoneStatus {
  hasMicrophone: boolean | null;
  isRecording: boolean; 
  error: string | null; 
  stream: MediaStream | null;
}

const useMicrophone = (): MicrophoneStatus & {
  startRecording: () => Promise<void>;
  stopRecording: () => void;
} => {
  const [hasMicrophone, setHasMicrophone] = useState<boolean | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const checkMicrophoneAvailability = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasMic = devices.some((device) => device.kind === "audioinput");
        setHasMicrophone(hasMic);
      } catch (err) {
        console.error("Ошибка при проверке микрофона:", err);
        setError("Не удалось проверить наличие микрофона.");
      }
    };

    checkMicrophoneAvailability();
  }, []);


  const startRecording = async () => {
    if (isRecording || !hasMicrophone) return;

    try {
      const newStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(newStream);
      setIsRecording(true);
      setError(null);
    } catch (err) {
      console.error("Ошибка доступа к микрофону:", err);
      setError("Доступ к микрофону был отклонён или устройство не найдено.");
    }
  };

  const stopRecording = () => {
    if (!stream) return;

    stream.getTracks().forEach((track) => track.stop());
    setStream(null);
    setIsRecording(false);
  };

  return {
    hasMicrophone,
    isRecording,
    error,
    stream,
    startRecording,
    stopRecording,
  };
};

export default useMicrophone;