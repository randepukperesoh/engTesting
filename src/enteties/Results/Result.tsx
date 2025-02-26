import { FC } from "react";
import { Modal } from "../../shared/ui/Modal/Modal";
import { IReSultUser } from "../../pages/ResultsPage/ResultsPage";

import styles from "./Result.module.scss";

interface IResultsBlocks {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  step_id: number;
  is_rand: boolean;
  randcode: null | string;
  type: string;
  data: string;
  order_num: number;
  status: string;
}

export const Result: FC<IReSultUser> = ({
  exam_date,
  first_name,
  last_name,
}) => {
  return (
    <Modal
      rendreProp={() => (
        <div className={styles.modal}>
          <div className={styles.modal_wrapper}>
            {/* {MOCK.map((el) => {
              if (el.type === "title") return <h3>{el.data}</h3>;
              if (el.type === "text") return <div>{el.data}</div>;
              if (el.type === "image")
                return <img height={300} src={el.data} />;
              if (el.type === "bold") return <div>{el.data}</div>;
            })} */}
          </div>
        </div>
      )}
    >
      <div className={styles.content}>
        {last_name} {first_name} {exam_date}
      </div>
    </Modal>
  );
};
