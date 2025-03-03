import { FC } from "react";
import { Button } from "../../shared/ui/Button/Button";
import { useGetInfo } from "../../shared/hooks/useGetInfo";
import { useExit } from "../../shared/hooks/useExit";
import { ModalResetPassword } from "../../enteties/Profile/ModalResetPassword/ModalResetPassword";
import { useIsMobile } from "../../shared/hooks/useIsMobile";
import { Loader } from "../../shared/ui/Loader/Loader";

import styles from "./HomePage.module.scss";

const HomePage: FC = () => {
  const { data, isLoading } = useGetInfo();

  const { handleExit } = useExit();

  const { isMobile } = useIsMobile();

  return (
    <div className={styles.wrraper}>
      {!isLoading && (
        <div className={styles.user}>
          <div className={styles.flex}>
            <img className={styles.user_img} src={data?.img_url} height={100} />
            {!isMobile && <ModalResetPassword />}
          </div>
          <div className={styles.user_flex}>
            <div className={styles.user_flex_text}>
              <div>{data?.first_name}</div>
              <div>{data?.last_name}</div>
              {data?.other_name && <div>{data?.other_name}</div>}
            </div>
            {isMobile && <ModalResetPassword />}
            <Button styledButton="red" onClick={handleExit}>
              Выйти
            </Button>
          </div>
        </div>
      )}
      {isLoading && <Loader />}
    </div>
  );
};

export default HomePage;
