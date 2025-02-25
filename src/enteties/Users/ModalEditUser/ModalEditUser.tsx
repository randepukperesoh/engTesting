import { FC } from "react";
import { Modal } from "../../../shared/ui/Modal/Modal";
import { RoleChips } from "../../../shared/ui/RoleChips/RoleChips";
import { Input } from "../../../shared/ui/Input/Input";
import { Checkbox } from "../../../shared/ui/Checkbox/Checkbox";
import { Button } from "../../../shared/ui/Button/Button";

import styles from "./ModalEditUser.module.scss";
import { Loader } from "../../../shared/ui/Loader/Loader";
import { IUser, useGetUser } from "../../../shared/hooks/useGetUser";
import { ModalChangePassword } from "../ModalChangePassword/ModalChangePassword";

interface IModalEditUser {
  name: string;
  role: string;
}

const MOCK: IUser = {
  id: 5,
  created_at: "2025-02-16T22:27:39.000000Z",
  updated_at: "2025-02-19T10:20:02.000000Z",
  first_name: "Мохамед",
  last_name: "Абделаал",
  other_name: "",
  login: "mabdelaal",
  last_enter_date: null,
  is_admin: "true",
  is_active: "true",
  img_url: "https://lk.donstu.ru/PhotoP/7728.jpeg",
};

const ModalEditUser: FC<IModalEditUser> = ({ name, role }) => {
  const {
    data: fData,
    //  error,
    isLoading,
  } = useGetUser();

  const data = fData || MOCK;

  return (
    <Modal
      rendreProp={() =>
        !isLoading ? (
          <div className={styles.modal}>
            <h2>Редактирование</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <Input defaultValue={data.last_name} label="Фамилия" />
              <Input defaultValue={data.first_name} label="Имя" />
              <Input defaultValue={data.other_name} label="Отчество" />
              <Input defaultValue={data.login} label="Логин" />
              <div className={styles.modal_chekboxes}>
                <Checkbox
                  initialValue={data.is_active !== "true"}
                  label="Заблокирован"
                />
                <Checkbox
                  initialValue={data.is_admin !== "true"}
                  label="Администратор"
                />
              </div>
              <div className={styles.modal_btnGroup}>
                <ModalChangePassword />
                <Button>Отправить</Button>
              </div>
            </form>
          </div>
        ) : (
          <Loader />
        )
      }
    >
      <div className={styles.item}>
        <div>{name}</div>
        <RoleChips role={role} />
      </div>
    </Modal>
  );
};

export default ModalEditUser;
