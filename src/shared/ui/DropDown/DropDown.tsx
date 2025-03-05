import { FC, ReactNode, useState } from "react";
import classNames from "classnames";

import styles from "./Dropdown.module.scss";

interface DropdownProps {
  options: ReactNode[];
  children: ReactNode;
}

const Dropdown: FC<DropdownProps> = ({ options, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <div
        className={styles.dropdown_toggle}
        onClick={toggleMenu}
        aria-expanded={isOpen}
      >
        {children}
      </div>

      <ul
        className={classNames(styles.dropdown_menu, { [styles.open]: isOpen })}
      >
        {options.map((option, i) => (
          <li
            key={"option_" + i}
            className={classNames(styles.dropdown_item, {
              [styles.dropdown_item_selected]: option === "selectedValue",
            })}
            onClick={handleOptionClick}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
