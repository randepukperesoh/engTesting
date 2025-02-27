import { FC } from "react";
import { Button } from "../../shared/ui/Button/Button";
import { useGetInfo } from "../../shared/hooks/useGetInfo";
import { useExit } from "../../shared/hooks/useExit";
import { ModalResetPassword } from "../../enteties/Profile/ModalResetPassword/ModalResetPassword";

import styles from "./HomePage.module.scss";
import { useIsMobile } from "../../shared/hooks/useIsMobile";

const HomePage: FC = () => {
  const {
    data,
    // error,
    isLoading,
  } = useGetInfo();
  const { handleExit } = useExit();

  const { isMobile } = useIsMobile();

  if (
    !data
    //  || error
  )
    return <>Что-то пошло не так</>;

  if (isLoading) return <>LOADING</>;

  return (
    <div className={styles.wrraper}>
      <div className={styles.user}>
        <div className={styles.flex}>
          <img className={styles.user_img} src={data.img_url} height={100} />
          {!isMobile && <ModalResetPassword />}
        </div>
        <div className={styles.user_text}>
          <div>{data.first_name}</div>
          <div>{data.last_name}</div>
          <div>{data.is_admin ? "Администратор" : "Пользователь"}</div>
          <div>{data.other_name}</div>
          {isMobile && <ModalResetPassword />}
          <Button onClick={handleExit}>Выйти</Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
