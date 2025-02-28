import { useState, useEffect } from 'react';

interface UseAudioRecorderProps {
  onUpload: (audioBlob: Blob) => void; 
}

export const useUploadAudio = ({ onUpload }: UseAudioRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newMediaRecorder = new MediaRecorder(stream);

      newMediaRecorder.addEventListener('dataavailable', (event) => {
        if (event.data.size > 0) {
          setAudioChunks((prevChunks) => [...prevChunks, event.data]);
        }
      });

      newMediaRecorder.start();
      setMediaRecorder(newMediaRecorder);
      setIsRecording(true);
    } catch (error) {
      console.error('Не удалось начать запись:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  useEffect(() => {
    if (mediaRecorder) {
      mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        onUpload(audioBlob); 
        setAudioChunks([]); 
      });
    }

    return () => {
      if (mediaRecorder) {
        mediaRecorder.removeEventListener('stop', () => {});
      }
    };
  }, [mediaRecorder, audioChunks, onUpload]);

  return {
    isRecording,
    startRecording,
    stopRecording,
  };
};
