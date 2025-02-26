import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "../../hooks/useIsMobile";

import styles from "./Navigation.module.scss";

const ROUTES = [
  {
    to: "/",
    text: "Главная",
    img: <span className="material-symbols-outlined">home</span>,
  },
  {
    to: "/knowledge",
    text: "База знаний",
    img: <span className="material-symbols-outlined">description</span>,
  },
  {
    to: "/users",
    text: "Пользователи",
    img: <span className="material-symbols-outlined">group</span>,
  },
  {
    to: "/exams",
    text: "Проведение экзаменов",
    img: <span className="material-symbols-outlined">schedule</span>,
  },
  {
    to: "/system",
    text: "Система",
    img: <span className="material-symbols-outlined">save</span>,
  },
  {
    to: "/results",
    text: "Результаты",
    img: <span className="material-symbols-outlined">monitoring</span>,
  },
];

export const Navigation = () => {
  const { isMobile } = useIsMobile();

  const { pathname } = useLocation();

  if (pathname === "/testing") return null;

  return (
    <nav className={styles.wrapper}>
      <ul className={styles.navigation}>
        {ROUTES.map((route, index) => (
          <li key={index}>
            <Link to={route.to}>
              {isMobile ? route.img : route.text.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
