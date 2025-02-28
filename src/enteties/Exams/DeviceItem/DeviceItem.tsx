import { FC } from "react";
import { ModalSelectUser } from "../ModalSelectUser/ModalSelectUser";
import { ModalEditUserNumber } from "../ModalEditUserNumber/ModalEditUserNumber";

import styles from "./DeviceItem.module.scss";
import { IACtualDevice } from "../../../shared/hooks/useGetActualPingDevice";

export const DeviceItem: FC<IACtualDevice> = ({ id, fio, is_active }) => {
  return (
    <div className={styles.device}>
      <ModalEditUserNumber device_id={id} is_active={is_active} />
      <ModalSelectUser deviceId={id} name={fio} />

      {/* <div className={styles.device_id}>
        Устройство: <span>{id}</span>
      </div> */}
    </div>
  );
};
