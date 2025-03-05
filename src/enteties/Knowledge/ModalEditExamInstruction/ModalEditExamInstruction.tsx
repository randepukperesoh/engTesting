import { useHandleUpdateInstruction } from "../../../shared/hooks/useHandleUpdateInstruction";
import { Button } from "../../../shared/ui/Button/Button";
import { Modal } from "../../../shared/ui/Modal/Modal";
import { TextArea } from "../../../shared/ui/TextArea/TextArea";

export const ModalEditExamInstruction = ({ examId }: { examId: string }) => {
  const { handleEditInstruction, setText } = useHandleUpdateInstruction(examId);
  return (
    <Modal
      rendreProp={(setIsOpen) => (
        <div>
          <h2>Редактирование инструкции</h2>
          <div>
            <TextArea onChange={(e) => setText(e.currentTarget.value)} />
          </div>
          <Button onClick={() => handleEditInstruction(() => setIsOpen(false))}>
            Сохранить
          </Button>
        </div>
      )}
    >
      <Button>Редактировать инструкцию</Button>
    </Modal>
  );
};
