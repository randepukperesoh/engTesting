import { useHandleCreateExamRandGroup } from "../../../shared/hooks/useHandleCreateExamRandGroup";
import { Button } from "../../../shared/ui/Button/Button";
import { Input } from "../../../shared/ui/Input/Input";
import { Modal } from "../../../shared/ui/Modal/Modal";

export const ModalCreate = ({
  id,
  refetch,
  refetchS,
}: {
  id: string;
  refetch: () => void;
  refetchS: () => void;
}) => {
  const { handleCreateExamRandGroup, setTitle } =
    useHandleCreateExamRandGroup();

  return (
    <Modal
      rendreProp={(setIsOpen) => (
        <div
        //  className={styles.create}
        >
          <Input
            style={{ width: "95%" }}
            label="Новая группа"
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <Button
            onClick={() =>
              handleCreateExamRandGroup(id, () => {
                refetch();
                refetchS();
                setIsOpen(false);
              })
            }
          >
            Создать
          </Button>
        </div>
      )}
    >
      <Button>Создать новое значение</Button>
    </Modal>
  );
};
