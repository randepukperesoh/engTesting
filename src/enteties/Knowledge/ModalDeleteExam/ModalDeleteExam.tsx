import { useHandleDeleteExam } from "../../../shared/hooks/useHandleDeleteExam";
import { Button } from "../../../shared/ui/Button/Button";
import { DeleteIcon } from "../../../shared/ui/icons/DeleteIcon";
import { Modal } from "../../../shared/ui/Modal/Modal";

export const ModalDeleteExam = ({ examId }: { examId: string }) => {
  const { handleDeleteExam } = useHandleDeleteExam(examId);
  return (
    <Modal
      // style={{ width: "100%" }}
      rendreProp={(setIsOpen) => (
        <div>
          <h2>Вы уверены, что хотите удалить экзамен?</h2>
          <Button
            onClick={() => handleDeleteExam(() => setIsOpen(false))}
            styledButton="red"
          >
            <DeleteIcon />
            Удалить
          </Button>
        </div>
      )}
    >
      <Button style={{ width: "100%" }} styledButton="red">
        {" "}
        <DeleteIcon /> Удалить
      </Button>
    </Modal>
  );
};
