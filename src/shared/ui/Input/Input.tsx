import { FC, HTMLAttributes } from "react";

import styles from "./Input.module.scss";

interface IInput extends HTMLAttributes<HTMLInputElement> {
  label?: string;
  isColumn?: boolean;
}

export const Input: FC<IInput> = ({ label, isColumn, ...props }) => {
  return (
    <label
      style={{
        flexDirection: !isColumn ? "column" : "unset",
        alignItems: !isColumn ? "unset" : "center",
      }}
      className={styles.input_label}
    >
      {label && <span className={styles.input_label_span}>{label}:</span>}
      <input {...props} type="text" className={styles.input} />
    </label>
  );
};
