import { FC } from "react";
import { Modal } from "../../../shared/ui/Modal/Modal";
import { Button } from "../../../shared/ui/Button/Button";
import { Input } from "../../../shared/ui/Input/Input";
import { Toggle } from "../../../shared/ui/Toggle/Toggle";

import styles from "./CreateUserModal.module.scss";

const CreateUserModal: FC = () => {
  return (
    <Modal
      rendreProp={(setIsOpen) => (
        <form className={styles.form}>
          <h2>Создание пользователя</h2>
          <Input label="Фамилия" />
          <Input label="Имя" />
          <Input label="Отчество" />
          <Input label="Логин" />
          <div className={styles.flex}>
            <span>Заблокирован:</span>
            <Toggle />
          </div>
          <div className={styles.flex}>
            <span>Администратор:</span>
            <Toggle />
          </div>
          <Input label="Пароль" />
          <div className={styles.btnGroup}>
            <Button onClick={() => setIsOpen(false)}>Закрыть</Button>
            <Button>Создать</Button>
          </div>
        </form>
      )}
    >
      <Button className={styles.btn}>Создать</Button>
    </Modal>
  );
};

export default CreateUserModal;
