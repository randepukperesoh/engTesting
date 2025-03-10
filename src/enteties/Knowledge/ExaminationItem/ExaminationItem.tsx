import { FC } from "react";
import { IExam } from "../../../shared/hooks/useGetExamList";
import { Link } from "react-router-dom";

import styles from "./ExaminationItem.module.scss";

export const ExaminationItem: FC<IExam> = ({ description, title, id }) => {
  return (
    <Link to={`/knowledge/${id}`}>
      <div className={styles.item}>
        <div className={styles.item_title}>{title}</div>
        <div className={styles.item_description}>{description}</div>
      </div>
    </Link>
  );
};
