import { useCallback, useState } from "react";
import { useGetPlanExam } from "../../../shared/hooks/useGetPlanExam";
import { Button } from "../../../shared/ui/Button/Button";
import { useAudioRecorder } from "../../../shared/hooks/useAudioRecorder";
import { Timer } from "../Timer/Timer";
import { useTimer } from "../../../shared/hooks/useTimer";
import { useUploadAudiio } from "../../../shared/hooks/useUploadAudiio";
import { useUnicId } from "../../../shared/hooks/useUnicId";
import { useGetStepPlan } from "../../../shared/hooks/useGetStepPlan";
import { StepikItem } from "../StepikItem/StepikItem";
import { useHandleStopPing } from "../../../shared/hooks/useHandleStopPing";

import styles from "./TestingStepik.module.scss";

export const TestingStepik = ({
  handleFinishTest,
}: {
  handleFinishTest: () => void;
}) => {
  const [step, setStep] = useState(0);
  const { stepsId, data } = useGetStepPlan();
  const { id: sh } = useUnicId();

  const { data: planExam } = useGetPlanExam(stepsId?.[step] || null, sh);

  const { startRecording, stopRecording, isRecording } = useAudioRecorder();

  const { handleUpload } = useUploadAudiio(sh, stepsId, step);

  const { handleStopPing } = useHandleStopPing();

  const handleNext = useCallback(async () => {
    if (isRecording) {
      const blob = await stopRecording();
      if (blob) {
        handleUpload(blob);
      }
    }
    stopRecording();

    if (step === 3) {
      handleFinishTest();
      handleStopPing();
    }
    setStep((prev) => prev + 1);
  }, [
    handleFinishTest,
    handleStopPing,
    handleUpload,
    isRecording,
    step,
    stopRecording,
  ]);

  const { time } = useTimer(
    handleNext,
    // step,
    isRecording,
    startRecording,
    data?.[step].training_time || 90,
    data?.[step].recording_time || 90
  );

  return (
    <>
      <Timer isRecording={isRecording} time={time} />
      <div className={styles.stepik}>
        {planExam?.map((el) => (
          <StepikItem {...el} key={"step_" + el.id} />
        ))}

        {!isRecording && (
          <div>
            <Button key={"start_record"} onClick={() => startRecording()}>
              Начать запись
            </Button>
          </div>
        )}

        {isRecording && (
          <div>
            <Button key={"send_record"} onClick={handleNext}>
              Отправить ответ
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
