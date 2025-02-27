import { useChangeUserForDevice } from "../../../shared/hooks/useChangeUserForDevice";
import { IUser, useSearchUser } from "../../../shared/hooks/useSearchUser";
import { Button } from "../../../shared/ui/Button/Button";
import { Input } from "../../../shared/ui/Input/Input";
import { Modal } from "../../../shared/ui/Modal/Modal";
import { SelectUser } from "../../../shared/ui/SelectUser/SelectUser";

import styles from "./ModalSelectUser.module.scss";

interface IUserItem extends IUser {
  deviceId: number;
}

const UserItem = ({
  first_name,
  last_name,
  other_name,
  login,
  id,
  deviceId,
}: IUserItem) => {
  const { handleChangeUserForDevice } = useChangeUserForDevice();
  return (
    <div
      onClick={() => handleChangeUserForDevice(String(id), String(deviceId))}
      className={styles.user}
    >
      <div className={styles.user_name}>
        {first_name} {last_name} {other_name}
      </div>
      <div>{login}</div>
    </div>
  );
};

export const ModalSelectUser = ({
  deviceId,
  name,
}: {
  deviceId: number;
  name: string;
}) => {
  const { data: searchedUser, setSearch } = useSearchUser();
  return (
    <Modal
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
        <div className={styles.selectedUser}>{name}</div>
      ) : (
        <SelectUser />
      )}
    </Modal>
  );
};
