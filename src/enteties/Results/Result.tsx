import { FC, useState } from "react";
import { Modal } from "../../shared/ui/Modal/Modal";
import { IReSultUser } from "../../pages/ResultsPage/ResultsPage";
import { useGetBlockByArray } from "../../shared/hooks/useGetBlockByArray";
import { Loader } from "../../shared/ui/Loader/Loader";
import { useGetExamData } from "../../shared/hooks/useGetExamData";
import { processAndSortData } from "./helpre";
import { ResultItem } from "./ResultItems/ResultItem";

import styles from "./Result.module.scss";

export const Result: FC<IReSultUser> = ({
  exam_date,
  first_name,
  last_name,
  window_hash,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { examIds, audioData } = useGetExamData(window_hash, isOpenModal);

  const { data: results, isLoading } = useGetBlockByArray(examIds, isOpenModal);

  const comparedArr = processAndSortData(audioData, results);

  return (
    <Modal
      rendreProp={() => (
        <div className={styles.modal}>
          <div className={styles.modal_wrapper}>
            {!isLoading &&
              comparedArr?.map((el, i) => (
                <ResultItem data={el} key={el.type + "_" + el.id + "_" + i} />
              ))}
            {isLoading && <Loader />}
          </div>
        </div>
      )}
    >
      <div
        onClick={() => {
          setIsOpenModal(true);
        }}
        className={styles.content}
      >
        {last_name} {first_name} {exam_date}
      </div>
    </Modal>
  );
};
