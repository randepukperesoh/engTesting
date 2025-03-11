import { FC } from "react";
import { Modal } from "../../../shared/ui/Modal/Modal";
import { Input } from "../../../shared/ui/Input/Input";
import { Button } from "../../../shared/ui/Button/Button";
import { useGetExamRandGroupsList } from "../../../shared/hooks/useGetExamRandGroupsList";
import { useHandleUpdateExamRandList } from "../../../shared/hooks/useHandleUpdateExamRandList";
import { useHandleDeleteExamRandList } from "../../../shared/hooks/useHandleDeleteExamRandList";
import { TextArea } from "../../../shared/ui/TextArea/TextArea";
import Dropdown from "../../../shared/ui/DropDown/DropDown";
import { ModalContentBlocks } from "../ModalContentBlocks/ModalContentBlocks";
import { ModalCreate } from "../ModalCreate/ModalCreate";

import styles from "./ModalEditRandValue.module.scss";

interface IModalEditRandValue {
  title: string;
  id: string;
  refetch: () => void;
}

const ModalEdit = ({ id }: { id: string }) => {
  const { handleUpdateExamRandList, setText } = useHandleUpdateExamRandList();

  return (
    <Modal
      rendreProp={(setIsOpen) => (
        <div className={styles.content}>
          <h2>Название</h2>
          <TextArea
            // label="Название"
            defaultValue=""
            onChange={(e) => setText(e.currentTarget.value)}
          />
          <Button
            onClick={() => handleUpdateExamRandList(id, () => setIsOpen(false))}
          >
            Сохранить
          </Button>
        </div>
      )}
    >
      <Button>Изменить</Button>
    </Modal>
  );
};

const ModalContetEditBlocks = () => {
  return (
    <div className={styles.content}>
      <h2>Редактирование блоков</h2>
      <TextArea />
      <Button onClick={() => {}}>Сохранить</Button>
    </div>
  );
};

const ModalContent = ({
  title,
  id,
  refetchs,
  handleHideModal,
}: {
  id: string;
  title: string;
  refetchs: () => void;
  handleHideModal: () => void;
}) => {
  const { data, refetch, setSearch } = useGetExamRandGroupsList(id);

  const { handleDeleteExamRandList } = useHandleDeleteExamRandList();

  return (
    <div className={styles.content}>
      <h2>Случайное значение: {title}</h2>
      <div className={styles.content_filters}>
        <Input
          isColumn
          onChange={(e) => setSearch(e.currentTarget.value)}
          style={{ width: "100%" }}
          label="Поиск"
        />
        <div className={styles.content_filters_btns}>
          <ModalEdit id={id} />
          <ModalCreate refetchS={refetchs} refetch={refetch} id={id} />
          <Button
            onClick={() =>
              handleDeleteExamRandList(id, () => {
                handleHideModal();
                refetchs();
              })
            }
            styledButton="red"
          >
            Удалить
          </Button>
        </div>
      </div>
      <div className={styles.content_items}>
        {data?.length !== 0 &&
          data?.map((el) => (
            <div className={styles.content_items_item}>
              <Modal rendreProp={() => <ModalContentBlocks id={el.id + ""} />}>
                <div className={styles.content_items_item_text}>{el.title}</div>
              </Modal>
              <Dropdown
                options={[
                  <Modal rendreProp={() => <ModalContetEditBlocks />}>
                    <Button>Изменить название</Button>
                  </Modal>,
                ]}
              >
                <Button>...</Button>
              </Dropdown>
            </div>
          ))}
        {data?.length === 0 && <div>Ничего не найдено</div>}
      </div>
    </div>
  );
};

export const ModalEditRandValue: FC<IModalEditRandValue> = ({
  id,
  title,
  refetch,
}) => {
  return (
    <Modal
      rendreProp={(setIsOpen) => (
        <ModalContent
          handleHideModal={() => setIsOpen(false)}
          refetchs={refetch}
          id={id}
          title={title}
        />
      )}
    >
      <div className={styles.item}>{title}</div>
    </Modal>
  );
};
