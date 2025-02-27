import { useCallback, useEffect, useMemo, useState } from "react";
import {
  IPlanBlock,
  useGetPlanExam,
} from "../../../shared/hooks/useGetPlanExam";
import { Button } from "../../../shared/ui/Button/Button";
import { useAudioRecorder } from "./hook";
import { Timer } from "./Timer/Timer";
import { useTimer } from "./useTimer";

import styles from "./TestingStepik.module.scss";

const StepikItem = ({ data, type }: IPlanBlock) => {
  if (type === "title") return <h2>{data}</h2>;
  if (type === "image") return <img height={400} src={data} />;
  if (type === "text") {
    const parts = data.split(/<br\s*\/?>/);

    const filteredParts = parts?.filter((part) => part.trim() !== "");
    return (
      <div>
        {filteredParts.map((el) => (
          <div>{el}</div>
        ))}
      </div>
    );
  }
  return null;
};
interface IPlan {
  id: number;
  created_at: string;
  updated_at: string;
  exam_id: number;
  user_id: number;
  title: string;
  description: string;
  status: string;
  stage_num: number;
  training_time: number;
  recording_time: number;
  has_training: boolean;
}
const useGetStepPlan = () => {
  const [data, setData] = useState<IPlan[] | null>(null);

  useEffect(() => {
    const fetchStepPlan = async () => {
      const response = await fetch("/back/main/examination/api/getStepPlan", {
        method: "Post",
        body: new FormData(),
      });

      const res = await response.json();

      setData(res);
    };
    fetchStepPlan();
  }, []);

  const a = useMemo(() => {
    if (!data) return null;
    return data.map((el) => el.id).sort((a, b) => a - b);
  }, [data]);

  return { stepsId: a };
};

export const TestingStepik = ({
  handleFinishTest,
}: {
  handleFinishTest: () => void;
}) => {
  const [step, setStep] = useState(0);
  const { stepsId } = useGetStepPlan();

  const { data: planExam } = useGetPlanExam(stepsId?.[step] || null);

  const handleUpload = useCallback(
    async (audioBlob: Blob) => {
      if (!stepsId) return null;
      const formData = new FormData();
      formData.append("file", audioBlob, "recording.wav");
      formData.append("step_id", String(stepsId[step]));
      try {
        const response = await fetch("/back/main/examination/api/uploadAudio", {
          method: "POST",
          body: formData,
        });

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
    if (step === 3) {
      handleFinishTest();
    }
    setStep((prev) => prev + 1);
  }, [handleUpload, lastBlob, step, stopRecording]);

  const { time } = useTimer(handleNext, step, isRecording, startRecording);

  return (
    <>
      <Timer isRecording={isRecording} time={time} />
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
