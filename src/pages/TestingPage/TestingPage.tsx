import { useGetTestPlaseRegister } from "../../shared/hooks/useGetTestPlaseRegister";
import { FC, useCallback, useState } from "react";
import { Button } from "../../shared/ui/Button/Button";
import useMicrophone from "../../shared/hooks/useMicrophone";
import { useTestPlacePing } from "../../shared/hooks/useTestPlacePing";
import { TestingInstruction } from "../../enteties/Testing/TestingInstruction/TestingInstruction";
import { TestingStepik } from "../../enteties/Testing/TestingStepik/TestingStepik";
import { useUserStore } from "../../shared/stores/useUserStore";
import { useStartExam } from "../../shared/hooks/useStartExam";
import { useFinish } from "../../shared/hooks/useFinish";

import styles from "./TestingPage.module.scss";

const TestingPage: FC = () => {
  const [step, setStep] = useState(-1);

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

  useMicrophone();

  return (
    <div className={styles.wrapper}>
      {step === -1 && (
        <div className={styles.test}>
          {id !== 0 && <div className={styles.test_number}>{id}</div>}
          <div>{pingData?.fio}</div>
          <div className={styles.test_btnGroup}>
            <Button>Отключиться</Button>
            <Button onClick={() => pingData?.fio && setStep(0)}>
              Начать тестирование
            </Button>
          </div>
        </div>
      )}
      {step === 0 && <TestingInstruction handleStartTest={handleStartTest} />}
      {step === 1 && <TestingStepik handleFinishTest={handleFinishTest} />}
      {step === 2 && <div>ВЫ ЗАВЕРШИЛИ ТЕСТИРОВАНИЕ</div>}
    </div>
  );
};

export default TestingPage;
