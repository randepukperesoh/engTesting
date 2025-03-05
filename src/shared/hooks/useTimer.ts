import { useEffect, useState } from "react";

export const useTimer = (
  handleNext: () => Promise<void>,
  step: number,
  isRecording: boolean,
  startRecording: () => Promise<void>
) => {
  const [time, setTime] = useState(1);

  useEffect(() => {
    if ([0, 1, 3].includes(step)) {
      setTime(90);
    }
    if ([0, 1, 3].includes(step) && isRecording === true) {
      setTime(90);
    }

    if (step === 2) {
      setTime(150);
    }

    if (step === 2 && isRecording === true) {
      setTime(150);
    }
  }, [isRecording, step]);

  useEffect(() => {
    const tickfn = () => {
      setTime((prev) => prev - 1);
    };
    const idInterval = setInterval(tickfn, 1000);

    if (time === 0 && !isRecording) {
      startRecording();
    }

    if (time === 0 && isRecording) {
      handleNext();
    }

    return () => {
      clearInterval(idInterval);
    };
  }, [handleNext, isRecording, startRecording, time]);

  return { time };
};
