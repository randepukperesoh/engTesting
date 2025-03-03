import { FC, useState } from "react";
import { Modal } from "../../shared/ui/Modal/Modal";
import { IReSultUser } from "../../pages/ResultsPage/ResultsPage";
import { useGetBlockByArray } from "../../shared/hooks/useGetBlockByArray";
import { Loader } from "../../shared/ui/Loader/Loader";
import { useGetExamData } from "../../shared/hooks/useGetExamData";
import { processAndSortData } from "./helpre";

import styles from "./Result.module.scss";
import { ResultItem } from "./ResultItem";

export const Result: FC<IReSultUser> = ({
  exam_date,
  first_name,
  last_name,
  window_hash,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { examIds, audioData } = useGetExamData(window_hash, isOpenModal);
  console.log({ audioData });

  const { data: results, isLoading } = useGetBlockByArray(examIds, isOpenModal);

  const comparedArr = processAndSortData(audioData, results);

  console.log({ comparedArr });
  // 1,2,3,6,7,9,10,8,13,12,14,16,17,15,19,18
  // 1,2,3,6,7,9,10,8,13,12,14,16,17,15,19,18
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
