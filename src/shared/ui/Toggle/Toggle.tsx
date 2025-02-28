import { FC, useState } from "react";
import styles from "./Toggle.module.scss";

interface IToggleProps {
  onChange?: (value: boolean) => void;
  initialValue?: boolean;
}

export const Toggle: FC<IToggleProps> = ({
  onChange,
  initialValue = false,
}) => {
  const [isActive, setIsActive] = useState(initialValue);

  const handleToggle = () => {
    const newValue = !isActive;
    setIsActive(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div
      className={styles.toggle}
      onClick={handleToggle}
      role="switch"
      tabIndex={0}
    >
      <div className={`${styles.track} ${isActive && styles.activeTrack}`} />
      <div className={`${styles.thumb} ${isActive && styles.activeThumb}`} />
    </div>
  );
};
