import { FC } from "react";
import {
  OPTION_MAP_MOCK,
  OPTIONS_MOCK,
  OPTIONS_MOCK_DESC,
  translateTypes,
} from "../../../shared/consts/select";
import {
  IBlock,
  useGetExamRandItems,
} from "../../../shared/hooks/useGetExamRandItems";
import { useHandleCreateExamRandItem } from "../../../shared/hooks/useHandleCreateExamRandItem";
import { useHandleDeleteExamRandItem } from "../../../shared/hooks/useHandleDeleteExamRandItem";
import { useHandleUpdateExamRandItem } from "../../../shared/hooks/useHandleUpdateExamRandItem";
import { Button } from "../../../shared/ui/Button/Button";
import { Modal } from "../../../shared/ui/Modal/Modal";
import Select from "../../../shared/ui/Select/Select";
import { TextArea } from "../../../shared/ui/TextArea/TextArea";

import styles from "./ModalContentBlocks.module.scss";

interface IModalEditBlock extends IBlock {
  refetch: () => void;
  setIsOpen: (value: boolean) => void;
}

export const ModalEditBlock: FC<IModalEditBlock> = ({
  data,
  type,
  id,
  refetch,
  setIsOpen,
}) => {
  const {
    handleUpdateExamRandItem,
    setData: setDataUpdate,
    setType: setTypeUpdate,
  } = useHandleUpdateExamRandItem();

  const { handleDeleteExamRandItem } = useHandleDeleteExamRandItem();

  return (
    <div className={styles.wrapper}>
      <h2>Редактирование</h2>
      <Select
        onChange={(e) => setTypeUpdate(OPTIONS_MOCK_DESC[+e])}
        options={OPTIONS_MOCK}
        defaultValue={translateTypes[type]}
      />
      <TextArea
        defaultValue={data}
        onChange={(e) => setDataUpdate(e.currentTarget.value)}
      />
      <Button
        onClick={() => {
          handleUpdateExamRandItem(id + "", data, type, () => {
            refetch();
            setIsOpen(false);
          });
        }}
      >
        Сохранить
      </Button>
      <Button
        onClick={() => handleDeleteExamRandItem(id + "")}
        styledButton="red"
      >
        Удалить
      </Button>
    </div>
  );
};

export const ModalContentBlocks = ({ id }: { id: string }) => {
  const { data, refetch } = useGetExamRandItems(id);

  const {
    handleCreateExamRandGroup,
    setData: setDataCreate,
    setType: setTypeCreate,
  } = useHandleCreateExamRandItem();

  return (
    <div className={styles.wrapper}>
      <h2>Блоки</h2>

      <div className={styles.wrapper}>
        {data?.map((el) => (
          <Modal
            rendreProp={(setIsOpen) => (
              <ModalEditBlock {...el} refetch={refetch} setIsOpen={setIsOpen} />
            )}
          >
            <div className={styles.item}>
              {OPTION_MAP_MOCK[el.type]}: {el.data}
            </div>
          </Modal>
        ))}
      </div>
      <Modal
        rendreProp={(setIsOpen) => (
          <div className={styles.wrapper}>
            <h2>Создание</h2>
            <Select
              onChange={(e) => setTypeCreate(OPTIONS_MOCK_DESC[+e])}
              options={OPTIONS_MOCK}
            />
            <TextArea onChange={(e) => setDataCreate(e.currentTarget.value)} />
            <Button
              onClick={() =>
                handleCreateExamRandGroup(id, () => {
                  refetch();
                  setIsOpen(false);
                })
              }
            >
              Создать
            </Button>
          </div>
        )}
      >
        <Button style={{ width: "100%" }}>Создать</Button>
      </Modal>
    </div>
  );
};
