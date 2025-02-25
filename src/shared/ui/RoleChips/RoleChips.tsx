import { FC } from "react";
import styles from "./RoleChips.module.scss";

export const RoleChips: FC<{ role: string }> = ({ role }) => {
  const roleClass = role === "Администратор" ? styles.admin : styles.user;
  return <div className={`${styles.chips} ${roleClass}`}>{role}</div>;
};
