import { FC, ReactNode, useState } from "react";

import styles from "./Dropdown.module.scss";

interface DropdownProps {
  options: string[]; // Массив вариантов выбора
  defaultValue?: string; // Начальное значение
  onChange?: (value: string) => void; // Callback при выборе элемента
  children: ReactNode;
}

const Dropdown: FC<DropdownProps> = ({
  options,
  defaultValue,
  onChange,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    defaultValue || options[0]
  );

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onChange?.(value); // Вызов callback-функции при выборе
  };

  return (
    <div className={styles.dropdown}>
      {/* Кнопка переключения */}
      <div
        className={styles.dropdown_toggle}
        onClick={toggleMenu}
        // aria-expanded={isOpen}
      >
        {children}
      </div>

      {/* Меню с вариантами */}
      <ul className={`${styles.dropdown_menu} ${isOpen ? styles.open : ""}`}>
        {options.map((option) => (
          <li
            key={option}
            className={`${styles["dropdown__item"]} ${
              option === selectedValue ? styles.selected : ""
            }`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
