import { FC } from "react";
import { useGetExamList } from "../../../shared/hooks/useGetExamList";
import { useSearchInExamList } from "../../../shared/hooks/useSearchInExamList";
import { Input } from "../../../shared/ui/Input/Input";
import { ModalCreateExam } from "../ModalCreateExam/ModalCreateExam";
import { ExaminationItem } from "../ExaminationItem/ExaminationItem";
import { Loader } from "../../../shared/ui/Loader/Loader";
// import { Button } from "../../../shared/ui/Button/Button";
// import { useNavigate } from "react-router-dom";

import styles from "./CreateExam.module.scss";

const CreateExam: FC = () => {
  const { data: examList, error, isLoading, refetch } = useGetExamList();

  const { filteredData: filteredExamList, setSearchQuery } =
    useSearchInExamList(examList || []);

  // const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_filters}>
        <div>
          <Input
            label="Поиск"
            style={{ width: "100%" }}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
          />
        </div>
        <div className={styles.wrapper_filters_btns}>
          <ModalCreateExam refetch={refetch} />

          {/* <Button onClick={() => navigate("./randList")}>
            Cлучайные значения
          </Button> */}
        </div>
      </div>
      <div className={styles.wrapper_items}>
        {!isLoading &&
          !error &&
          filteredExamList?.map((el) => (
            <ExaminationItem key={"exam_" + el.id} {...el} />
          ))}
        {isLoading && !error && <Loader />}
        {error && <div>{error}</div>}
      </div>
    </div>
  );
};

export default CreateExam;
