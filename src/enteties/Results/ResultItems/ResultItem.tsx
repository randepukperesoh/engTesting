import { FC, useState } from "react";
import { IBlock } from "../../../shared/hooks/useGetBlockByArray";
import { useGetDecoding } from "../../../shared/hooks/useGetDecoding";
import { IVoice } from "../../../shared/hooks/useGetExamData";
import { Accordion } from "../../../shared/ui/Accordion/Accordion";
import { Button } from "../../../shared/ui/Button/Button";
import { IDecoding } from "../helpre";
import { Loader } from "../../../shared/ui/Loader/Loader";

import styles from "./ResultItem.module.scss";

interface IResultItem {
  data: IVoice | IBlock | IDecoding;
}

const Decoding: FC<IDecoding> = ({ audioName }) => {
  const { data: decodingText, handleGetDecoding, isLoading } = useGetDecoding();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Accordion
      renderProp={() => (
        <>
          {isLoading && <Loader />}
          {!isLoading && (
            <>
              {decodingText?.recode_result ||
                `РасшифроватьРасшифроватьРасшифроватьРасшифровать
                РасшифроватьРасшифроватьРасшифроватьРасшифровать
                РасшифроватьРасшифроватьРасшифроватьРасшифроватьР
                асшифроватьРасшифроватьРасшифроватьРасшифроватьРасшиф
                роватьРасшифроватьРасшифроватьРасшифроватьРасшифроватьРас
                шифроватьРасшифроватьРасшифроватьРасшифроватьРасшифровать
                РасшифроватьРасшифроватьРасшифроватьРасшифроватьРасшифрова
                тьРасшифроватьРасшифроватьРасшифроватьРасшифроватьРасшифро
                ватьРасшифроватьРа
                сшифроватьРасшифроватьРасшифроватьРасшифроватьРасш
                ифроватьРасшифроватьРасшифроватьРасшифроватьРасшифрова
                тьРасшифроватьРасшифроватьРасшифроватьРасшифроватьРасшифр
                оватьРасшифроватьРасшифровать`}
            </>
          )}
        </>
      )}
    >
      <Button
        onClick={() => {
          setIsOpen((prev) => !prev);
          if (!isOpen) handleGetDecoding(audioName || "");
        }}
      >
        Расшифровать
      </Button>
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
        src={"/back/uploads/" + audioName}
        preload={"/back/uploads/" + audioName}
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
