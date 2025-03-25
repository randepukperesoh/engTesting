import { IBlock } from "../../shared/hooks/useGetBlockByArray";
import { IVoice } from "../../shared/hooks/useGetExamData";

export interface IDecoding {
  audioName?: string;
  type: string;
  id: number;
  step_id: number;
}

type At = IVoice | IBlock | IDecoding;

export const processAndSortData = (
  audioData: IVoice[],
  results: IBlock[],
  examIds: string[]
): At[] => {

  const filteredResults = examIds
    .map((el) => results.find((res) => res.id === Number(el)))
    .filter((el) => el);

  // Создаем карту для быстрого доступа к элементам IDecoding по id
  // const decodingMap = new Map<number, IDecoding>();
  // decodingData.forEach((decoding) => {
  //   decodingMap.set(decoding.id, decoding);
  // });

  // Объединяем IBlock и IDecoding в один массив
  const res: At[] = [];
  filteredResults.forEach((block) => {
    res.push(block!);
    // const decoding = decodingMap.get(block.id);
    // if (decoding) {
    //   res.push(decoding);
    // }
  });

  // Если нужно добавить IVoice элементы после IDecoding, можно сделать так:
  const finalRes: At[] = [];
  res.forEach((item) => {
    finalRes.push(item);
    if ('step_id' in item ) { //&& decodingMap.has(item.id)
      const voice = audioData.find((voice) => voice.id === item.id);
      if (voice) {
        finalRes.push(voice);
      }
    }
  });

  return finalRes;

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
