/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetTestPlaseRegister } from "../../shared/hooks/useGetTestPlaseRegister";
import { FC, useCallback, useState } from "react";
import { Button } from "../../shared/ui/Button/Button";
import useMicrophone from "../../shared/hooks/useMicrophone";
import { useTestPlacePing } from "../../shared/hooks/useTestPlacePing";
import { TestingInstruction } from "../../enteties/Testing/TestingInstruction/TestingInstruction";
import { TestingStepik } from "../../enteties/Testing/TestingStepik/TestingStepik";

import styles from "./TestingPage.module.scss";

const TestingPage: FC = () => {
  const [step, setStep] = useState(-1);
  const { data: isPlaceRegistered } = useGetTestPlaseRegister();
  const { data: pingData } = useTestPlacePing();

  const handleFinishTest = useCallback(() => {
    setStep(2);
  }, []);

  const handleStartTest = useCallback(() => {
    setStep(1);
  }, []);

  const { hasMicrophone } = useMicrophone();

  return (
    <div className={styles.wrapper}>
      {step === -1 && (
        <div className={styles.test}>
          <div className={styles.test_number}>{pingData?.num}</div>
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
      {step === 1 && (
        <TestingStepik
        //  handleFinishTest={handleFinishTest}
        />
      )}
      {step === 2 && <div>FINISH</div>}
    </div>
  );
};

export default TestingPage;
