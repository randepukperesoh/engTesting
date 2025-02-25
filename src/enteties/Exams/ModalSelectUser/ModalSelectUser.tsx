import { Button } from "../../../shared/ui/Button/Button";
import { Input } from "../../../shared/ui/Input/Input";
import { Modal } from "../../../shared/ui/Modal/Modal";
import { SelectUser } from "../../../shared/ui/SelectUser/SelectUser";

import styles from "./ModalSelectUser.module.scss";

export const ModalSelectUser = () => {
  const selectedUser = false;
  return (
    <Modal
      rendreProp={(setIsOpen) => (
        <div className={styles.modal}>
          <h2 className={styles.modal_h2}>Выбор пользователя</h2>
          <Input label="Поиск пользователя" />
          <div className={styles.modal_users}>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
          </div>
          <Button onClick={() => setIsOpen(false)}>Закрыть</Button>
        </div>
      )}
    >
      {selectedUser ? <></> : <SelectUser />}
    </Modal>
  );
};
