import { FC } from "react";
import { Modal } from "../../../shared/ui/Modal/Modal";
import { IExam } from "../../../shared/hooks/useGetExamList";
import { ModalContent } from "./ModalContent";

import styles from "./ExaminationItem.module.scss";

export const ExaminationItem: FC<IExam> = ({ description, title, id }) => {
  return (
    <Modal rendreProp={() => <ModalContent id={id} />}>
      <div className={styles.item}>
        <div className={styles.item_title}>{title}</div>
        <div className={styles.item_description}>{description}</div>
      </div>
    </Modal>
  );
};
