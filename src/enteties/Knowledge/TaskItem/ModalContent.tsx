import { useParams } from "react-router-dom";
import { IBlock, useGetExamBlock } from "../../../shared/hooks/useGetExamBlock";
import { useHandleChangeRecordTime } from "../../../shared/hooks/useHandleChangeRecordTime";
import { useHandleChangeTrainingTime } from "../../../shared/hooks/useHandleChangeTrainingTime";
import { useHandleDeleteExamBlock } from "../../../shared/hooks/useHandleDeleteExamBlock";
import { useHandleEditBlock } from "../../../shared/hooks/useHandleEditBlock";
import { Button } from "../../../shared/ui/Button/Button";
import { Input } from "../../../shared/ui/Input/Input";
import { Loader } from "../../../shared/ui/Loader/Loader";
import { ModalCreateBlock } from "../ModalCreateBlock/ModalCreateBlock";
import { Modal } from "../../../shared/ui/Modal/Modal";
import { ModalRandList } from "../ModalRandList/ModalRandList";
import { TextArea } from "../../../shared/ui/TextArea/TextArea";
import Select from "../../../shared/ui/Select/Select";
import {
  OPTIONS_MOCK,
  OPTIONS_MOCK_DESC,
  translateTypes,
} from "../../../shared/consts/select";

import styles from "./TaskItem.module.scss";
import { Accordion } from "../../../shared/ui/Accordion/Accordion";
import { useGetExamRandList } from "../../../shared/hooks/useGetExamRandList";
import { useHandleEditExamBlockAddRandList } from "../../../shared/hooks/useHandleEditExamBlockAddRandList";
import { FC } from "react";

const OPTION_MAP_MOCK: Record<string, string> = {
  title: "Заголовок",
  text: "Текст",
  image: "Изображение",
  bold: "Выделеный текст",
};

interface IContent extends IBlock {
  refetch: () => void;
  setIsOpen: (value: boolean) => void;
}

const Content: FC<IContent> = ({ data, id, type, refetch, setIsOpen }) => {
  const { handleDeleteExamBlock } = useHandleDeleteExamBlock();

  const { handleEditBlock, setData, setType } = useHandleEditBlock();

  const { data: dataRandList } = useGetExamRandList();

  const { handleEditExamBlockAddRandList } =
    useHandleEditExamBlockAddRandList();

  return (
    <div className={styles.wrapper}>
      <h2>Редактирование</h2>
      <Select
        onChange={(e) => setType(OPTIONS_MOCK_DESC[+e])}
        options={OPTIONS_MOCK}
        defaultValue={translateTypes[type]}
      />
      <TextArea
        className={styles.item_modal_items_item_input}
        style={{ width: "100%" }}
        defaultValue={data}
        onChange={(e) => setData(e.currentTarget.value)}
      />
      <Accordion
        style={{ width: "100%" }}
        renderProp={() => (
          <div className={styles.item_modal_items_item_accordion}>
            {dataRandList?.map((listItem) => (
              <Button
                onClick={() =>
                  handleEditExamBlockAddRandList(
                    id + "",
                    listItem.id + "",
                    refetch
                  )
                }
                key={"rand_" + id}
              >
                {listItem.title}
              </Button>
            ))}
          </div>
        )}
      >
        Выбрать случайный вариант
      </Accordion>
      <Button onClick={() => handleEditBlock(id + "", data, type, refetch)}>
        Сохранить
      </Button>
      <Button
        onClick={() =>
          handleDeleteExamBlock(id + "", () => {
            refetch();
            setIsOpen(false);
          })
        }
        styledButton="red"
      >
        Удалить
      </Button>
    </div>
  );
};

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
                    <Content {...el} setIsOpen={setIsOpen} refetch={refetch} />
                  ) : (
                    <>Сделать здесь предпросмотр по getExamRandListOne</>
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
