import styles from "./Timer.module.scss";

export const Timer = ({
  isRecording,
  time,
}: {
  isRecording: boolean;
  time: number;
}) => {
  return (
    <div className={styles.timer}>
      Осталось: {Math.ceil(time / 60) - 1}-{time % 60}{" "}
      <span
        className={isRecording ? styles.timer_active : styles.timer_noactive}
      >
        {isRecording ? "Запись" : "подготовка"}
      </span>
    </div>
  );
};
