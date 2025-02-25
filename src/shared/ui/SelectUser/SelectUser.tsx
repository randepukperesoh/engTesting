import styles from "./SelectUser.module.scss";

export const SelectUser = () => {
  return (
    <div className={styles.select}>
      <span className="material-symbols-outlined">verified</span>
      <div className={styles.select_button}>Выбрать пользователя</div>
    </div>
  );
};
