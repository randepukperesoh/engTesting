import { FC } from "react";
import { Button } from "../../shared/ui/Button/Button";
import Select from "../../shared/ui/Select/Select";
import { DeviceItem } from "../../enteties/Exams/DeviceItem/DeviceItem";
import { useGetPlaceList } from "../../shared/hooks/useGetPlaceList";
import { useGetActualPingDevice } from "../../shared/hooks/useGetActualPingDevice";

import styles from "./ExamsPage.module.scss";

const ExamsPage: FC = () => {
  const { data: options } = useGetPlaceList();

  const { data: actualDevice, setPlaceId } = useGetActualPingDevice();

  return (
    <div className={styles.exams}>
      <div className={styles.exams_filters}>
        <h2 className={styles.exams_filters_head}>Проведение экзаменов</h2>
        <Button>Очитстить всё</Button>
        <span>Аудитрия проведения</span>
        <Select onChange={(value) => setPlaceId(+value)} options={options} />
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
