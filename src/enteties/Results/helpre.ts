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
    combinedArray.push(...blocks.sort((a, b) => a.order_num - b.order_num));

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
