import { FC } from "react";

import styles from "./ErrorPage.module.scss";
import { Button } from "../../shared/ui/Button/Button";
import { useNavigate } from "react-router-dom";

const ErrorPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_head}>
        <p>Упс что-то пошло не так ...</p>
        <Button onClick={() => navigate("/")}>Главная</Button>
      </div>
    </div>
  );
};

export default ErrorPage;
