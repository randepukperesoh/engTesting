import { FC } from "react";
import { useGetExamInfo } from "../../../shared/hooks/useGetExamInfo";
import { Button } from "../../../shared/ui/Button/Button";
import { Loader } from "../../../shared/ui/Loader/Loader";

import styles from "./TestingInstruction.module.scss";

const MockExamInfo = {
  id: 2,
  created_at: "2025-02-16T12:00:41.430633Z",
  updated_at: "2025-02-16T12:00:41.430633Z",
  title: "КИМ ЕГЭ",
  description: "КИМ ЕГЭ",
  img_url: null,
  is_open: true,
  is_delete: false,
  user_id: 2,
  instruction_text:
    "Задание 1 – чтение вслух небольшого текста научно-популярного\nхарактера. Время на подготовку – 1,5 минуты.<br><br>\n\nВ задании 2 предлагается ознакомиться с рекламным объявлением\nи задать четыре вопроса на основе ключевых слов. Время на подготовку –\n1,5 минуты.<br><br>\nВ задании 3 предлагается дать интервью на актуальную тему,\nразвёрнуто и точно ответив на пять вопросов.<br><br>\nВ задании 4 предлагается проблемная тема для проектной работы\nи 2 фотографии; нужно обосновать выбор фотографий в качестве\nиллюстраций и выразить своё мнение по проблеме проектной работы. Время\nна подготовку – 2,5 минуты.<br><br>\n<b>Общее время ответа одного экзаменуемого (включая время на\nподготовку) – 17 минут.</b><br><br>\nКаждое последующее задание выдаётся после окончания выполнения\nпредыдущего задания. Всё время ответа ведётся аудио- и видеозапись.\nПостарайтесь полностью выполнить поставленные задачи, старайтесь\nговорить ясно и чётко, не отходить от темы и следовать предложенному\nплану ответа. Так Вы сможете набрать наибольшее количество баллов. \n",
};

export const TestingInstruction: FC<{ handleStartTest: () => void }> = ({
  handleStartTest,
}) => {
  const { data: fExamInfo, isLoading } = useGetExamInfo();

  const examInfo = fExamInfo || MockExamInfo;

  const parts = examInfo.instruction_text.split(/<br\s*\/?>/);

  const filteredParts = parts.filter((part) => part.trim() !== "");

  return (
    <div className={styles.instruction}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h2>Инструкция</h2>
          <div>
            {filteredParts.map((el) => (
              <div>{el}</div>
            ))}
          </div>
          <div>
            <Button onClick={handleStartTest}>Начать экзамен</Button>
          </div>
        </>
      )}
    </div>
  );
};
