import { FC } from "react";
import {
  BlockType,
  useHandleCreateExamBlock,
} from "../../../shared/hooks/useHandleCreateExamBlock";
import { Button } from "../../../shared/ui/Button/Button";
import { Input } from "../../../shared/ui/Input/Input";
import { Modal } from "../../../shared/ui/Modal/Modal";
import Select from "../../../shared/ui/Select/Select";
import { OPTIONS_MOCK, OPTIONS_MOCK_DESC } from "../../../shared/consts/select";

import styles from "./ModalCreateBlock.module.scss";

interface IModalCreateBlock {
  stepId: string;
  refetch: () => void;
}

export const ModalCreateBlock: FC<IModalCreateBlock> = ({
  stepId,
  refetch,
}) => {
  const { handleCreateExamBlock, setData, setType } =
    useHandleCreateExamBlock(stepId);
  return (
    <Modal
      rendreProp={(setIsOpen) => (
        <div className={styles.modal}>
          <h2>Создание блока</h2>
          <Input
            onChange={(e) => setData(e.currentTarget.value)}
            label="Данные"
          />
          <Select
            onChange={(e) => setType(OPTIONS_MOCK_DESC[+e] as BlockType)}
            options={OPTIONS_MOCK}
          />
          <Button
            onClick={() => {
              handleCreateExamBlock(() => {
                refetch();
                setIsOpen(false);
              });
            }}
          >
            Добавить блок
          </Button>
        </div>
      )}
    >
      <Button>Добавить блок</Button>
    </Modal>
  );
};
