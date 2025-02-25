import { FC } from "react";
import { Modal } from "../../../shared/ui/Modal/Modal";
import { Button } from "../../../shared/ui/Button/Button";
import { Input } from "../../../shared/ui/Input/Input";

import styles from "./ModalChangePassword.module.scss";
import { useChangeUserPassword } from "../../../shared/hooks/useChangeUserPassword";

export const ModalChangePassword: FC<{ id: string }> = ({ id }) => {
  const { handleChangePassword, setPassword, setConfirmPassword } =
    useChangeUserPassword(id);

  return (
    <Modal
      rendreProp={() => (
        <div className={styles.modal}>
          <h2>Смена пароля</h2>
          <Input
            onChange={(e) => setPassword(e.currentTarget.value)}
            label="Пароль"
          />
          <Input
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
            label="Повторите пароль"
          />
          <Button onClick={handleChangePassword}>Подтвердить</Button>
        </div>
      )}
    >
      <Button>Сменить пароль</Button>
    </Modal>
  );
};
