import { FC } from "react";
import { useChangeUserForDevice } from "../../../../shared/hooks/useChangeUserForDevice";
import { IUser } from "../../../../shared/hooks/useSearchUser";
import { Modal } from "../../../../shared/ui/Modal/Modal";
import { useGetExamList } from "../../../../shared/hooks/useGetExamList";
import { Button } from "../../../../shared/ui/Button/Button";

import styles from "./UserItem.module.scss";
import { Input } from "../../../../shared/ui/Input/Input";
import classNames from "classnames";

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
  const { handleChangeUserForDevice, setExamId, setUserId, examId } =
    useChangeUserForDevice();

  const { data, setSearch } = useGetExamList();

  return (
    <Modal
      rendreProp={(setIsOpen) => (
        <div className={styles.wrapper}>
          <h2>Список экзаменов</h2>
          <Input onChange={(e) => setSearch(e.currentTarget.value)} />
          <div className={styles.exams}>
            {data?.map((exam) => (
              <div
                className={classNames(styles.exams_item, {
                  [styles.exams_item_selected]: exam.id === examId,
                })}
                onClick={() => setExamId(exam.id)}
              >
                {exam.title.toUpperCase()}
              </div>
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
      <div onClick={() => setUserId(id)} className={styles.user}>
        <div className={styles.user_name}>
          {first_name} {last_name} {other_name}
        </div>

        <div>{login}</div>
      </div>
    </Modal>
  );
};
