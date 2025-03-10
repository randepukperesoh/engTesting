import { CSSProperties, FC, ReactNode, useState } from "react";

import styles from "./Accordion.module.scss";

interface IAccordion {
  children: ReactNode;
  renderProp: (setIsOpen: (value: boolean) => void) => ReactNode;
  style?: CSSProperties;
}

export const Accordion: FC<IAccordion> = ({ children, renderProp, style }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={style} className={styles.accardion}>
      <div
        className={styles.accardion_summary}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {children}
      </div>
      {isOpen && (
        <div className={styles.accardion_details}>{renderProp(setIsOpen)}</div>
      )}
    </div>
  );
};
