import { useHandleCreateTask } from "../../../shared/hooks/useHandleCreateTask";
import { Button } from "../../../shared/ui/Button/Button";
import { Input } from "../../../shared/ui/Input/Input";
import { Modal } from "../../../shared/ui/Modal/Modal";
// import { TextArea } from "../../../shared/ui/TextArea/TextArea";

import styles from "./ModalCreateTask.module.scss";

export const ModalCreateTask = ({ examId }: { examId: string }) => {
  const { handleCreateTask, setTitle } = useHandleCreateTask(examId);
  return (
    <Modal
      rendreProp={(setIsOpen) => (
        <div className={styles.content}>
          <h2>Создание задания</h2>
          <Input
            onChange={(e) => setTitle(e.currentTarget.value)}
            label="Название"
          />
          {/* <Input label="Заголовок" /> */}
          {/* <label className={styles.content_text}>
      Текст:
      <TextArea />
    </label>
    <Input label="Изображения" />
    <label className={styles.content_text}>
      Варианты ответов:
      <TextArea />
    </label>
    <Input label="Время подготовки" />
    <Input label="Время записи" /> */}
          <Button onClick={() => handleCreateTask(() => setIsOpen(false))}>
            Создать
          </Button>
        </div>
      )}
    >
      <Button>Создать задание</Button>
    </Modal>
  );
};
