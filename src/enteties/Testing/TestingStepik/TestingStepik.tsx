import { useCallback, useState } from "react";
import { useGetPlanExam } from "../../../shared/hooks/useGetPlanExam";
import { Button } from "../../../shared/ui/Button/Button";
import { useAudioRecorder } from "./hook";
import { Timer } from "./Timer/Timer";
import { useTimer } from "./useTimer";
import { useUploadAudiio } from "./useUploadAudiio";
import { useUnicId } from "./useUnicId";
import { useGetStepPlan } from "./useGetStepPlan";
import { StepikItem } from "./StepikItem";
import { useHandleStopPing } from "./useHandleStopPing";

import styles from "./TestingStepik.module.scss";

export const TestingStepik = ({
  handleFinishTest,
}: {
  handleFinishTest: () => void;
}) => {
  const [step, setStep] = useState(0);
  const { stepsId } = useGetStepPlan();
  const { id: sh } = useUnicId();

  const { data: planExam } = useGetPlanExam(stepsId?.[step] || null, sh);

  const {
    startRecording,
    stopRecording,
    blob: lastBlob,
    isRecording,
  } = useAudioRecorder();

  const { handleUpload } = useUploadAudiio(sh, stepsId, step);

  const { handleStopPing } = useHandleStopPing();

  const handleNext = useCallback(async () => {
    stopRecording();
    handleUpload(lastBlob || new Blob());
    if (step === 3) {
      handleFinishTest();
      handleStopPing();
    }
    setStep((prev) => prev + 1);
  }, [
    handleFinishTest,
    handleStopPing,
    handleUpload,
    lastBlob,
    step,
    stopRecording,
  ]);

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
