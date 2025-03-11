import { useGetExamRandListOne } from "../../../shared/hooks/useGetExamRandListOne";

import styles from "./OverwieRandValues.module.scss";

export const OverwieRandValues = ({ listId }: { listId: string }) => {
  const { data } = useGetExamRandListOne(listId);
  return (
    <div className={styles.wrapper}>
      <h2>Предпросмотр</h2>
      <div>{data?.title}</div>
    </div>
  );
};
