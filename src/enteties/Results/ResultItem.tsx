import { IBlock } from "../../shared/hooks/useGetBlockByArray";
import { IVoice } from "../../shared/hooks/useGetExamData";

interface IResultItem {
  data: IVoice | IBlock;
}

export const ResultItem = ({ data }: IResultItem) => {
  if (!data) return null;

  if (data.type === "audio") {
    const audioData = data as IVoice;
    return (
      <div style={{ borderBottom: "1px solid grey" }}>
        <audio
          id={String(data.id)}
          controls={true}
          src={"/back/uploads/" + audioData.audioName}
        >
          Ваш браузер не поддерживает аудио элемент.
        </audio>
      </div>
    );
  }

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
