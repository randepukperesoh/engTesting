import { FC, HTMLAttributes } from "react";
import classNames from "classnames";

import styles from "./Input.module.scss";

interface IInput extends HTMLAttributes<HTMLInputElement> {
  label?: string;
  isColumn?: boolean;
  defaultValue?: string;
}

export const Input: FC<IInput> = ({
  label,
  isColumn = false, // По умолчанию isColumn = false
  defaultValue,
  ...props
}) => {
  return (
    <label
      className={classNames(styles.input_label, {
        [styles.input_label_column]: isColumn, // Добавляем класс для column
        [styles.input_label_fullWidth]: !isColumn, // По умолчанию полная ширина
      })}
    >
      {label && (
        <div
          className={classNames(styles.input_label_span, {
            [styles.input_label_span_column]: isColumn, // Добавляем класс для column
          })}
        >
          {`${label}:`}
        </div>
      )}
      <input
        {...props}
        type="text"
        defaultValue={defaultValue}
        className={styles.input}
      />
    </label>
  );
};
