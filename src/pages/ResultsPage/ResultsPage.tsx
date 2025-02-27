import { FC } from "react";
import { Input } from "../../shared/ui/Input/Input";
import { Result } from "../../enteties/Results/Result";
import { useGetResults } from "../../shared/hooks/useGetResults";
import { useSearchInIReSult } from "../../shared/hooks/useSearchInIReSult";

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

const ResultsPage: FC = () => {
  const { data: results } = useGetResults();

  const { handleChangeSearchQuery, memoizedData } = useSearchInIReSult(
    results || []
  );

  return (
    <div className={styles.results}>
      <div className={styles.results_filters}>
        <h2 className={styles.results_filters_h2}>Результаты</h2>
        <Input
          onChange={(e) => handleChangeSearchQuery(e.currentTarget.value)}
          label="Поиск"
        />
      </div>
      <div className={styles.results_items}>
        {memoizedData.map((el, i) => (
          <Result key={"res_" + i} {...el} />
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;
