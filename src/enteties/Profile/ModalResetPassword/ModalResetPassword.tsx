import { FC } from "react";
import { Modal } from "../../../shared/ui/Modal/Modal";
import { Input } from "../../../shared/ui/Input/Input";
import { Button } from "../../../shared/ui/Button/Button";
import { useResetPassword } from "../../../shared/hooks/useResetPassword";

import styles from "./ModalResetPassword.module.scss";

export const ModalResetPassword: FC = () => {
  const { setPassword, handleReset } = useResetPassword();

  return (
    <Modal
      rendreProp={(setIsOpen) => (
        <div className={styles.wrapper}>
          <h2>Смена пароля</h2>
          <Input onChange={(e) => setPassword(e.currentTarget.value)} />
          <Button onClick={() => handleReset(() => setIsOpen(false))}>
            Сменить пароль
          </Button>
        </div>
      )}
    >
      <Button>Сменить пароль</Button>
    </Modal>
  );
};
