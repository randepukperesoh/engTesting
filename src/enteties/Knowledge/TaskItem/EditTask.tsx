import { FC } from "react";
import { Button } from "../../../shared/ui/Button/Button";
import Dropdown from "../../../shared/ui/DropDown/DropDown";
import { useHandleChangeExamStepsStageNums } from "../../../shared/hooks/useHandleChangeExamStepsStageNums";
import { Link } from "react-router-dom";
import { useHandleDeleteTask } from "../../../shared/hooks/useHandleDeleteTask";

import styles from "./TaskItem.module.scss";
import { DeleteIcon } from "../../../shared/ui/icons/DeleteIcon";
import { EditIcon } from "../../../shared/ui/icons/EditIcon";
import { ArrowUp } from "../../../shared/ui/icons/ArrowUp";
import { ArrowDown } from "../../../shared/ui/icons/ArrowDown";

interface ITaskItem {
  stepId: string;
  title: string;
  isLast: boolean;
  isFirst: boolean;
  idInExam: number;
  arr_time: [number, number];
  callback?: () => void;
  stepIdNext?: number;
  setIdPrev?: number;
}

export const TaskItem: FC<ITaskItem> = ({
  arr_time,
  title,
  isFirst,
  isLast,
  callback,
  stepId,
  stepIdNext,
  setIdPrev,
}) => {
  const { handleChangeExamStepsStageNums } =
    useHandleChangeExamStepsStageNums();

  const { handleDeleteTask } = useHandleDeleteTask(stepId);

  const [trainTime, recordTime] = arr_time;

  return (
    <div className={styles.item}>
      <Link to={`/knowledge/task/${stepId}`}>
        <div className={styles.item_title}>
          {title}{" "}
          <span className={styles.item_title_time}>
            время подготовки: {trainTime}, время записи: {recordTime}
          </span>
        </div>
      </Link>
      <Dropdown
        options={[
          <Button style={{ width: "100%" }}>
            {" "}
            <EditIcon /> Изменить название
          </Button>,
          !isFirst && (
            <Button
              onClick={() => {
                handleChangeExamStepsStageNums(stepId + "", stepIdNext + "");
                callback?.();
              }}
              style={{ width: "100%" }}
            >
              <ArrowUp />
              Переместить вверх
            </Button>
          ),
          !isLast && (
            <Button
              onClick={() => {
                handleChangeExamStepsStageNums(stepId + "", setIdPrev + "");
                callback?.();
              }}
              style={{ width: "100%" }}
            >
              <ArrowDown />
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
            <DeleteIcon />
            Удалить
          </Button>,
        ]}
      >
        <Button>...</Button>
      </Dropdown>
    </div>
  );
};
