import { useHandleDeleteExam } from "../../../shared/hooks/useHandleDeleteExam";
import { Button } from "../../../shared/ui/Button/Button";
import { Modal } from "../../../shared/ui/Modal/Modal";

export const ModalDeleteExam = ({ examId }: { examId: string }) => {
  const { handleDeleteExam } = useHandleDeleteExam(examId);
  return (
    <Modal
      rendreProp={(setIsOpen) => (
        <div>
          <h2>Вы уверены, что хотите удалить экзамен?</h2>
          <Button
            onClick={() => handleDeleteExam(() => setIsOpen(false))}
            styledButton="red"
          >
            Удалить
          </Button>
        </div>
      )}
    >
      <Button styledButton="red">Удалить</Button>
    </Modal>
  );
};
