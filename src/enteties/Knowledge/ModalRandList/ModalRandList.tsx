import { FC } from "react";
import { useGetExamRandList } from "../../../shared/hooks/useGetExamRandList";
import { ModalEditRandValue } from "../ModalEditRandValue/ModalEditRandValue";
import { Button } from "../../../shared/ui/Button/Button";
import { Loader } from "../../../shared/ui/Loader/Loader";

import styles from "./ModalRandList.module.scss";

export const ModalRandList: FC = () => {
  const { data, isLoading, error, refetch } = useGetExamRandList();

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
      <Button>Создать</Button>
    </div>
  );
};
