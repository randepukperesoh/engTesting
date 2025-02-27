import { FC, useState } from "react";
import { Modal } from "../../shared/ui/Modal/Modal";
import { IReSultUser } from "../../pages/ResultsPage/ResultsPage";

import styles from "./Result.module.scss";
import {
  IBlock,
  useGetBlockByArray,
} from "../../shared/hooks/useGetBlockByArray";
import { Loader } from "../../shared/ui/Loader/Loader";
import { IVoice, useGetExamData } from "../../shared/hooks/useGetExamData";
import { processAndSortData } from "./helpre";

interface IResultItem {
  data: IVoice | IBlock;
}

const ResultItem = ({ data }: IResultItem) => {
  if (!data) return null;

  if (data.type === "audio") {
    const audioData = data as IVoice; // Явное приведение к IVoice
    console.log(audioData);
    return (
      <div>
        <audio
          id={String(data.id)}
          controls={true}
          src={"/back/uploads/" + audioData.audioName}
        >
          {/* <source
            
            // type="audio/wav"
          /> */}
          Ваш браузер не поддерживает аудио элемент.
        </audio>
      </div>
    );
  }

  if (data.type === "title") {
    const blockData = data as IBlock; // Явное приведение к IBlock
    return <h3>{blockData.data}</h3>;
  }

  if (data.type === "text") {
    const blockData = data as IBlock;
    return <div>{blockData.data}</div>;
  }

  if (data.type === "image") {
    const blockData = data as IBlock;
    return <img height={300} src={blockData.data} alt="Image" />;
  }

  if (data.type === "bold") {
    const blockData = data as IBlock;
    return <strong>{blockData.data}</strong>;
  }

  return null;
};

export const Result: FC<IReSultUser> = ({
  exam_date,
  first_name,
  last_name,
  window_hash,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { examIds, audioData } = useGetExamData(window_hash, isOpenModal);

  const {
    data: results,
    // error,
    isLoading,
  } = useGetBlockByArray(examIds, isOpenModal);

  const comparedArr = processAndSortData(audioData, results);

  console.log(comparedArr);

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
