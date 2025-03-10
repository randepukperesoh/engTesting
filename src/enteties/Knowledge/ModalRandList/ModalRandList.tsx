import { FC } from "react";
import { useGetExamRandList } from "../../../shared/hooks/useGetExamRandList";
import { ModalEditRandValue } from "../ModalEditRandValue/ModalEditRandValue";
import { Button } from "../../../shared/ui/Button/Button";
import { Loader } from "../../../shared/ui/Loader/Loader";
import { Modal } from "../../../shared/ui/Modal/Modal";
import { useHandleCreateExamRandList } from "../../../shared/hooks/useHandleCreateExamRandList";
import { Input } from "../../../shared/ui/Input/Input";

import styles from "./ModalRandList.module.scss";

export const ModalRandList: FC = () => {
  const { data, isLoading, error, refetch } = useGetExamRandList();
  const { handleCreateExamRandList, setTitle } = useHandleCreateExamRandList();

  return (
    <div className={styles.wrapper}>
      <h2>Случайные значения</h2>
      {isLoading && !error && <Loader />}
      {!isLoading &&
        !error &&
        data?.map((el) => (
          <ModalEditRandValue
            refetch={refetch}
            id={el.id + ""}
            title={el.title}
          />
        ))}
      {error && <div>Не удалось загрузить данные</div>}
      <Modal
        rendreProp={(setIsOpen) => (
          <div className={styles.wrapper}>
            <h2>Создание списка</h2>
            <Input
              style={{ width: "95%" }}
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <Button
              onClick={() =>
                handleCreateExamRandList(() => {
                  setIsOpen(false);
                  refetch();
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
