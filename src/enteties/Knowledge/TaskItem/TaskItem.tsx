import { FC } from "react";
import { Button } from "../../../shared/ui/Button/Button";
import Dropdown from "../../../shared/ui/DropDown/DropDown";

import styles from "./TaskItem.module.scss";

interface ITaskItem {
  title: string;
}

export const TaskItem: FC<ITaskItem> = ({ title }) => {
  return (
    <div className={styles.item}>
      <div>{title} </div>
      <Dropdown options={[" sdasda", "sadsadas"]}>
        <Button>...</Button>
      </Dropdown>
    </div>
  );
};
