import { FC } from "react";
import { Button } from "../../../shared/ui/Button/Button";
import Dropdown from "../../../shared/ui/DropDown/DropDown";
import { useHandleChangeExamStepsStageNums } from "../../../shared/hooks/useHandleChangeExamStepsStageNums";
import { Modal } from "../../../shared/ui/Modal/Modal";
import { useHandleUpdateTask } from "../../../shared/hooks/useHandleUpdateTask";
import { Input } from "../../../shared/ui/Input/Input";

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

  const { handleUpdateTask, setDescription, setTitle } =
    useHandleUpdateTask(stepId);

  return (
    <div className={styles.item}>
      <Modal
        rendreProp={(setIsOpen) => (
          <div className={styles.item_modal}>
            <h2>Обновить задание</h2>
            <Input
              onChange={(e) => setTitle(e.currentTarget.value)}
              label="Название"
            />
            <Input
              onChange={(e) => setDescription(e.currentTarget.value)}
              label="Описание"
            />
            <Button onClick={() => handleUpdateTask(() => setIsOpen(false))}>
              Сохранить
            </Button>
          </div>
        )}
      >
        <div className={styles.item_title}>{title} </div>
      </Modal>
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
