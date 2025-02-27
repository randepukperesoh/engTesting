import { FC, useState } from "react";
import { Input } from "../../shared/ui/Input/Input";
import CreateUserModal from "../../enteties/Users/CreateUserModal/CreateUserModal";
import { Checkbox } from "../../shared/ui/Checkbox/Checkbox";
import ModalEditUser from "../../enteties/Users/ModalEditUser/ModalEditUser";
import { Loader } from "../../shared/ui/Loader/Loader";
import { useGetList } from "../../shared/hooks/useGetList";
import { useFilterUser } from "../../shared/hooks/useFilterUser";

import styles from "./UsersPage.module.scss";

const UsersPage: FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data,
    isLoading,
    // error
  } = useGetList();

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
          filteredData?.map((el) => (
            <ModalEditUser
              key={"edit_" + el.id}
              id={el.id}
              name={el.last_name + " " + el.first_name}
              role={el.is_admin === "true" ? "Администратор" : "Пользователь"}
            />
          ))}
      </div>
    </div>
  );
};

export default UsersPage;
