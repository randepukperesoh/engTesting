import { IBlock } from "../../shared/hooks/useGetBlockByArray";
import { IVoice } from "../../shared/hooks/useGetExamData";

// Функция сортировки
function sortArrayWithAudioAfterType(data: (IVoice | IBlock)[]): (IVoice | IBlock)[] {
    // Шаг 1: Создаем маппинг для элементов с type != "audio"
    const nonAudioMap = new Map<number, IBlock>();
    const audioItems: IVoice[] = [];
  
    data.forEach(item => {
      if (item.type !== "audio") {
        nonAudioMap.set(item.id, item as IBlock);
      } else {
        audioItems.push(item as IVoice);
      }
    });
  
    // Шаг 2: Создаем отсортированный массив
    const sortedArray: (IVoice | IBlock)[] = [];
  
    // Добавляем элементы с type != "audio" и их парные элементы с type == "audio"
    data.forEach(item => {
      if (item.type !== "audio") {
        sortedArray.push(item); // Добавляем элемент с type != "audio"
        const matchingAudio = audioItems.find(audio => audio.id === item.id);
        if (matchingAudio) {
          sortedArray.push(matchingAudio); // Добавляем парный элемент с type == "audio"
        }
      }
    });
  
    // Шаг 3: Добавляем оставшиеся элементы с type == "audio", у которых нет парных элементов
    audioItems.forEach(audio => {
      if (!nonAudioMap.has(audio.id)) {
        sortedArray.push(audio);
      }
    });
  
    return sortedArray;
  }
  
  // Ваш код с интеграцией
  export const processAndSortData = (audioData: IVoice[] | undefined, results: IBlock[] | null): (IVoice | IBlock)[] => {
    let example: (IVoice | IBlock)[] = [];
  
    // Проверяем, что оба массива существуют
    if (audioData && results) {
      example = [...(audioData || []), ...(results || [])]; // Объединяем массивы
    } else if (audioData) {
      example = [...audioData]; // Если только audioData существует
    } else if (results) {
      example = [...results]; // Если только results существует
    }
  
    // Сортируем объединенный массив
    const sortedData = sortArrayWithAudioAfterType(example);
  
    return sortedData;
  };
