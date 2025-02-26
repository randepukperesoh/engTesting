import { FC } from "react";
import { ModalSelectUser } from "../ModalSelectUser/ModalSelectUser";
import { ModalEditUserNumber } from "./ModalEditUserNumber/ModalEditUserNumber";
import { IPlace } from "../../../shared/hooks/useGetPlaceList";

import styles from "./DeviceItem.module.scss";

export const DeviceItem: FC<IPlace> = ({ alert, code, id, title }) => {
  return (
    <div className={styles.device}>
      <ModalEditUserNumber />
      <ModalSelectUser />
      <div className={styles.device_id}>
        Устройство: <span>{id}</span>
      </div>
    </div>
  );
};
