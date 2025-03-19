import { Button } from "../../../shared/ui/Button/Button";
import { Modal } from "../../../shared/ui/Modal/Modal";
import { useHandleClearAll } from "../../../shared/hooks/useHandleClearAll";
import { DeleteIcon } from "../../../shared/ui/icons/DeleteIcon";

import styles from "./ModalClearAll.module.scss";

export const ModalClearAll = ({ place_id }: { place_id: string }) => {
  const { handleClearAll } = useHandleClearAll(place_id);
  return (
    <Modal
      rendreProp={() => (
        <div className={styles.modal}>
          <h2>Вы уверены?</h2>
          <Button onClick={handleClearAll}>Очистить всё</Button>
        </div>
      )}
    >
      <Button style={{ width: "100%" }} styledButton="red">
        <DeleteIcon />
        Очистить всё
      </Button>
    </Modal>
  );
};
