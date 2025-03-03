import { FC } from "react";
import { useHandleDeleteUser } from "../../../shared/hooks/useHandleDeleteUser";
import { Button } from "../../../shared/ui/Button/Button";
import { Modal } from "../../../shared/ui/Modal/Modal";

import styles from "./ModalDeleteUser.module.scss";

interface IModalDeleteUser {
  deviceId: number;
  name: string;
  rand_code: string;
}

export const ModalDeleteUser: FC<IModalDeleteUser> = ({
  deviceId,
  name,
  rand_code,
}) => {
  const { handleDeleteUser } = useHandleDeleteUser();
  return (
    <Modal
      rendreProp={(setIsOpen) => (
        <>
          <Button
            onClick={() => {
              handleDeleteUser(deviceId, () => setIsOpen(false));
            }}
          >
            Сбросить пользователя
          </Button>
        </>
      )}
    >
      <div className={styles.selectedUser}>
        {name}
        <span className={styles.selectedUser_code}>{rand_code}</span>
      </div>
    </Modal>
  );
};
