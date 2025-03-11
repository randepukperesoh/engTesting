import { useParams } from "react-router-dom";
import { useGetExamBlock } from "../../../shared/hooks/useGetExamBlock";
import { useHandleChangeRecordTime } from "../../../shared/hooks/useHandleChangeRecordTime";
import { useHandleChangeTrainingTime } from "../../../shared/hooks/useHandleChangeTrainingTime";
import { Button } from "../../../shared/ui/Button/Button";
import { Input } from "../../../shared/ui/Input/Input";
import { Loader } from "../../../shared/ui/Loader/Loader";
import { ModalCreateBlock } from "../ModalCreateBlock/ModalCreateBlock";
import { Modal } from "../../../shared/ui/Modal/Modal";
import { ModalRandList } from "../ModalRandList/ModalRandList";
import { OverwieRandValues } from "../OverwieRandValues/OverwieRandValues";
import { ModalAddRandValues } from "../ModalAddRandValues/ModalAddRandValues";
import { OPTION_MAP_MOCK } from "../../../shared/consts/select";

import styles from "./TaskItem.module.scss";

const EditTask = () => {
  const paramId = useParams().id;

  const stepId = paramId!;

  const { data, error, isLoading, refetch } = useGetExamBlock(stepId);

  const { handleChangeRecordTime } = useHandleChangeRecordTime(stepId);
  const { handleChangeTrainingTime } = useHandleChangeTrainingTime(stepId);

  return (
    <div className={styles.item_modal}>
      <h2>Редактирование задания</h2>
      <div className={styles.item_modal_filters}>
        <Input
          defaultValue="90"
          onChange={(e) => handleChangeTrainingTime(e.currentTarget.value)}
          label="Время подготовки"
        />
        <Input
          defaultValue="90"
          onChange={(e) => handleChangeRecordTime(e.currentTarget.value)}
          label="Время записи"
        />
      </div>

      {!isLoading && !error && (
        <div className={styles.item_modal_items}>
          {data?.map((el) => {
            return (
              <Modal
                key={"masdsa_" + el.id}
                rendreProp={(setIsOpen) =>
                  !el.is_rand ? (
                    <ModalAddRandValues
                      {...el}
                      setIsOpen={setIsOpen}
                      refetch={refetch}
                    />
                  ) : (
                    <OverwieRandValues listId={el.randcode + "" || "29"} />
                  )
                }
              >
                <div className={styles.item_modal_items_item}>
                  {OPTION_MAP_MOCK[el.type]}
                  {": "}
                  {el.data}
                </div>
              </Modal>
            );
          })}
        </div>
      )}
      {isLoading && !error && <Loader />}
      {error && <h2>Не удалось получить данные</h2>}
      <div className={styles.btnGroup}>
        <ModalCreateBlock refetch={refetch} stepId={stepId} />
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
    </div>
  );
};

export default EditTask;
