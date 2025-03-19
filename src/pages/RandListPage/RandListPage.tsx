import { FC } from "react";
import { Loader } from "../../shared/ui/Loader/Loader";
import { ModalEditRandValue } from "../../enteties/Knowledge/ModalEditRandValue/ModalEditRandValue";
import { useGetExamRandList } from "../../shared/hooks/useGetExamRandList";
import { useHandleCreateExamRandList } from "../../shared/hooks/useHandleCreateExamRandList";
import { Modal } from "../../shared/ui/Modal/Modal";
import { Input } from "../../shared/ui/Input/Input";
import { Button } from "../../shared/ui/Button/Button";

import styles from "./RandListPage.module.scss";
import { PlusIcon } from "../../shared/ui/icons/PlusIcon";

const ModalRandList: FC = () => {
  const { data, isLoading, error, refetch } = useGetExamRandList();
  const { handleCreateExamRandList, setTitle } = useHandleCreateExamRandList();

  return (
    <div className={styles.wrapper}>
      <h2>Случайные значения</h2>
      <Modal
        rendreProp={(setIsOpen) => (
          <div className={styles.wrapper1}>
            <h2>Создание списка</h2>
            <Input onChange={(e) => setTitle(e.currentTarget.value)} />
            <Button
              style={{ width: "100%" }}
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
        <Button style={{ width: "100%" }}>
          <PlusIcon />
          Создать
        </Button>
      </Modal>
      {isLoading && !error && <Loader />}
      {!isLoading &&
        !error &&
        data?.map((el) => (
          <ModalEditRandValue
            key={"randValue_" + el.id + el.created_at}
            refetch={refetch}
            id={el.id + ""}
            title={el.title}
          />
        ))}
      {error && <div>Не удалось загрузить данные</div>}
    </div>
  );
};

export default ModalRandList;
