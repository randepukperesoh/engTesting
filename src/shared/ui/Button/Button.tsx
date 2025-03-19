import { Children, FC, HTMLAttributes, ReactNode } from "react";

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
      {Children.map(children, (child) => {
        if (typeof child === "string") {
          return child.toUpperCase(); // Преобразуем только текстовые строки
        }
        return child; // Оставляем React-компоненты без изменений
      })}
    </button>
  );
};
