import { FC } from "react";
import { Input } from "../../shared/ui/Input/Input";
import { ExaminationItem } from "../../enteties/Knowledge/ExaminationItem/ExaminationItem";
import { useGetExamList } from "../../shared/hooks/useGetExamList";

import styles from "./KnowledgePage.module.scss";
import { Loader } from "../../shared/ui/Loader/Loader";
import { ModalCreateExam } from "../../enteties/Knowledge/ModalCreateExam/ModalCreateExam";

const KnowledgePage: FC = () => {
  const { data: examList, error, isLoading, refetch } = useGetExamList();

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_filters}>
        <h2 className={styles.wrapper_filters_title}>Список все экзаменов </h2>
        <ModalCreateExam refetch={refetch} />
        <Input
          label="Поиск"
          // Добавить поиск
        />
      </div>
      <div className={styles.wrapper_items}>
        {!isLoading &&
          !error &&
          examList?.map((el) => (
            <ExaminationItem key={"exam_" + el.id} {...el} />
          ))}
        {isLoading && !error && <Loader />}
        {error && <div>{error}</div>}
      </div>
    </div>
  );
};

export default KnowledgePage;
