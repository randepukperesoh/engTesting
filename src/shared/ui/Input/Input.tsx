import { FC, HTMLAttributes } from "react";

import styles from "./Input.module.scss";
import classNames from "classnames";

interface IInput extends HTMLAttributes<HTMLInputElement> {
  label?: string;
  isFullWidth?: boolean;
  isColumn?: boolean;
  defaultValue?: string;
}

export const Input: FC<IInput> = ({
  label,
  isColumn,
  // isFullWidth,
  defaultValue,
  ...props
}) => {
  return (
    <label
      className={classNames(styles.input_label, {
        [styles.input_label_row]: isColumn,
      })}
    >
      {label && (
        <span
          className={classNames(styles.input_label_span, {
            [styles.input_label_span_row]: isColumn,
          })}
        >
          {label}:
        </span>
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
