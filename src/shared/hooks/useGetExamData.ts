import { useEffect, useMemo, useState } from "react";

interface IExmaData {
  id: number;
  created_at: string;
  updated_at: string;
  exam_id: number;
  user_id: number;
  exam_code: string;
  type: string;
  ball: null;
  block_id: number;
  audio_name: string | null;
  window_hash: string;
  step_id: number;
}

export interface IVoice {
  id: number;
  type: "audio";
  audioName: string;
  step_id: number;
}

export const useGetExamData = (windowHash: string, isOpenModal: boolean) => {
  const [data, setData] = useState<IExmaData[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        setIsLoading(true);
        if (!isOpenModal) return null;
        const formData = new FormData();
        formData.append("hash", windowHash);
        const response = await fetch(
          "/back/main/admin/examcheaking/api/getExamData",
          {
            method: "POST",
            body: formData,
          }
        );
        const res: IExmaData[] = await response.json();

        setData(res);
      } catch (e) {
        setError("Не удалось получить результаты");
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlocks();
  }, [isOpenModal, windowHash]);

  const examIds = useMemo(() => {
    const idsSSS =
      data?.map((el) => el.block_id?.toString()) || ([] as string[]);
    const ids = idsSSS.filter((el) => !!el);
    return ids;
  }, [data]);

  const audioData = useMemo(() => {
    if(!data) return []
    return data.reduce((acc, el, i) => {
      if (el.type === "voice") {
        return [
          ...acc,
          { id: i, type: "audio",step_id: el.step_id, audioName: el.audio_name ?? "" } as IVoice,
        ];
      }
      return acc;
    }, [] as IVoice[]);
  }, [data]);

  return {
    examIds,
    data,
    isLoading,
    error,
    audioData,
  };
};
