import { FC } from "react";
import {
  BlockType,
  useHandleCreateExamBlock,
} from "../../../shared/hooks/useHandleCreateExamBlock";
import { Button } from "../../../shared/ui/Button/Button";
import { Input } from "../../../shared/ui/Input/Input";
import { Modal } from "../../../shared/ui/Modal/Modal";
import Select from "../../../shared/ui/Select/Select";
import {
  OPTIONS_MOCK,
  reversetranslateTypes,
} from "../../../shared/consts/select";
import { useHandleUploadImage } from "../../../shared/hooks/useHandleUploadImage";

import styles from "./ModalCreateBlock.module.scss";

interface IModalCreateBlock {
  stepId: string;
  refetch: () => void;
}

export const ModalCreateBlock: FC<IModalCreateBlock> = ({
  stepId,
  refetch,
}) => {
  const { handleCreateExamBlock, setData, setType, type } =
    useHandleCreateExamBlock(stepId);

  const { handleUpload, isLoading } = useHandleUploadImage();
  return (
    <Modal
      rendreProp={(setIsOpen) => (
        <div className={styles.modal}>
          <h2>Создание блока</h2>
          {type !== "image" && (
            <Input
              onChange={(e) => setData(e.currentTarget.value)}
              label="Данные"
            />
          )}
          {type === "image" && (
            <input
              onChange={async (e) =>
                !isLoading && setData((await handleUpload(e)) || "")
              }
              type="file"
            />
          )}
          <Select
            onChange={(e) => setType(reversetranslateTypes[+e] as BlockType)}
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
