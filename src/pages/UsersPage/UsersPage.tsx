import { FC, useState } from "react";
import { Input } from "../../shared/ui/Input/Input";
import CreateUserModal from "../../enteties/Users/CreateUserModal/CreateUserModal";
import { Checkbox } from "../../shared/ui/Checkbox/Checkbox";
import ModalEditUser from "../../enteties/Users/ModalEditUser/ModalEditUser";
import { Loader } from "../../shared/ui/Loader/Loader";
import { useGetList } from "../../shared/hooks/useGetList";
import { useFilterUser } from "../../shared/hooks/useFilterUser";
import { useSearchInList } from "../../shared/hooks/useSearchInList";
import { Accordion } from "../../shared/ui/Accordion/Accordion";

import styles from "./UsersPage.module.scss";

const UsersPage: FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const { data, isLoading } = useGetList();

  const { filteredData } = useFilterUser(data, isAdmin);

  const { handleChangeSearchQuery, memoizedData } =
    useSearchInList(filteredData);

  return (
    <div className={styles.users}>
      <div className={styles.users_filters}>
        <h2>Пользователи</h2>
        <CreateUserModal />
        <Input
          onChange={(e) => handleChangeSearchQuery(e.currentTarget.value)}
          label="Поиск"
          isColumn
          aria-placeholder="По фамилии"
        />
        <Accordion
          style={{ padding: "0", width: "100%" }}
          renderProp={() => (
            <div style={{ padding: "0.5rem 0 0 0" }}>
              <Checkbox
                onChange={(value) => setIsAdmin(value)}
                initialValue={false}
                label="Только администраторы"
              />
            </div>
          )}
        >
          Параметры
        </Accordion>
      </div>
      <div className={styles.users_items}>
        {isLoading && <Loader />}
        {!isLoading &&
          memoizedData.map((el) => (
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
