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
  audioData: IVoice[] | undefined,
  results: IBlock[] | null,
  examIds: string[]
): At[] => {
  // Создаем Map для быстрого доступа к аудио данным по step_id
  const audioMap = new Map<number, IVoice>();
  audioData?.forEach((audio) => audioMap.set(audio.step_id, audio));

  // Формируем массив a на основе examIds и results
  const initialArray = examIds
    .map((id) => results?.find((el) => el.id === +id))
    .filter(Boolean) as IBlock[];

  // Результирующий массив
  const resultArray: At[] = [];

  // Проходим по массиву initialArray
  let previousStepId = -1; // Инициализируем предыдущий step_id
  for (const block of initialArray) {
    // Добавляем текущий блок в результат
    resultArray.push(block);

    // Проверяем смену step_id
    if (block.step_id !== previousStepId) {
      // Если step_id сменился, добавляем аудио (если оно существует)
      if (audioMap.has(block.step_id)) {
        resultArray.push(audioMap.get(block.step_id)!);

        // После аудио добавляем decoding
        resultArray.push({
          id: audioMap.get(block.step_id)?.id || 0 + 2,
          audioName: audioMap.get(block.step_id)?.audioName || "",
          type: "decoding",
          step_id: block.step_id,
        } as IDecoding);
      }

      // Обновляем previousStepId
      previousStepId = block.step_id;
    }
  }



  console.log(resultArray)

  return resultArray;
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
