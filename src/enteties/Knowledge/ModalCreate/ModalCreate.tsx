import { useHandleCreateExamRandGroup } from "../../../shared/hooks/useHandleCreateExamRandGroup";
import { Button } from "../../../shared/ui/Button/Button";
import { Input } from "../../../shared/ui/Input/Input";
import { Modal } from "../../../shared/ui/Modal/Modal";

import styles from "./ModalCreate.module.scss";

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
        <div className={styles.create}>
          <Input
            label="Новая группа"
            isColumn
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
