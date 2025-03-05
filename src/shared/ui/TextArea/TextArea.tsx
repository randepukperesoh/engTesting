import { forwardRef, TextareaHTMLAttributes } from "react";

import styles from "./TextArea.module.scss";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error, className, ...props }, ref) => {
    const combinedClassName = `${styles.textarea} ${className || ""} ${
      error ? styles.error : ""
    }`.trim();

    return <textarea className={combinedClassName} ref={ref} {...props} />;
  }
);
