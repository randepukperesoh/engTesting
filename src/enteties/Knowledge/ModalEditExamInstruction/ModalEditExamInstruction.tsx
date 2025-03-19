import { useHandleUpdateInstruction } from "../../../shared/hooks/useHandleUpdateInstruction";
import { Button } from "../../../shared/ui/Button/Button";
import { EditIcon } from "../../../shared/ui/icons/EditIcon";
import { SaveIcon } from "../../../shared/ui/icons/SaveIcon";
import { Modal } from "../../../shared/ui/Modal/Modal";
import { TextArea } from "../../../shared/ui/TextArea/TextArea";

import styles from "./ModalEditExamInstruction.module.scss";

export const ModalEditExamInstruction = ({
  examId,
  instruction,
}: {
  instruction: string;
  examId: string;
}) => {
  const { handleEditInstruction, setText } = useHandleUpdateInstruction(examId);
  return (
    <Modal
      rendreProp={(setIsOpen) => (
        <div className={styles.content}>
          <h2>Редактирование инструкции</h2>
          <div>
            <TextArea
              defaultValue={instruction}
              onChange={(e) => setText(e.currentTarget.value)}
            />
          </div>
          <Button onClick={() => handleEditInstruction(() => setIsOpen(false))}>
            <SaveIcon />
            Сохранить
          </Button>
        </div>
      )}
    >
      <div>
        <Button>
          <EditIcon /> Редактировать инструкцию
        </Button>
      </div>
    </Modal>
  );
};
