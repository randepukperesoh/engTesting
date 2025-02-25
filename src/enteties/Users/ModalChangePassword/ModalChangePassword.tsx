import { FC, useState } from "react";
import { Modal } from "../../../shared/ui/Modal/Modal";
import { Button } from "../../../shared/ui/Button/Button";
import { Input } from "../../../shared/ui/Input/Input";

import styles from "./ModalChangePassword.module.scss";

export const useChangeUserPassword = () => {
  const [password, setPassword] = useState("");
  const [confrimPassword, setConfrimPassword] = useState("");

  const handleChangePassword = async () => {};

  return {
    handleChangePassword,
    setConfrimPassword,
    setPassword,
  };
};

export const ModalChangePassword: FC = () => {
  const { handleChangePassword, setPassword, setConfrimPassword } =
    useChangeUserPassword();

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
            onChange={(e) => setConfrimPassword(e.currentTarget.value)}
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
