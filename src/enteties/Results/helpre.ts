import { IBlock } from "../../shared/hooks/useGetBlockByArray";
import { IVoice } from "../../shared/hooks/useGetExamData";

export interface IDecoding {
  audioName?: string;
  type: string;
  id: number;
}

export const processAndSortData = (
  audioData: IVoice[] | undefined,
  results: IBlock[] | null
) => {
  const stepMap = new Map<number, IBlock[]>();

  results?.forEach((block) => {
    if (!stepMap.has(block.step_id)) {
      stepMap.set(block.step_id, []);
    }
    stepMap.get(block.step_id)!.push(block);
  });

  const audioMap = new Map<number, IVoice>();
  audioData?.forEach((voice) => {
    audioMap.set(voice.step_id, voice);
  });

  const sortedStepIds = Array.from(stepMap.keys());

  const combinedArray: (IVoice | IBlock | IDecoding)[] = [];
  sortedStepIds.forEach((stepId) => {
    const blocks = stepMap.get(stepId)!;
    combinedArray.push(...blocks.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()));

    const is = audioMap.has(stepId);
    if (is) {
      combinedArray.push(audioMap.get(stepId)!);
      combinedArray.push({
        audioName: audioMap.get(stepId)!.audioName || "",
        type: "decoding",
        id: audioMap.get(stepId)!.id,
      } as IDecoding);
    }
  });

  return combinedArray;
};


export const formatDate = (isoString: string) => {
  const date = new Date(isoString);

  // Извлекаем компоненты даты и времени
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы нумеруются с 0
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Формируем человеческую дату
  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

// Пример использования
const isoDate = "2025-03-12T13:03:06.000000Z";
console.log(formatDate(isoDate)); // Вывод: "12.03.2025 13:03:06"