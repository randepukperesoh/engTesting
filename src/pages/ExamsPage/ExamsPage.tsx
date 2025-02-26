import { FC } from "react";
import { Button } from "../../shared/ui/Button/Button";
import Select from "../../shared/ui/Select/Select";
import { DeviceItem } from "../../enteties/Exams/DeviceItem/DeviceItem";

import styles from "./ExamsPage.module.scss";

const name = "ТестоТехник";
const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const ExamsPage: FC = () => {
  return (
    <div className={styles.exams}>
      <div className={styles.exams_filters}>
        <h2>{name}-управление</h2>
        <Button>Очитстить всё</Button>
        <span>Аудитрия проведения</span>
        <Select
          onChange={(value) => console.log(value)}
          options={options}
          defaultValue="option1"
        />
      </div>
      <div className={styles.exams_items}>
        <DeviceItem />
        <DeviceItem />
        <DeviceItem />
        <DeviceItem />
        <DeviceItem />
        <DeviceItem />
        <DeviceItem />
        <DeviceItem />
        <DeviceItem />
        <DeviceItem />
        <DeviceItem />
        <DeviceItem />
      </div>
    </div>
  );
};

export default ExamsPage;
