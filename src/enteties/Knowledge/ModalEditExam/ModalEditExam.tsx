import { useHandleEditExam } from "../../../shared/hooks/useHandleEditExam";
import { Button } from "../../../shared/ui/Button/Button";
import { Input } from "../../../shared/ui/Input/Input";
import { Modal } from "../../../shared/ui/Modal/Modal";

import styles from "./ModalEditExam.module.scss";

export const ModalEditExam = ({ examId }: { examId: string }) => {
  const { handleEditExam, setDescription, setTitle } =
    useHandleEditExam(examId);

  return (
    <Modal
      rendreProp={(setIsOpen) => (
        <div className={styles.content}>
          <h2>Редактирование экзамена</h2>
          <Input
            onChange={(e) => setTitle(e.currentTarget.value)}
            label="Название"
          />
          <Input
            onChange={(e) => setDescription(e.currentTarget.value)}
            label="Описание"
          />

          <Button onClick={() => handleEditExam(() => setIsOpen(false))}>
            Сохранить
          </Button>
        </div>
      )}
    >
      <Button>Изменить</Button>
    </Modal>
  );
};
