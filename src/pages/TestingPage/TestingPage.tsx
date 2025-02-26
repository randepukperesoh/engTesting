// import { useGetTestPlaseRegister } from "../../shared/hooks/useGetTestPlaseRegister";
import { FC, useCallback, useState } from "react";
// import { Button } from "../../shared/ui/Button/Button";
import useMicrophone from "../../shared/hooks/useMicrophone";
// import { IPing, useTestPlacePing } from "../../shared/hooks/useTestPlacePing";
// import { useGetExamInfo } from "../../shared/hooks/useGetExamInfo";
// import { useGetPlanExam } from "../../shared/hooks/useGetPlanExam";

import styles from "./TestingPage.module.scss";
import { TestingInstruction } from "../../enteties/Testing/TestingInstruction/TestingInstruction";
import { TestingStepik } from "../../enteties/Testing/TestingStepik/TestingStepik";

// const MockPing: IPing = {
//   id: 42,
//   created_at: "2025-02-26T08:57:41.000000Z",
//   updated_at: "2025-02-26T08:57:41.000000Z",
//   rand_code: "bac55b64-95a1-42e9-9b5b-503c41c885b8",
//   is_active: true,
//   action: null,
//   last_ping_date: "2025-02-26T08:57:41.000000Z",
//   place_id: 1,
//   num: 12,
//   select_user_id: null,
//   fio: null,
// };

const TestingPage: FC = () => {
  const [step, setStep] = useState(0);
  // const { data: isPlaceRegistered } = useGetTestPlaseRegister();
  // const { data: fPingData } = useTestPlacePing();
  // const { data: fExamInfom } = useGetExamInfo();
  // const {} = useGetPlanExam();

  const handleStartTest = useCallback(() => {
    setStep(1);
  }, []);

  const { hasMicrophone } = useMicrophone();

  console.log({ hasMicrophone });

  // const pingData = fPingData || MockPing;
  return (
    <div className={styles.wrapper}>
      {/* <div className={styles.test}>
        <div className={styles.test_number}>{pingData.num}</div>
        <div className={styles.test_btnGroup}>
          <Button>Отключиться</Button>
          <Button>Начать тестирование</Button>
        </div>
      </div> */}
      {step === 0 && <TestingInstruction handleStartTest={handleStartTest} />}
      {step !== 0 && <TestingStepik />}
    </div>
  );
};

export default TestingPage;
