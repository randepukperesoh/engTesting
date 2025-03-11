import { FC } from "react";
import { useGetExamList } from "../../../shared/hooks/useGetExamList";
import { useSearchInExamList } from "../../../shared/hooks/useSearchInExamList";
import { Input } from "../../../shared/ui/Input/Input";
import { ModalCreateExam } from "../ModalCreateExam/ModalCreateExam";
import { ExaminationItem } from "../ExaminationItem/ExaminationItem";
import { Loader } from "../../../shared/ui/Loader/Loader";
import { Modal } from "../../../shared/ui/Modal/Modal";
import { ModalRandList } from "../ModalRandList/ModalRandList";
import { Button } from "../../../shared/ui/Button/Button";

import styles from "./CreateExam.module.scss";

const CreateExam: FC = () => {
  const { data: examList, error, isLoading, refetch } = useGetExamList();

  const { filteredData: filteredExamList, setSearchQuery } =
    useSearchInExamList(examList || []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_filters}>
        <Input
          label="Поиск"
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
        />
        <ModalCreateExam refetch={refetch} />

        <Modal
          rendreProp={() => (
            <div>
              <ModalRandList />
            </div>
          )}
        >
          <Button> Добавить случайные значения</Button>
        </Modal>
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
