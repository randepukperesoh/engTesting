import { Button } from "../../../shared/ui/Button/Button";
import { Input } from "../../../shared/ui/Input/Input";
import { Modal } from "../../../shared/ui/Modal/Modal";
import { TextArea } from "../../../shared/ui/TextArea/TextArea";

import styles from "./ModalCreateTask.module.scss";

const ModalContent = () => {
  return (
    <div className={styles.content}>
      <h2>Создание задания</h2>
      <Input label="Название" />
      <Input label="Заголовок" />
      <label className={styles.content_text}>
        Текст:
        <TextArea />
      </label>
      <Input label="Изображения" />
      <label className={styles.content_text}>
        Варианты ответов:
        <TextArea />
      </label>
      <Input label="Время подготовки" />
      <Input label="Время записи" />
      <Button>Создать</Button>
    </div>
  );
};

export const ModalCreateTask = () => {
  return (
    <Modal rendreProp={() => <ModalContent />}>
      <Button>Создать задание</Button>
    </Modal>
  );
};
