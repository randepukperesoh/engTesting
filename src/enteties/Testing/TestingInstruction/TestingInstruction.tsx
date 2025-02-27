import { FC } from "react";
import { useGetExamInfo } from "../../../shared/hooks/useGetExamInfo";
import { Button } from "../../../shared/ui/Button/Button";
import { Loader } from "../../../shared/ui/Loader/Loader";

import styles from "./TestingInstruction.module.scss";

export const TestingInstruction: FC<{ handleStartTest: () => void }> = ({
  handleStartTest,
}) => {
  const { data: examInfo, isLoading } = useGetExamInfo();

  const parts = examInfo?.instruction_text.split(/<br\s*\/?>/);

  const filteredParts = parts?.filter((part) => part.trim() !== "");

  return (
    <div className={styles.instruction}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h2>Инструкция</h2>
          <div>
            {filteredParts?.map((el, i) => (
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
