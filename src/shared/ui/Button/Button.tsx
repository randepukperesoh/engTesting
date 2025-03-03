import { FC, HTMLAttributes, ReactNode } from "react";

import styles from "./Button.module.scss";

type styleButton = "blue" | "red";
interface IButton extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  styledButton?: styleButton;
}

export const Button: FC<IButton> = ({
  children,
  className,
  styledButton = "blue",
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={`${styles.button} ${className} ${
        styledButton === "red" && styles.button_red
      }`}
    >
      {children?.toLocaleString().toLocaleUpperCase()}
    </button>
  );
};
