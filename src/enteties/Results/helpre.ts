import { IBlock } from "../../shared/hooks/useGetBlockByArray";
import { IVoice } from "../../shared/hooks/useGetExamData";

const sortArrayWithAudioAfterType = (data: (IVoice | IBlock)[]): (IVoice | IBlock)[] =>{
    const nonAudioMap = new Map<number, IBlock>();
    const audioItems: IVoice[] = [];
  
    data.forEach(item => {
      if (item.type !== "audio") {
        nonAudioMap.set(item.id, item as IBlock);
      } else {
        audioItems.push(item as IVoice);
      }
    });
  
    const sortedArray: (IVoice | IBlock)[] = [];
  
    data.forEach(item => {
      if (item.type !== "audio") {
        sortedArray.push(item);
        const matchingAudio = audioItems.find(audio => audio.id === item.id);
        if (matchingAudio) {
          sortedArray.push(matchingAudio); 
        }
      }
    });
  
    audioItems.forEach(audio => {
      if (!nonAudioMap.has(audio.id)) {
        sortedArray.push(audio);
      }
    });
  
    return sortedArray;
  }
  
  
  export const processAndSortData = (audioData: IVoice[] | undefined, results: IBlock[] | null): (IVoice | IBlock)[] => {
    let example: (IVoice | IBlock)[] = [];
  
    if (audioData && results) {
      example = [...(audioData || []), ...(results || [])]; 
    } else if (audioData) {
      example = [...audioData]; 
    } else if (results) {
      example = [...results]; 
    }
  
    const sortedData = sortArrayWithAudioAfterType(example);
  
    return sortedData;
  };
