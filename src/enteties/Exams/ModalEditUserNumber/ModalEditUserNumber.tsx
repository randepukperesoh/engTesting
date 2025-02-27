import { FC } from "react";

import styles from "./ModalEditUserNumber.module.scss";
import { Modal } from "../../../shared/ui/Modal/Modal";
import { Input } from "../../../shared/ui/Input/Input";
import { Button } from "../../../shared/ui/Button/Button";

interface IModalEditUserNumber {
  is_active: boolean;
  device_id: number;
}

export const ModalEditUserNumber: FC<IModalEditUserNumber> = ({
  is_active,
  device_id,
}) => {
  return (
    <Modal
      rendreProp={(setIsOpen) => (
        <div className={styles.modal}>
          <h2 className={styles.modal_h2}>Новый номер</h2>
          <Input className={styles.modal_input} />
          <div className={styles.modal_btnGroup}>
            <Button>Подтвердить</Button>
            <Button onClick={() => setIsOpen(false)}>Закрыть</Button>
          </div>
        </div>
      )}
    >
      <div className={styles.user}>
        <div>{device_id}</div>
        <div className={is_active ? styles.user_isActive : styles.user_isOff}>
          {is_active ? "Активный" : "Отключается"}
        </div>
      </div>
    </Modal>
  );
};
