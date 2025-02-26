import { FC, HTMLAttributes, ReactNode } from "react";

import styles from "./Button.module.scss";

interface IButton extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button: FC<IButton> = ({ children, className, ...rest }) => {
  return (
    <button {...rest} className={`${styles.button} ${className}`}>
      {children?.toLocaleString().toLocaleUpperCase()}
    </button>
  );
};
