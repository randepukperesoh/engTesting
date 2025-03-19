import { IBlock } from "../../shared/hooks/useGetBlockByArray";
import { IVoice } from "../../shared/hooks/useGetExamData";

export interface IDecoding {
  audioName?: string;
  type: string;
  id: number;
}

export const processAndSortData = (
  audioData: IVoice[] | undefined,
  results: IBlock[] | null,
  examIds: string[]
) => {

  const idsMap = new Map()

  audioData?.map(el => idsMap.set(el.id,el))
  results?.map(el => idsMap.set(el.id, el))

  const res = examIds.map(el => {
    idsMap.get(+el)
  })

  return results;
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
