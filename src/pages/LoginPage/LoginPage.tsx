import { FC } from "react";
import { Button } from "../../shared/ui/Button/Button";
import { Input } from "../../shared/ui/Input/Input";
import { useAuthForm } from "../../shared/hooks/useAuthForm";
import { useIsGroup } from "../../shared/hooks/useIsGroup";
import { useLoginAsGroup } from "../../shared/hooks/useLoginAsGroup";

import styles from "./LoginPage.module.scss";

const LoginPage: FC = () => {
  const { isGroup, handleChangeToGroup, handleChangeToUser } = useIsGroup();
  const { handleLogin, setLogin, setPassword } = useAuthForm();
  const { handleLoginAsGroup, setCode } = useLoginAsGroup();

  return (
    <div className={styles.wrapper}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {!isGroup ? (
          <>
            <h2>Пользователь</h2>
            <Input
              onChange={(e) => setLogin(e.currentTarget.value)}
              label="Логин"
              key={"loginAsUser"}
            />
            <Input
              label="Пароль"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <Button key={"BtnAsUser"} onClick={handleLogin}>
              Войти
            </Button>

            <Button onClick={handleChangeToGroup}>Тестирование группой</Button>
          </>
        ) : (
          <>
            <h2>Тестирование</h2>
            <Input
              onChange={(e) => setCode(e.currentTarget.value)}
              label="Код"
              key={"loginAsUserGroup"}
            />
            <Button key={"BtnAsGroup"} onClick={handleLoginAsGroup}>
              Войти
            </Button>
            <Button onClick={handleChangeToUser}>Войти как пользователь</Button>
          </>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
