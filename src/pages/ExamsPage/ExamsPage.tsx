import { FC } from "react";
import Select from "../../shared/ui/Select/Select";
import { DeviceItem } from "../../enteties/Exams/DeviceItem/DeviceItem";
import { useGetPlaceList } from "../../shared/hooks/useGetPlaceList";
import { useGetActualPingDevice } from "../../shared/hooks/useGetActualPingDevice";
import { ModalClearAll } from "../../enteties/Exams/ModalClearAll/ModalClearAll";

import styles from "./ExamsPage.module.scss";

const arr = [
  "1 аудитория - 123456",
  "2 аудитория - 245457",
  "3 аудитория - 425724",
  "4 аудитория - 245788",
  "5 аудитория - 463646",
  "6 аудитория - 468759",
  "7 аудитория - 123486",
  "8 аудитория - 608556",
  "9 аудитория - 256275",
  "10 аудитория - 247562",
];

const ExamsPage: FC = () => {
  const { data: options } = useGetPlaceList();

  const { data: actualDevice, setPlaceId, placeId } = useGetActualPingDevice();

  return (
    <div className={styles.exams}>
      <div className={styles.exams_filters}>
        <h2 className={styles.exams_filters_head}>Проведение экзаменов</h2>
        <ModalClearAll place_id={String(placeId)} />
        <span>Аудитрия проведения</span>
        <Select onChange={(value) => setPlaceId(+value)} options={options} />
        <div>
          <h2>Коды</h2>
          {arr.map((el) => (
            <div key={el}>{el}</div>
          ))}
        </div>
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
