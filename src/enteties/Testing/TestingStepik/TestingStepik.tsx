import { useCallback, useEffect, useState } from "react";
import {
  IPlanBlock,
  useGetPlanExam,
} from "../../../shared/hooks/useGetPlanExam";
import { Button } from "../../../shared/ui/Button/Button";

import styles from "./TestingStepik.module.scss";
// import { useUploadAudio } from "../../../shared/hooks/useUploadAudio";
import { useAudioRecorder } from "./hook";

const StepikItem = ({ data, type }: IPlanBlock) => {
  if (type === "title") return <h2>{data}</h2>;
  if (type === "image") return <img height={400} src={data} />;
  if (type === "text") return <div>{data}</div>;
  return null;
};

export const TestingStepik = () =>
  //   {

  // }: {
  //   handleFinishTest: () => void;
  // }
  {
    const [step, setStep] = useState(1);
    const [time, setTime] = useState(0);
    const { data: planExam } = useGetPlanExam(step);

    const handleUpload = useCallback(
      async (audioBlob: Blob) => {
        const formData = new FormData();
        formData.append("file", audioBlob, "recording.wav");
        formData.append("step_id", String(step));
        try {
          const response = await fetch(
            "/back/main/examination/api/uploadAudio",
            {
              method: "POST",
              body: formData,
            }
          );

          if (!response.ok) {
            console.error("Ошибка при отправке аудио:", response.statusText);
          }
        } catch (error) {
          console.error("Ошибка при отправке аудио:", error);
        }
      },
      [step]
    );

    const {
      startRecording,
      stopRecording,
      blob: lastBlob,
      isRecording,
    } = useAudioRecorder();

    const handleNext = useCallback(async () => {
      stopRecording();
      handleUpload(lastBlob || new Blob());
      if (step === 5) {
        // handleFinishTest();
      }
      setStep((prev) => prev + 1);
    }, [handleUpload, lastBlob, step, stopRecording]);

    useEffect(() => {
      if ([1, 2, 4].includes(step)) {
        setTime(10);
      }
      if ([1, 2, 4].includes(step) && isRecording === true) {
        setTime(90);
      }

      if (step === 3) {
        setTime(150);
      }

      if (step === 3 && isRecording === true) {
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

    return (
      <>
        <div>{time}</div>
        <div className={styles.stepik}>
          {planExam?.map((el) => (
            <StepikItem {...el} key={"step_" + el.id} />
          ))}

          <div>
            <Button key={"start_record"} onClick={() => startRecording()}>
              Начать запись
            </Button>
          </div>

          <div>
            <Button key={"send_record"} onClick={handleNext}>
              Отправить ответ
            </Button>
          </div>
        </div>
      </>
    );
  };
