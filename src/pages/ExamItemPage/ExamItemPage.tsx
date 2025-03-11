import { useParams } from "react-router-dom";
import { useGetExamInfoConstr } from "../../shared/hooks/useGetExamInfoConstr";
import { useGetExamSteps } from "../../shared/hooks/useGetExamSteps";
import { useHandleToggleExamIsOpen } from "../../shared/hooks/useHandleToggleExamIsOpen";
import { ModalCreateTask } from "../../enteties/Knowledge/ModalAddTask/ModalCreateTask";
import { ModalEditExam } from "../../enteties/Knowledge/ModalEditExam/ModalEditExam";
import { ModalEditExamInstruction } from "../../enteties/Knowledge/ModalEditExamInstruction/ModalEditExamInstruction";
import { ModalDeleteExam } from "../../enteties/Knowledge/ModalDeleteExam/ModalDeleteExam";
import { Button } from "../../shared/ui/Button/Button";
import { TaskItem } from "../../enteties/Knowledge/TaskItem/EditTask";
import { Loader } from "../../shared/ui/Loader/Loader";

import styles from "./ExamItemPage.module.scss";

const ExamItemPage = () => {
  const { id } = useParams();
  const { data: ExamInfo, refetch } = useGetExamInfoConstr(String(id));

  const {
    data: ExamSteps,
    isLoading: isLoadingSteps,
    refetch: refetchExamsStep,
  } = useGetExamSteps(String(id));

  const { handleToggleExamIsOpen } = useHandleToggleExamIsOpen(String(id));

  return (
    <div className={styles.modal}>
      <div className={styles.modal_filters}>
        <h2>Экзамен: {ExamInfo?.title}</h2>
        <div className={styles.modal_filters_btnGroup}>
          <ModalCreateTask refetch={refetchExamsStep} examId={String(id)} />
          <ModalEditExam
            title={ExamInfo?.title || ""}
            description={ExamInfo?.description || ""}
            examId={String(id)}
          />
          <ModalEditExamInstruction
            instruction={ExamInfo?.instruction_text || ""}
            examId={String(id)}
          />

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
          ExamSteps?.map((el, i) => (
            <TaskItem
              idInExam={i}
              stepId={el.id + ""}
              stepIdNext={ExamSteps?.[i - 1]?.id}
              setIdPrev={ExamSteps?.[i + 1]?.id}
              isFirst={i === 0}
              isLast={i === ExamSteps.length - 1}
              title={el.description}
              callback={() => refetchExamsStep()}
            />
          ))}
        {isLoadingSteps && <Loader />}
      </div>
    </div>
  );
};

export default ExamItemPage;
