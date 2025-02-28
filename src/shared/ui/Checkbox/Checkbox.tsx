import { FC, useState } from "react";

import styles from "./Checkbox.module.scss";

interface ICheckboxProps {
  label?: string;
  onChange?: (value: boolean) => void;
  initialValue?: boolean;
}

export const Checkbox: FC<ICheckboxProps> = ({
  label,
  onChange,
  initialValue = false,
}) => {
  const [isChecked, setIsChecked] = useState(initialValue);

  const handleCheckboxChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <label className={styles.checkboxContainer}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className={styles.hiddenCheckbox}
      />
      <span
        className={`${styles.customCheckbox} ${isChecked && styles.checked}`}
      ></span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};
