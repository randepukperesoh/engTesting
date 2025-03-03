import { IBlock } from "../../shared/hooks/useGetBlockByArray";
import { IVoice } from "../../shared/hooks/useGetExamData";

export const processAndSortData = (audioData: IVoice[]| undefined, results: IBlock[]| null): (IVoice | IBlock)[] => {
  // Шаг 1: Создаем карту для группировки элементов из results по step_id
  const stepMap = new Map<number, IBlock[]>();

  // Заполняем карту элементами из results
  results?.forEach((block) => {
    if (!stepMap.has(block.step_id)) {
      stepMap.set(block.step_id, []);
    }
    stepMap.get(block.step_id)!.push(block);
  });

  // Шаг 2: Создаем карту для элементов из audioData по step_id
  const audioMap = new Map<number, IVoice>();
  audioData?.forEach((voice) => {
    audioMap.set(voice.step_id, voice);
  });

  console.log({audioMap, audioData})

  // Шаг 3: Сортируем step_id по возрастанию
  const sortedStepIds = Array.from(stepMap.keys());

  // Шаг 4: Объединяем группы в один массив
  const combinedArray: (IVoice | IBlock)[] = [];
  sortedStepIds.forEach((stepId) => {
    // Добавляем элементы из results с текущим step_id
    const blocks = stepMap.get(stepId)!;
    combinedArray.push(...blocks);

    // Добавляем элемент из audioData с текущим step_id, если он существует
    if (audioMap.has(stepId)) {
      combinedArray.push(audioMap.get(stepId)!);
    }
  });

  return combinedArray;
};
