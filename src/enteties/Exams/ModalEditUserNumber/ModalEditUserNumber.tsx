import { FC, useEffect, useState } from "react";
import { Modal } from "../../../shared/ui/Modal/Modal";
import { Input } from "../../../shared/ui/Input/Input";
import { Button } from "../../../shared/ui/Button/Button";
import classNames from "classnames";
import { toast } from "react-toastify";

import styles from "./ModalEditUserNumber.module.scss";

const api = import.meta.env.VITE_API_URL;

const useHandleChabgeId = (device_hash: string) => {
  const [number, setNumber] = useState("");

  const handleChangeId = async () => {
    if (number.length > 2) {
      toast.error(
        "Длина пароля должна быть меньше трех и содержать только цифры"
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append("device_id", device_hash);
      formData.append("number", number);
      const response = await fetch(
        api + "/main/admin/techmanager/api/changeDeviceNumber",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) throw new Error();

      toast.success("Айди был изменен");
    } catch {
      toast.error("Не уадлост изменить пароль");
    }
  };

  return {
    handleChangeId,
    setNumber,
  };
};

type colorT = "red" | "green" | "orange";
interface IModalEditUserNumber {
  device_id: number;
  last_ping_date: string;
  device_hash: string;
}

export const ModalEditUserNumber: FC<IModalEditUserNumber> = ({
  device_id,
  device_hash,
  last_ping_date,
}) => {
  const [color, setColor] = useState<colorT>("green");

  const { handleChangeId, setNumber } = useHandleChabgeId(device_hash);

  useEffect(() => {
    const lastPingDate = new Date(last_ping_date).getTime();
    const nowDate = new Date().getTime();
    const delay = nowDate - lastPingDate;

    if (delay <= 5000) {
      setColor("green");
    } else if (5000 < delay && delay < 15000) {
      setColor("orange");
    } else {
      setColor("red");
    }
  }, [last_ping_date]);

  return (
    <Modal
      rendreProp={(setIsOpen) => (
        <div className={styles.modal}>
          <h2 className={styles.modal_h2}>Новый номер</h2>
          <Input
            className={styles.modal_input}
            onChange={(e) => setNumber(e.currentTarget.value)}
          />
          <div className={styles.modal_btnGroup}>
            <Button
              onClick={() => {
                handleChangeId();
                setIsOpen(false);
              }}
            >
              Подтвердить
            </Button>
            <Button onClick={() => setIsOpen(false)}>Закрыть</Button>
          </div>
        </div>
      )}
    >
      <div
        className={classNames(styles.user, {
          [styles.user_green]: color === "green",
          [styles.user_red]: color === "red",
          [styles.user_orange]: color === "orange",
        })}
      >
        <div>#{device_id}</div>
      </div>
    </Modal>
  );
};
