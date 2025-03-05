import { FC } from "react";
import { Button } from "../../../shared/ui/Button/Button";
import Dropdown from "../../../shared/ui/DropDown/DropDown";
import { useHandleChangeExamStepsStageNums } from "../../../shared/hooks/useHandleChangeExamStepsStageNums";
// import { Modal } from "../../../shared/ui/Modal/Modal";

import styles from "./TaskItem.module.scss";

interface ITaskItem {
  title: string;
  isLast: boolean;
  isFirst: boolean;
  idInExam: number;
  callback?: () => void;
}

export const TaskItem: FC<ITaskItem> = ({
  title,
  isFirst,
  isLast,
  idInExam,
  callback,
}) => {
  const { handleChangeExamStepsStageNums } =
    useHandleChangeExamStepsStageNums();
  return (
    <div className={styles.item}>
      {/* <Modal rendreProp={() => }> */}
      <div className={styles.item_title}>{title} </div>
      {/* </Modal> */}
      <Dropdown
        options={[
          <Button style={{ width: "100%" }}>Изменить название</Button>,
          !isFirst && (
            <Button
              onClick={() => {
                handleChangeExamStepsStageNums(
                  idInExam - 1 + "",
                  idInExam + ""
                );
                callback?.();
              }}
              style={{ width: "100%" }}
            >
              Переместить вверх
            </Button>
          ),
          !isLast && (
            <Button
              onClick={() => {
                handleChangeExamStepsStageNums(
                  idInExam + "",
                  idInExam - 1 + ""
                );
                callback?.();
              }}
              style={{ width: "100%" }}
            >
              Переместить вниз
            </Button>
          ),
        ]}
      >
        <Button>...</Button>
      </Dropdown>
    </div>
  );
};
