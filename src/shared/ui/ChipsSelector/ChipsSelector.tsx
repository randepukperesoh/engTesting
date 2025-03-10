import { useState, FC, ReactNode } from "react";
import classNames from "classnames";

import styles from "./ChipsSelector.module.scss";

interface IChips {
  childrens: ReactNode[]; // Массив дочерних элементов
  labels: string[]; // Массив меток для чипсов
}

export const ChipsSelector: FC<IChips> = ({ childrens, labels }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  if (childrens.length !== labels.length) {
    console.error(
      "Количество children должно быть равно количеству labels в компоненте Chips"
    );
    // return null;
  }

  return (
    <div className={styles.chips_container}>
      <div className={styles.chips_list}>
        {labels.map((label, index) => (
          <button
            key={label}
            className={classNames(styles.chip, {
              [styles.active]: index === activeIndex,
            })}
            onClick={() => setActiveIndex(index)}
          >
            {label.toUpperCase()}
          </button>
        ))}
      </div>

      <div className={styles.content}>{childrens[activeIndex]}</div>
    </div>
  );
};
