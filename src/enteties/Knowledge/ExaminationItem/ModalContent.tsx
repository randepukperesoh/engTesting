import { useGetExamInfoConstr } from "../../../shared/hooks/useGetExamInfoConstr";
import { useGetExamSteps } from "../../../shared/hooks/useGetExamSteps";
import { useHandleToggleExamIsOpen } from "../../../shared/hooks/useHandleToggleExamIsOpen";
import { Button } from "../../../shared/ui/Button/Button";
import { Loader } from "../../../shared/ui/Loader/Loader";
import { ModalDeleteExam } from "../ModalDeleteExam/ModalDeleteExam";
import { ModalEditExam } from "../ModalEditExam/ModalEditExam";
import { ModalEditExamInstruction } from "../ModalEditExamInstruction/ModalEditExamInstruction";
import { TaskItem } from "../TaskItem/TaskItem";

import styles from "./ExaminationItem.module.scss";

export const ModalContent = ({ id }: { id: number }) => {
  const { data: ExamInfo, refetch } = useGetExamInfoConstr(String(id));
  const { data: ExamSteps, isLoading: isLoadingSteps } = useGetExamSteps(
    String(id)
  );
  const { handleToggleExamIsOpen } = useHandleToggleExamIsOpen(String(id));

  return (
    <div className={styles.modal}>
      <div className={styles.modal_filters}>
        <h2>Редактирование экзамена</h2>
        <div className={styles.modal_filters_btnGroup}>
          <Button>Создать задание</Button>
          <ModalEditExam examId={String(id)} />
          <ModalEditExamInstruction examId={String(id)} />

          <ModalDeleteExam examId={String(id)} />
          {!ExamInfo?.is_open && (
            <Button onClick={() => handleToggleExamIsOpen("true", refetch)}>
              Открыть
            </Button>
          )}
          {ExamInfo?.is_open && (
            <Button
              onClick={() => handleToggleExamIsOpen("false", refetch)}
              styledButton="red"
            >
              Закрыть
            </Button>
          )}
        </div>
      </div>
      <div className={styles.modal_items}>
        {!isLoadingSteps &&
          ExamSteps?.map((el) => <TaskItem title={el.description} />)}
        {isLoadingSteps && <Loader />}
      </div>
    </div>
  );
};
