import { FC } from "react";
import { Modal } from "../../../shared/ui/Modal/Modal";
import { Button } from "../../../shared/ui/Button/Button";
import { Input } from "../../../shared/ui/Input/Input";
import { useHandleCreateExam } from "../../../shared/hooks/useHandleCreateExam";

import styles from "./ModalCreateExam.module.scss";
import { PlusIcon } from "../../../shared/ui/icons/PlusIcon";

interface IModalCreateExam {
  refetch: () => void;
}

export const ModalCreateExam: FC<IModalCreateExam> = ({ refetch }) => {
  const { handleCreateExam, setDescription, setTitle } = useHandleCreateExam();

  return (
    <Modal
      rendreProp={(setIsoPen) => (
        <div className={styles.modal}>
          <h2>Создание нового экзамена</h2>
          <Input
            label="Название"
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <Input
            label="Описание"
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
          <Button
            onClick={() =>
              handleCreateExam(() => {
                setIsoPen(false);
                refetch();
              })
            }
          >
            <PlusIcon />
            Создать
          </Button>
        </div>
      )}
    >
      <Button>
        <PlusIcon />
        Создать
      </Button>
    </Modal>
  );
};
