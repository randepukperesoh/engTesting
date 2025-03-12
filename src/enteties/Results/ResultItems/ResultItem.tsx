import { FC, useState } from "react";
import { IBlock } from "../../../shared/hooks/useGetBlockByArray";
import { useGetDecoding } from "../../../shared/hooks/useGetDecoding";
import { IVoice } from "../../../shared/hooks/useGetExamData";
import { Accordion } from "../../../shared/ui/Accordion/Accordion";
import { IDecoding } from "../helpre";
import { Loader } from "../../../shared/ui/Loader/Loader";

import styles from "./ResultItem.module.scss";

const api = import.meta.env.VITE_API_URL;

interface IResultItem {
  data: IVoice | IBlock | IDecoding;
}

const Decoding: FC<IDecoding> = ({ audioName }) => {
  const {
    data: decodingText,
    handleGetDecoding,
    isLoading,
    status,
  } = useGetDecoding();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Accordion
      renderProp={() => (
        <>
          {isLoading && <Loader />}
          {!isLoading && decodingText && decodingText}
          {!isLoading && status === "recognition" && "Идет расшифровка"}
          {!isLoading && status === "wait" && "Ожидание на распознование"}
          {!isLoading && status === "false" && "Ошибка распознования"}
        </>
        // ДОПОЛНИТЬ
      )}
    >
      <div
        className={styles.decoding}
        onClick={() => {
          setIsOpen((prev) => !prev);
          if (!isOpen) handleGetDecoding(audioName || "");
        }}
      >
        Расшифровать
      </div>
    </Accordion>
  );
};

const Audio: FC<IVoice> = ({ audioName, id }) => {
  return (
    <div className={styles.wraper}>
      <audio
        className={styles.wraper_audio}
        id={String(id)}
        controls
        src={api + "/uploads/" + audioName}
        preload={"/uploads/" + audioName}
      >
        Ваш браузер не поддерживает аудио элемент.
      </audio>
    </div>
  );
};

export const ResultItem: FC<IResultItem> = ({ data }) => {
  if (!data) return null;

  if (data.type === "decoding") return <Decoding {...(data as IDecoding)} />;

  if (data.type === "audio") return <Audio {...(data as IVoice)} />;

  if (data.type === "title") {
    const blockData = data as IBlock;
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
