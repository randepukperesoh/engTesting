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
      Осталось: {(time / 60).toFixed()}-{time % 60}{" "}
      <span
        className={isRecording ? styles.timer_active : styles.timer_noactive}
      >
        {isRecording ? "Запись" : "подготовка"}
      </span>
    </div>
  );
};
