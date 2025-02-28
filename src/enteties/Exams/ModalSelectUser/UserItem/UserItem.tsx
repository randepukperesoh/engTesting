import { FC } from "react";
import { useChangeUserForDevice } from "../../../../shared/hooks/useChangeUserForDevice";
import { IUser } from "../../../../shared/hooks/useSearchUser";

import styles from "./UserItem.module.scss";

interface IUserItem extends IUser {
  deviceId: number;
  handleHiden: (value: boolean) => void;
}

export const UserItem: FC<IUserItem> = ({
  first_name,
  last_name,
  other_name,
  login,
  id,
  deviceId,
  handleHiden,
}) => {
  const { handleChangeUserForDevice } = useChangeUserForDevice();

  return (
    <div
      onClick={() => {
        handleChangeUserForDevice(String(id), String(deviceId));
        handleHiden(false);
      }}
      className={styles.user}
    >
      <div className={styles.user_name}>
        {first_name} {last_name} {other_name}
      </div>
      <div>{login}</div>
    </div>
  );
};
