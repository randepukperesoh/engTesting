import { FC } from "react";

import styles from "./InfoPage.module.scss";
import { Button } from "../../shared/ui/Button/Button";
import { useNavigate } from "react-router-dom";

const InfoPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div>
        <Button onClick={() => navigate("/login")}>Войти</Button>
      </div>
      InfoPage
    </div>
  );
};

export default InfoPage;
