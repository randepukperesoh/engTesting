import { FC, useState } from "react";
import { Modal } from "../../shared/ui/Modal/Modal";
import { IReSultUser } from "../../pages/ResultsPage/ResultsPage";
import {
  IBlock,
  useGetBlockByArray,
} from "../../shared/hooks/useGetBlockByArray";
import { Loader } from "../../shared/ui/Loader/Loader";
import { IVoice, useGetExamData } from "../../shared/hooks/useGetExamData";
import { formatDate, IDecoding, processAndSortData } from "./helpre";
import { ResultItem } from "./ResultItems/ResultItem";
import { Input } from "../../shared/ui/Input/Input";
import { useGetExamBall } from "../../shared/hooks/useGetExamBall";
import { useHandleEditExamBall } from "../../shared/hooks/useHandleEditExamBall";

import styles from "./Result.module.scss";

const ResultModalContent = ({
  comparedArr,
  isLoading,
  isOpenModal,
  window_hash,
}: {
  isLoading: boolean;
  comparedArr: (IVoice | IBlock | IDecoding)[];
  window_hash: string;
  isOpenModal: boolean;
}) => {
  const { handleUpdateExamRandItem } = useHandleEditExamBall(window_hash);

  const { data: ballData } = useGetExamBall(window_hash, isOpenModal);

  return (
    <div className={styles.modal}>
      <div className={styles.modal_wrapper}>
        <div>
          <Input
            defaultValue={ballData?.info?.ball}
            onChange={(e) => handleUpdateExamRandItem(e.currentTarget.value)}
            label="Оценка"
          />
          Последняя проверка: {formatDate(ballData?.info?.updated_at || "")}
        </div>
        {!isLoading &&
          comparedArr?.map((el, i) => (
            <ResultItem data={el} key={el.type + "_" + el.id + "_" + i} />
          ))}
        {isLoading && <Loader />}
      </div>
    </div>
  );
};
export const Result: FC<IReSultUser> = ({
  exam_date,
  first_name,
  last_name,
  window_hash,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { examIds, data } = useGetExamData(window_hash, isOpenModal);

  const { data: results, isLoading } = useGetBlockByArray(examIds, isOpenModal);

  const [date, time] = exam_date.split(" ");

  // export interface IDecoding {
  //   audioName?: string;
  //   type: string;
  //   id: number;
  //   step_id: number;
  // }

  const f = data
    ?.flatMap((el) => {
      if (el.type !== "voice") {
        return results?.filter((res) => res.id === el.block_id)[0];
      }

      return [
        {
          id: el.id,
          type: "audio",
          audioName: el.audio_name,
          step_id: el.step_id,
        },
        {
          id: el.id,
          type: "decoding",
          audioName: el.audio_name,
          step_id: el.step_id,
        },
      ];
    })
    .filter((el) => el !== undefined);

  return (
    <Modal
      rendreProp={() => (
        <ResultModalContent
          isOpenModal={isOpenModal}
          window_hash={window_hash}
          isLoading={isLoading}
          comparedArr={f || []}
        />
      )}
    >
      <div
        onClick={() => {
          setIsOpenModal(true);
        }}
        className={styles.content}
      >
        <div className={styles.content_item}>
          {last_name} {first_name}
        </div>

        <div className={styles.content_item}>{date}</div>
        <div className={styles.content_item}>{time}</div>
      </div>
    </Modal>
  );
};
