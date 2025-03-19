import { useHandleEditExam } from "../../../shared/hooks/useHandleEditExam";
import { Button } from "../../../shared/ui/Button/Button";
import { EditIcon } from "../../../shared/ui/icons/EditIcon";
import { SaveIcon } from "../../../shared/ui/icons/SaveIcon";
import { Input } from "../../../shared/ui/Input/Input";
import { Modal } from "../../../shared/ui/Modal/Modal";
import { ModalDeleteExam } from "../ModalDeleteExam/ModalDeleteExam";
import { ModalEditExamInstruction } from "../ModalEditExamInstruction/ModalEditExamInstruction";

import styles from "./ModalEditExam.module.scss";

export const ModalEditExam = ({
  examId,
  description,
  title,
  instruction,
}: {
  title: string;
  description: string;
  examId: string;
  instruction: string;
}) => {
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
            defaultValue={title}
          />
          <Input
            onChange={(e) => setDescription(e.currentTarget.value)}
            label="Описание"
            defaultValue={description}
          />
          <ModalEditExamInstruction instruction={instruction} examId={examId} />

          <ModalDeleteExam examId={examId} />
          <Button
            onClick={() =>
              handleEditExam(title, description, () => setIsOpen(false))
            }
          >
            <SaveIcon />
            Сохранить
          </Button>
        </div>
      )}
    >
      <Button>
        <EditIcon /> Изменить
      </Button>
    </Modal>
  );
};
