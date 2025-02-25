import { FC } from "react";
import { Button } from "../../shared/ui/Button/Button";
import { IProfile, useGetInfo } from "../../shared/hooks/useGetInfo";
import { useExit } from "../../shared/hooks/useExit";
import ModalResetPassword from "../../enteties/Profile/ModalResetPassword/ModalResetPassword";

import styles from "./HomePage.module.scss";

const MOCK: IProfile = {
  id: 3,
  created_at: "2025-02-16T22:23:34.000000Z",
  updated_at: "2025-02-25T08:18:53.000000Z",
  first_name: "ТестИмя",
  last_name: "ТестФамилия",
  other_name: "ТестОтчество",
  login: "test",
  last_enter_date: "2025-02-25T08:18:53.000000Z",
  is_admin: true,
  is_active: true,
  img_url: "https://cdn-icons-png.flaticon.com/512/8377/8377259.png",
};

const HomePage: FC = () => {
  const {
    data: fDAta,
    // error,
    isLoading,
  } = useGetInfo();
  const { handleExit } = useExit();

  const data = fDAta || MOCK;

  if (
    !data
    //  || error
  )
    return <>Что-то пошло не так</>;

  if (isLoading) return <>LOADING</>;

  return (
    <div className={styles.wrraper}>
      <div className={styles.user}>
        <img className={styles.user_img} src={data.img_url} height={100} />
        <div className={styles.user_text}>
          <div>{data.first_name}</div>
          <div>{data.last_name}</div>
          <div>{data.is_admin ? "Администратор" : "Пользователь"}</div>
          <div>{data.other_name}</div>
        </div>
      </div>
      <div className={styles.btn_group}>
        <ModalResetPassword />
        <Button onClick={handleExit}>Выйти</Button>
      </div>
    </div>
  );
};

export default HomePage;
