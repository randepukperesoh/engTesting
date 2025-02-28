import { FC, ReactNode, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./Modal.module.scss";

interface IModal {
  children: ReactNode;
  rendreProp: (setIsOpen: (value: boolean) => void) => ReactNode;
  style?: React.CSSProperties;
}

export const Modal: FC<IModal> = ({ children, rendreProp, style }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={style}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
      >
        {children}
      </div>
      {isOpen &&
        createPortal(
          <div onClick={() => setIsOpen(false)} className={styles.wrapper}>
            <div
              onClick={(e) => e.stopPropagation()}
              className={styles.content}
            >
              {rendreProp(setIsOpen)}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
