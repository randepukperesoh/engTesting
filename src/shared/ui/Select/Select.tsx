import React, { useState } from "react";
import styles from "./Select.module.scss";

interface IOption {
  value: string | number;
  label: string;
}

interface ISelectProps {
  options: IOption[];
  onChange?: (value: string | number) => void;
  defaultValue?: string | number;
}

const Select: React.FC<ISelectProps> = ({
  options,
  onChange,
  defaultValue,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | number>(
    defaultValue || options[0]?.value
  );

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={styles.selectContainer}>
      <select
        value={selectedValue}
        onChange={handleSelectChange}
        className={styles.customSelect}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className={styles.selectArrow}>▼</span>
    </div>
  );
};

export default Select;
