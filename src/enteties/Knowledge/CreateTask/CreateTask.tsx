import { useIsMobile } from "../../../shared/hooks/useIsMobile";
import { Button } from "../../../shared/ui/Button/Button";
import { Input } from "../../../shared/ui/Input/Input";

import styles from "./CreateTask.module.scss";

export const CreateTask = () => {
  const { isMobile } = useIsMobile();
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_filters}>
        <Input isColumn={!isMobile} label="Поиск" />
        <Button>Создать</Button>
      </div>
      <div className={styles.wrapper_items}>Список заданий </div>
    </div>
  );
};
