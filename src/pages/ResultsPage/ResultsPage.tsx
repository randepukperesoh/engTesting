import { FC } from "react";
import { Input } from "../../shared/ui/Input/Input";
import { Result } from "../../enteties/Results/Result";

import styles from "./ResultsPage.module.scss";

export interface IReSultUser {
  user_id: number;
  last_name: string;
  first_name: string;
  other_name: string;
  login: string;
  window_hash: string;
  exam_date: string;
}

const MOCK: IReSultUser[] = [
  {
    user_id: 5,
    last_name: "Абделаал",
    first_name: "Мохамед",
    other_name: "",
    login: "mabdelaal",
    window_hash: "1c04541e-92ab-4bf5-b46a-b86d8116ea99",
    exam_date: "2025-02-21 16:09:46",
  },
  {
    user_id: 6,
    last_name: "Румянцев",
    first_name: "Артем",
    other_name: "Романович",
    login: "ezik",
    window_hash: "bc193432-fb3d-4d8f-b8a2-de8f929da8c5",
    exam_date: "2025-02-19 11:56:46",
  },
  {
    user_id: 6,
    last_name: "Румянцев",
    first_name: "Артем",
    other_name: "Романович",
    login: "ezik",
    window_hash: "70d6f99b-3889-4d8c-acbb-24985fb52cb2",
    exam_date: "2025-02-19 13:32:02",
  },
  {
    user_id: 6,
    last_name: "Румянцев",
    first_name: "Артем",
    other_name: "Романович",
    login: "ezik",
    window_hash: "85724bb7-6891-42c2-baf3-9ccd441db802",
    exam_date: "2025-02-19 13:44:27",
  },
];

const ResultsPage: FC = () => {
  return (
    <div className={styles.results}>
      <div className={styles.results_filters}>
        <h2 className={styles.results_filters_h2}>Результаты</h2>
        <Input label="Поиск" />
      </div>
      <div className={styles.results_items}>
        {MOCK.map((el, i) => (
          <Result key={"res_" + i} {...el} />
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;
