import { FC } from "react";
import { ModalSelectUser } from "../ModalSelectUser/ModalSelectUser";
import { ModalEditUserNumber } from "../ModalEditUserNumber/ModalEditUserNumber";
import { IACtualDevice } from "../../../shared/hooks/useGetActualPingDevice";

import styles from "./DeviceItem.module.scss";

export const DeviceItem: FC<IACtualDevice> = ({
  id,
  fio,
  rand_code,
  last_ping_date,
}) => {
  return (
    <div className={styles.device}>
      <ModalEditUserNumber
        device_hash={rand_code}
        last_ping_date={last_ping_date}
        device_id={id}
      />
      <ModalSelectUser deviceId={id} rand_code={rand_code} name={fio} />
    </div>
  );
};
