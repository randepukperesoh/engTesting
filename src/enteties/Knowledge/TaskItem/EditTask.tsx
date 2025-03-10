import { FC } from "react";
import { Button } from "../../../shared/ui/Button/Button";
import Dropdown from "../../../shared/ui/DropDown/DropDown";
import { useHandleChangeExamStepsStageNums } from "../../../shared/hooks/useHandleChangeExamStepsStageNums";
import { Link } from "react-router-dom";
import { useHandleDeleteTask } from "../../../shared/hooks/useHandleDeleteTask";

import styles from "./TaskItem.module.scss";

interface ITaskItem {
  stepId: string;
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
  stepId,
}) => {
  const { handleChangeExamStepsStageNums } =
    useHandleChangeExamStepsStageNums();

  const { handleDeleteTask } = useHandleDeleteTask(stepId);

  return (
    <div className={styles.item}>
      <Link to={`/knowledge/task/${stepId}`}>
        <div className={styles.item_title}>{title}</div>
      </Link>
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
                  idInExam + 1 + ""
                );
                callback?.();
              }}
              style={{ width: "100%" }}
            >
              Переместить вниз
            </Button>
          ),
          <Button
            onClick={() => {
              handleDeleteTask();
              callback?.();
            }}
            styledButton="red"
            style={{ width: "100%" }}
          >
            Удалить
          </Button>,
        ]}
      >
        <Button>...</Button>
      </Dropdown>
    </div>
  );
};
