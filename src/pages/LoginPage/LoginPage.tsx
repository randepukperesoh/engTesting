import { FC } from "react";
import { Button } from "../../shared/ui/Button/Button";
import { Input } from "../../shared/ui/Input/Input";
import { useAuthForm } from "../../shared/hooks/useAuthForm";

import styles from "./LoginPage.module.scss";

const LoginPage: FC = () => {
  const { handleLogin, setLogin, setPassword } = useAuthForm();

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Input onChange={(e) => setLogin(e.currentTarget.value)} label="Логин" />
      <Input
        label="Пароль"
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <Button onClick={handleLogin}>Войти</Button>
    </form>
  );
};

export default LoginPage;
