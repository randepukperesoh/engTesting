import { FC } from "react";
import { useHandleCreateTask } from "../../../shared/hooks/useHandleCreateTask";
import { Button } from "../../../shared/ui/Button/Button";
import { Input } from "../../../shared/ui/Input/Input";
import { Modal } from "../../../shared/ui/Modal/Modal";

import styles from "./ModalCreateTask.module.scss";

interface IModalCreateTask {
  examId: string;
  refetch: () => void;
}

export const ModalCreateTask: FC<IModalCreateTask> = ({ examId, refetch }) => {
  const { handleCreateTask, setTitle } = useHandleCreateTask(examId);
  return (
    <Modal
      rendreProp={(setIsOpen) => (
        <div className={styles.content}>
          <h2>Создание задания</h2>
          <Input
            onChange={(e) => setTitle(e.currentTarget.value)}
            label="Название"
          />
          <Button
            onClick={() =>
              handleCreateTask(() => {
                setIsOpen(false);
                refetch();
              })
            }
          >
            Создать
          </Button>
        </div>
      )}
    >
      <Button>Создать задание</Button>
    </Modal>
  );
};
