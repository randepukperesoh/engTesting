import { useSearchUser } from "../../../shared/hooks/useSearchUser";
import { Button } from "../../../shared/ui/Button/Button";
import { Input } from "../../../shared/ui/Input/Input";
import { Modal } from "../../../shared/ui/Modal/Modal";
import { SelectUser } from "../../../shared/ui/SelectUser/SelectUser";
import { UserItem } from "./UserItem/UserItem";
import { ModalDeleteUser } from "../ModalDeleteUser/ModalDeleteUser";

import styles from "./ModalSelectUser.module.scss";

export const ModalSelectUser = ({
  deviceId,
  name,
  rand_code,
}: {
  deviceId: number;
  name: string;
  rand_code: string;
}) => {
  const { data: searchedUser, setSearch } = useSearchUser();

  return (
    <Modal
      style={{ width: "100%" }}
      rendreProp={(setIsOpen) => (
        <div className={styles.modal}>
          <h2 className={styles.modal_h2}>Выбор пользователя</h2>
          <Input
            onChange={(e) => setSearch(e.currentTarget.value)}
            label="Поиск пользователя"
          />
          <div className={styles.modal_users}>
            {searchedUser?.map((el, i) => (
              <UserItem
                handleHiden={setIsOpen}
                deviceId={deviceId}
                key={"user_" + el.id + "_" + i}
                {...el}
              />
            ))}
          </div>
          <Button onClick={() => setIsOpen(false)}>Закрыть</Button>
        </div>
      )}
    >
      {name ? (
        <ModalDeleteUser
          rand_code={rand_code}
          deviceId={deviceId}
          name={name}
        />
      ) : (
        <SelectUser />
      )}
    </Modal>
  );
};
