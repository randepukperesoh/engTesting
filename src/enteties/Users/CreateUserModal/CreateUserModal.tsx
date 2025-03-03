import { FC, useState } from "react";
import { Modal } from "../../../shared/ui/Modal/Modal";
import { Button } from "../../../shared/ui/Button/Button";
import { Input } from "../../../shared/ui/Input/Input";
import { Toggle } from "../../../shared/ui/Toggle/Toggle";

import styles from "./CreateUserModal.module.scss";
import { toast } from "react-toastify";

const useHandleCreateUser = () => {
  // Состояния для каждого поля формы
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [otherName, setOtherName] = useState("");
  const [login, setLogin] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);

  // Функция для отправки данных на сервер
  const handleCreateUser = async () => {
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("last_name", lastName);
    formData.append("first_name", firstName);
    formData.append("other_name", otherName);
    formData.append("login", login);
    formData.append("is_active", String(isActive));
    formData.append("is_admin", String(isAdmin));
    formData.append("password", password);
    formData.append("api", "createUser");

    try {
      const response = await fetch("/back/main/admin/users/api/createUser", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Ошибка при создании пользователя");
      }

      const result = await response.json();
      setResponse(result);

      toast.success("Пользователь успешно создан");
    } catch (err) {
      setError(err as string);
    } finally {
      setLoading(false);
    }
  };

  return {
    lastName,
    setLastName,
    firstName,
    setFirstName,
    otherName,
    setOtherName,
    login,
    setLogin,
    isActive,
    setIsActive,
    isAdmin,
    setIsAdmin,
    password,
    setPassword,
    loading,
    error,
    response,
    handleCreateUser,
  };
};

const CreateUserModal: FC = () => {
  const {
    handleCreateUser,
    setFirstName,
    setIsActive,
    setIsAdmin,
    setLastName,
    setLogin,
    setOtherName,
    setPassword,
  } = useHandleCreateUser();

  return (
    <Modal
      rendreProp={(setIsOpen) => (
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <h2>Создание пользователя</h2>
          <Input
            onChange={(e) => setLastName(e.currentTarget.value)}
            label="Фамилия"
          />
          <Input
            onChange={(e) => setFirstName(e.currentTarget.value)}
            label="Имя"
          />
          <Input
            onChange={(e) => setOtherName(e.currentTarget.value)}
            label="Отчество"
          />
          <Input
            onChange={(e) => setLogin(e.currentTarget.value)}
            label="Логин"
          />
          <div className={styles.flex}>
            <span>Заблокирован:</span>
            <Toggle onChange={(value) => setIsActive(value)} />
          </div>
          <div className={styles.flex}>
            <span>Администратор:</span>
            <Toggle onChange={(value) => setIsAdmin(value)} />
          </div>
          <Input
            onChange={(e) => setPassword(e.currentTarget.value)}
            label="Пароль"
          />
          <div className={styles.btnGroup}>
            <Button onClick={() => setIsOpen(false)}>Закрыть</Button>
            <Button onClick={handleCreateUser}>Создать</Button>
          </div>
        </form>
      )}
    >
      <Button className={styles.btn}>Создать</Button>
    </Modal>
  );
};

export default CreateUserModal;
