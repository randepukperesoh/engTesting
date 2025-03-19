import { FC } from "react";
import { useHandleDeleteUser } from "../../../shared/hooks/useHandleDeleteUser";
import { Button } from "../../../shared/ui/Button/Button";
import { Modal } from "../../../shared/ui/Modal/Modal";

import styles from "./ModalDeleteUser.module.scss";

interface IModalDeleteUser {
  deviceId: number;
  name: string;
}

export const ModalDeleteUser: FC<IModalDeleteUser> = ({ deviceId, name }) => {
  const { handleDeleteUser } = useHandleDeleteUser();
  return (
    <Modal
      rendreProp={(setIsOpen) => (
        <div className={styles.wrapper}>
          <h2>Сбросить пользователя {name}</h2>
          <Button
            onClick={() => {
              handleDeleteUser(deviceId, () => setIsOpen(false));
            }}
          >
            Сбросить пользователя
          </Button>
        </div>
      )}
    >
      <div className={styles.selectedUser}>{name}</div>
    </Modal>
  );
};
