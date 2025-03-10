import { useEffect, useMemo, useState } from "react";

interface IPlan {
    id: number;
    created_at: string;
    updated_at: string;
    exam_id: number;
    user_id: number;
    title: string;
    description: string;
    status: string;
    stage_num: number;
    training_time: number;
    recording_time: number;
    has_training: boolean;
  }
  export const useGetStepPlan = () => {
    const [data, setData] = useState<IPlan[] | null>(null);
  
    useEffect(() => {
      const fetchStepPlan = async () => {
        const response = await fetch("/back/main/examination/api/getStepPlan", {
          method: "Post",
          body: new FormData(),
        });
  
        const res = await response.json();
  
        setData(res);
      };
      fetchStepPlan();
    }, []);
  
    const stepsId = useMemo(() => {
      if (!data) return null;
      return data.map((el) => el.id).sort((a, b) => a - b);
    }, [data]);
  
    return { stepsId, data };
  };
  