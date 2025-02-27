import { FC, useState } from "react";
import { Button } from "../../shared/ui/Button/Button";
import Select from "../../shared/ui/Select/Select";
import { DeviceItem } from "../../enteties/Exams/DeviceItem/DeviceItem";
import { useGetPlaceList } from "../../shared/hooks/useGetPlaceList";
import { useGetActualPingDevice } from "../../shared/hooks/useGetActualPingDevice";

import styles from "./ExamsPage.module.scss";

const name = "ТестоТехник";

const ExamsPage: FC = () => {
  const [placeId, setPlaceId] = useState(1);

  const { data: placeList } = useGetPlaceList();

  const { data: actualDevice } = useGetActualPingDevice(placeId);

  const options = placeList;

  return (
    <div className={styles.exams}>
      <div className={styles.exams_filters}>
        <h2>{name}-управление</h2>
        <Button>Очитстить всё</Button>
        <span>Аудитрия проведения</span>
        <Select
          onChange={(value) => setPlaceId(+value)}
          options={options}
          // defaultValue={options[0].value}
        />
      </div>
      <div className={styles.exams_items}>
        {actualDevice.map((el) => (
          <DeviceItem {...el} key={"device_" + el.id} />
        ))}
      </div>
    </div>
  );
};

export default ExamsPage;
