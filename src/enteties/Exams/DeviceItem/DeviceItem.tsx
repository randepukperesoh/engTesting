import { FC } from "react";

import styles from "./DeviceItem.module.scss";
import { ModalSelectUser } from "../ModalSelectUser/ModalSelectUser";
import { ModalEditUserNumber } from "./ModalEditUserNumber/ModalEditUserNumber";

export const DeviceItem: FC = () => {
  return (
    <div className={styles.device}>
      <ModalEditUserNumber />
      <ModalSelectUser />
      <div className={styles.device_id}>
        Устройство: <span>123123123-312312321312-132312312-fdgdfg112</span>
      </div>
    </div>
  );
};
