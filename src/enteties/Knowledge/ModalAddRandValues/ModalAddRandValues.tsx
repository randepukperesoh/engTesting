import { FC } from "react";
import { IBlock } from "../../../shared/hooks/useGetExamBlock";
import { useHandleDeleteExamBlock } from "../../../shared/hooks/useHandleDeleteExamBlock";
import { useHandleEditBlock } from "../../../shared/hooks/useHandleEditBlock";
// import { useGetExamRandList } from "../../../shared/hooks/useGetExamRandList";
// import { useHandleEditExamBlockAddRandList } from "../../../shared/hooks/useHandleEditExamBlockAddRandList";
import Select from "../../../shared/ui/Select/Select";
import { TextArea } from "../../../shared/ui/TextArea/TextArea";
// import { Accordion } from "../../../shared/ui/Accordion/Accordion";
import { Button } from "../../../shared/ui/Button/Button";

import styles from "./ModalAddRandValues.module.scss";
import {
  OPTIONS_MOCK,
  OPTIONS_MOCK_DESC,
  translateTypes,
} from "../../../shared/consts/select";
import { DeleteIcon } from "../../../shared/ui/icons/DeleteIcon";
import { SaveIcon } from "../../../shared/ui/icons/SaveIcon";

interface IContent extends IBlock {
  refetch: () => void;
  setIsOpen: (value: boolean) => void;
}

export const ModalAddRandValues: FC<IContent> = ({
  data,
  id,
  type,
  // created_at,
  refetch,
  setIsOpen,
}) => {
  const { handleDeleteExamBlock } = useHandleDeleteExamBlock();

  const { handleEditBlock, setData, setType } = useHandleEditBlock();

  // const { data: dataRandList } = useGetExamRandList();

  // const { handleEditExamBlockAddRandList } =
  //   useHandleEditExamBlockAddRandList();

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
      {type === "image" && <img width={200} src={data} />}
      {/* <Accordion
        style={{ width: "100%" }}
        renderProp={() => (
          <div className={styles.item_modal_items_item_accordion}>
            {dataRandList?.map((listItem, i) => {
              return (
                <Button
                  onClick={() =>
                    handleEditExamBlockAddRandList(
                      listItem.id + "",
                      id + "",
                      refetch
                    )
                  }
                  key={"rand_" + id + i + created_at}
                >
                  {listItem.title}
                </Button>
              );
            })}
          </div>
        )}
      >
        Выбрать случайный вариант
      </Accordion> */}
      <Button onClick={() => handleEditBlock(id + "", data, type, refetch)}>
        <SaveIcon />
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
        <DeleteIcon />
        Удалить
      </Button>
    </div>
  );
};
