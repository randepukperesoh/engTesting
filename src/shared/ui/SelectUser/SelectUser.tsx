import styles from "./SelectUser.module.scss";

export const SelectUser = () => {
  return (
    <div className={styles.select}>
      <div className={styles.select_button}>Пользователь не выбран</div>
    </div>
  );
};
