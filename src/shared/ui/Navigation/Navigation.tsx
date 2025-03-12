import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "../../hooks/useIsMobile";
import { DescriptionIcon } from "../icons/DescriptionIcon";
import { GroupIcons } from "../icons/GroupIcons";
import { ClockIcon } from "../icons/ClockIcon";
import { FolderIcon } from "../icons/FolderIcon";
import { ImageIcon } from "../icons/ImageIcon";
import classNames from "classnames";

import styles from "./Navigation.module.scss";

const ROUTES = [
  {
    to: "/knowledge",
    text: "База знаний",
    img: <DescriptionIcon />,
  },
  {
    to: "/users",
    text: "Пользователи",
    img: <GroupIcons />,
  },
  {
    to: "/exams",
    text: "Проведение экзаменов",
    img: <ClockIcon />,
  },
  {
    to: "/system",
    text: "Система",
    img: <FolderIcon />,
  },
  {
    to: "/results",
    text: "Результаты",
    img: <ImageIcon />,
  },
];

export const Navigation = () => {
  const { isMobileNav: isMobile } = useIsMobile();

  const { pathname } = useLocation();

  if (pathname === "/testing") return null;

  return (
    <nav className={styles.wrapper}>
      <Link to="/">
        <img src="/logo.svg" height={isMobile ? 24 : 32} alt="logo" />{" "}
      </Link>
      <ul className={styles.navigation}>
        {ROUTES.map((route, index) => (
          <li
            className={classNames(styles.navigation_link, {
              [styles.navigation_link_active]: pathname === route.to,
            })}
            key={index}
          >
            <Link to={route.to}>
              {isMobile ? route.img : route.text.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
