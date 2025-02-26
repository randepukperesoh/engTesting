import { useState } from "react";
import { useGetPlanExam } from "../../../shared/hooks/useGetPlanExam";
import { Button } from "../../../shared/ui/Button/Button";
import useAudioRecorder from "../../../shared/hooks/useAudioRecorder";

import styles from "./TestingStepik.module.scss";

const MOCK_PLAN = [
  {
    id: 1,
    created_at: "2025-02-16T21:19:51.898452Z",
    updated_at: "2025-02-16T21:19:51.898452Z",
    user_id: 2,
    step_id: 1,
    is_rand: false,
    randcode: null,
    type: "title",
    data: "Task 1. Imagine that you are preparing a project with your friend. You have\nfound some interesting material for the presentation and you want to read this\ntext to your friend. You have 1.5 minutes to read the text silently, then be\nready to read it out aloud. You will not have more than 1.5 minutes to read it.",
    order_num: 1,
    status: "true",
  },
  {
    id: 2,
    created_at: "2025-02-16T21:21:55.674635Z",
    updated_at: "2025-02-16T21:21:55.674635Z",
    user_id: 2,
    step_id: 1,
    is_rand: true,
    randcode: "1234567890",
    type: "text",
    data: "There is nothing fancy or expensive about happiness. On the contrary, happiness is\nsimple and slow. It means choosing peace and quiet over excitement. It is wearing\nyour old pyjamas and watching a movie the day before Christmas. It is sitting in\nyour window watching the weather while sipping your favourite tea on a rainy day.\nIt is looking into the bonfire surrounded by your friends and family while your\nbread is slowly baking.\nHappiness is always about appreciating the simple pleasures in life and thus it can\nbe achieved on a really low budget. You cannot buy the right atmosphere or\na sense of togetherness. It’s all about time, interest and engagement in the people\naround you. Thus, happiness is an atmosphere which is not improved by spending\nmore money on it, but rather, in some ways, the opposite. After all, the best things\nin life are absolutely free. ",
    order_num: 2,
    status: "true",
  },
];

// const useUploadAudion = () => {
//   // file: (binary)

//   const data = new FormData();
//   data.append("file", "");
//   data.append("step_id", "");
//   data.append("sh", "");
//   fetch("https://speaktest.exesfull.com/main/examination/api/uploadAudio", {
//     method: "POST",
//   });
// };

export const TestingStepik = () => {
  const [step, setStep] = useState(1);
  const { data: fplanExam } = useGetPlanExam(step);
  const { startRecording, stopRecording, uploadAudio, isRecording } =
    useAudioRecorder();

  const planExam = fplanExam || MOCK_PLAN;

  return (
    <div className={styles.stepik}>
      {planExam.map((el, i) => (
        <div
          style={{ fontWeight: i === 0 ? "700" : "400" }}
          key={"step_" + el.id}
        >
          {el.data}
        </div>
      ))}
      {!isRecording ? (
        <div>
          <Button onClick={startRecording}>Начать запись</Button>
        </div>
      ) : (
        <div>
          <Button
            onClick={() => {
              stopRecording();
              setStep((prev) => prev + 1);
              uploadAudio(String(step), "");
            }}
          >
            Отправить ответ
          </Button>
        </div>
      )}
    </div>
  );
};
