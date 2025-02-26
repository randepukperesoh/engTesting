import { FC, useState } from "react";
import { Button } from "../../shared/ui/Button/Button";
import Select from "../../shared/ui/Select/Select";
import { DeviceItem } from "../../enteties/Exams/DeviceItem/DeviceItem";
import { IPlace, useGetPlaceList } from "../../shared/hooks/useGetPlaceList";
import { useGetActualPingDevice } from "../../shared/hooks/useGetActualPingDevice";

import styles from "./ExamsPage.module.scss";

const name = "ТестоТехник";
const optionsMock = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const MOCK: IPlace[] = [
  {
    id: 1,
    created_at: "2025-02-17T19:21:24.372571Z",
    title: "1 аудитория",
    code: "123456",
    alert: null,
  },
  {
    id: 2,
    created_at: "2025-02-17T19:21:24.372571Z",
    title: "2 аудитория",
    code: "245457",
    alert: null,
  },
  {
    id: 3,
    created_at: "2025-02-17T19:21:24.372571Z",
    title: "3 аудитория",
    code: "425724",
    alert: null,
  },
  {
    id: 4,
    created_at: "2025-02-17T19:21:24.372571Z",
    title: "4 аудитория",
    code: "245788",
    alert: null,
  },
  {
    id: 5,
    created_at: "2025-02-17T19:21:24.372571Z",
    title: "5 аудитория",
    code: "463646",
    alert: null,
  },
  {
    id: 6,
    created_at: "2025-02-17T19:21:24.372571Z",
    title: "6 аудитория",
    code: "468759",
    alert: null,
  },
  {
    id: 7,
    created_at: "2025-02-17T19:21:24.372571Z",
    title: "7 аудитория",
    code: "123486",
    alert: null,
  },
  {
    id: 8,
    created_at: "2025-02-17T19:21:24.372571Z",
    title: "8 аудитория",
    code: "608556",
    alert: null,
  },
  {
    id: 9,
    created_at: "2025-02-17T19:21:24.372571Z",
    title: "9 аудитория",
    code: "256275",
    alert: null,
  },
  {
    id: 10,
    created_at: "2025-02-17T19:21:24.372571Z",
    title: "10 аудитория",
    code: "247562",
    alert: null,
  },
];

const ExamsPage: FC = () => {
  const [placeId, setPlaceId] = useState(1);

  const { data: placeList } = useGetPlaceList();

  const { data: fActualDevice } = useGetActualPingDevice(placeId);

  const actualDevice = fActualDevice || MOCK;

  const options = placeList || optionsMock;

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
        <DeviceItem {...actualDevice[0]} />
      </div>
    </div>
  );
};

export default ExamsPage;
