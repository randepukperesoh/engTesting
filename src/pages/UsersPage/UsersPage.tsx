import { FC, useState } from "react";
import { Input } from "../../shared/ui/Input/Input";
import CreateUserModal from "../../enteties/Users/CreateUserModal/CreateUserModal";
import { Checkbox } from "../../shared/ui/Checkbox/Checkbox";
import ModalEditUser from "../../enteties/Users/ModalEditUser/ModalEditUser";
import { Loader } from "../../shared/ui/Loader/Loader";
import { IList, useGetList } from "../../shared/hooks/useGetList";
import { useFilterUser } from "../../shared/hooks/useFilterUser";

import styles from "./UsersPage.module.scss";

const MOCK: IList[] = [
  {
    id: 5,
    last_name: "Абделаал",
    first_name: "Мохамед",
    other_name: "",
    is_active: "true",
    is_admin: "true",
  },
  {
    id: 6,
    last_name: "Румянцев",
    first_name: "Артем",
    other_name: "Романович",
    is_active: "true",
    is_admin: "false",
  },
  {
    id: 3,
    last_name: "ТестФамилия",
    first_name: "ТестИмя",
    other_name: "ТестОтчество",
    is_active: "true",
    is_admin: "true",
  },
  {
    id: 2,
    last_name: "Эвердин",
    first_name: "Максим",
    other_name: "Юрьевич",
    is_active: "true",
    is_admin: "true",
  },
];

const UsersPage: FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: fData,
    isLoading,
    // error
  } = useGetList();

  const data = fData || MOCK;

  const { filteredData } = useFilterUser(data, isAdmin);

  return (
    <div className={styles.users}>
      <div className={styles.users_filters}>
        <CreateUserModal />
        <Input label="Поиск" aria-placeholder="По фамилии" />
        <h2 className={styles.h2}>Параметры:</h2>
        <div>
          <Checkbox
            onChange={(value) => setIsAdmin(value)}
            initialValue={false}
            label="Только администраторы"
          />
        </div>
      </div>
      <div className={styles.users_items}>
        {isLoading && <Loader />}
        {!isLoading &&
          // !error &&
          filteredData.map((el) => (
            <ModalEditUser
              key={"edit_" + el.id}
              name={el.last_name + " " + el.first_name}
              role={el.is_admin === "true" ? "Администратор" : "Пользователь"}
            />
          ))}
      </div>
    </div>
  );
};

export default UsersPage;
