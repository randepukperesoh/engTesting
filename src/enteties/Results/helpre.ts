import { IBlock } from "../../shared/hooks/useGetBlockByArray";
import { IVoice } from "../../shared/hooks/useGetExamData";

export interface IDecoding {
  audioName?: string;
  type: string;
  id: number;
}

export const processAndSortData = (
  audioData: IVoice[],
  results: IBlock[],
  examIds: string[]
) => {
  const arr = [...audioData, ...results];

  const res = examIds
    .map((id) => arr.find((el) => el.id === +id))
    .filter((el) => !!el);

  const resultWithDecodings: (IVoice | IBlock | IDecoding)[] = [];

  res.forEach((item) => {
    resultWithDecodings.push(item);
    if (item.type === "audio" && "audioName" in item) {
      const newDecoding: IDecoding = {
        type: "decoding",
        id: item.id + 100,
        audioName: item.audioName,
      };
      resultWithDecodings.push(newDecoding);
    }
  });

  console.log(resultWithDecodings.map((el) => el.id));
  return resultWithDecodings;
};

export const formatDate = (isoString: string) => {
  if (isoString.length === 0) return "Нет оценки";
  const date = new Date(isoString);

  // Извлекаем компоненты даты и времени
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяцы нумеруются с 0
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Формируем человеческую дату
  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
};

// Пример использования
const isoDate = "2025-03-12T13:03:06.000000Z";
console.log(formatDate(isoDate)); // Вывод: "12.03.2025 13:03:06"
