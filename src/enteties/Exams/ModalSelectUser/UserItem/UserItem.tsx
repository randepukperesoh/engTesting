import { FC } from "react";
import { useChangeUserForDevice } from "../../../../shared/hooks/useChangeUserForDevice";
import { IUser } from "../../../../shared/hooks/useSearchUser";
import { Modal } from "../../../../shared/ui/Modal/Modal";
import { useGetExamList } from "../../../../shared/hooks/useGetExamList";
import { Button } from "../../../../shared/ui/Button/Button";

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
  // id,
  deviceId,
  handleHiden,
}) => {
  const { handleChangeUserForDevice, setExamId, setUserId } =
    useChangeUserForDevice();

  const { data } = useGetExamList();

  return (
    <Modal
      rendreProp={(setIsOpen) => (
        <div>
          <h2>Список экзаменов</h2>
          <div>
            {data?.map((exam) => (
              <Button onClick={() => setExamId(exam.id)}>{exam.title}</Button>
            ))}
          </div>

          <Button
            onClick={() => {
              handleChangeUserForDevice(deviceId + "");
              handleHiden(false);
              setIsOpen(false);
            }}
          >
            Сохранить
          </Button>
        </div>
      )}
    >
      <div onClick={() => setUserId(deviceId)} className={styles.user}>
        <div className={styles.user_name}>
          {first_name} {last_name} {other_name}
        </div>

        <div>{login}</div>
      </div>
    </Modal>
  );
};
