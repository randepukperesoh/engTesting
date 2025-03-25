import { FC } from "react";
import { useGetExamInfo } from "../../../shared/hooks/useGetExamInfo";
import { Button } from "../../../shared/ui/Button/Button";
import { Loader } from "../../../shared/ui/Loader/Loader";

import styles from "./TestingInstruction.module.scss";

export const TestingInstruction: FC<{
  handleStartTest: () => void;
  sh: string;
}> = ({ handleStartTest, sh }) => {
  const { data: examInfo, isLoading } = useGetExamInfo(sh);

  const parts = examInfo?.instruction_text.split(/<br\s*\/?>/);

  const filteredParts = parts?.filter((part) => part.trim() !== "");

  const processedParts = filteredParts?.flatMap((part) => {
    return part.split(/<\/?b>/).filter((segment) => segment.trim() !== "");
  });

  return (
    <div className={styles.instruction}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h2>Инструкция</h2>
          <div>
            {processedParts?.map((el, i) => (
              <div key={el + "_" + i}>{el}</div>
            ))}
          </div>
          <div>
            <Button onClick={handleStartTest}>Начать экзамен</Button>
          </div>
        </>
      )}
    </div>
  );
};
