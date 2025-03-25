import { useGetTestPlaseRegister } from "../../shared/hooks/useGetTestPlaseRegister";
import { FC, useCallback, useEffect, useState } from "react";
import { Button } from "../../shared/ui/Button/Button";
import { useTestPlacePing } from "../../shared/hooks/useTestPlacePing";
import { TestingInstruction } from "../../enteties/Testing/TestingInstruction/TestingInstruction";
import { TestingStepik } from "../../enteties/Testing/TestingStepik/TestingStepik";
import { useUserStore } from "../../shared/stores/useUserStore";
import { useStartExam } from "../../shared/hooks/useStartExam";
import { useFinish } from "../../shared/hooks/useFinish";
import { useNavigate } from "react-router-dom";
import { useHandleStopPing } from "../../shared/hooks/useHandleStopPing";
import { useAudioRecorder } from "../../shared/hooks/useAudioRecorder";

import styles from "./TestingPage.module.scss";
import { useUnicId } from "../../shared/hooks/useUnicId";

const Finish = ({ setStep }: { setStep: (value: number) => void }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectFinish = () => {
      window.location.reload();
    };

    const timeoutId = setTimeout(redirectFinish, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [navigate, setStep]);
  return <div>ВЫ ЗАВЕРШИЛИ ТЕСТИРОВАНИЕ</div>;
};

const TestingPage: FC = () => {
  const [step, setStep] = useState(-1);

  const { id: sh } = useUnicId();

  const navigate = useNavigate();

  useGetTestPlaseRegister();

  useStartExam();

  const { data: pingData } = useTestPlacePing(step);

  const { handlePostFinish } = useFinish();

  const { id } = useUserStore();

  const handleFinishTest = useCallback(() => {
    setStep(2);
    handlePostFinish();
  }, [handlePostFinish]);

  const handleStartTest = useCallback(() => {
    setStep(1);
  }, []);

  const { handleStopPing } = useHandleStopPing();

  const { startRecording, stopRecording, isRecording, isAvailible } =
    useAudioRecorder();

  const discard = () => {
    navigate("/login");
    handleStopPing();
  };

  return (
    // <div className={styles.wrapper}>
    <>
      {step === -1 && (
        <div className={styles.test}>
          {id !== 0 && <div className={styles.test_number}>{id}</div>}
          <div>{pingData?.fio}</div>
          <div className={styles.test_btnGroup}>
            {!pingData?.fio && (
              <Button styledButton="red" onClick={discard}>
                Отключиться
              </Button>
            )}
            {!isAvailible && (
              <Button
                onClick={() => {
                  if (!isRecording) startRecording();
                  if (isRecording) stopRecording();
                }}
              >
                Проверить микрофон
              </Button>
            )}
            {pingData?.fio && isAvailible && (
              <Button onClick={() => setStep(0)}>Начать тестирование</Button>
            )}
          </div>
        </div>
      )}
      {step === 0 && (
        <TestingInstruction sh={sh} handleStartTest={handleStartTest} />
      )}
      {step === 1 && (
        <TestingStepik sh={sh} handleFinishTest={handleFinishTest} />
      )}
      {step === 2 && <Finish setStep={setStep} />}
    </>
    // {/* </div> */}
  );
};

export default TestingPage;
