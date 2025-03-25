import { Link } from "react-router-dom";
import { useIsMobile } from "../../shared/hooks/useIsMobile";
import { ClickSvg } from "./ClickSvg";
import { ArrowSvg } from "./ArrowSvg";
import { useEffect, useState } from "react";

import styles from "./InfoPage.module.scss";

interface IFlags {
  name: string;
  image_url: string;
}

const InfoPage = () => {
  const { isMobile } = useIsMobile();
  const [flags, setFlags] = useState<IFlags[]>([]);

  useEffect(() => {
    const fetchFlags = async () => {
      const response = await fetch("/back/flags.json");

      const res: IFlags[] = await response.json();

      setFlags(res);
    };

    fetchFlags();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_header}>
        <a
          href="https://donstu.ru/"
          className={styles.wrapper_header_btn}
          target="_blank"
        >
          Главный сайт
        </a>
        <Link to="/login" className={styles.wrapper_header_btn}>
          Войти
        </Link>
      </div>
      <div className={styles.a}>
        <div className={styles.wrapper_block}>
          <h2 className={styles.wrapper_block_head}>Speaktest</h2>
          <div className={styles.wrapper_block_text}>
            Цифровая платформа, разработанная для тестирования устной части на
            иностранных языках. Система позволяет проводить массовое
            тестирование групп людей под контролем модератора, обеспечивая
            высокую точность и удобство использования.
          </div>
          <button className={styles.wrapper_block_btn}>
            <Link to="/login" className={styles.wrapper_header_btn}>
              Перейти <ArrowSvg />
            </Link>
          </button>
        </div>

        <div className={styles.wrapper_blockConstr}>
          <h2 className={styles.wrapper_blockConstr_head}>
            Конструктор экзаменов
          </h2>
          <div className={styles.wrapper_blockConstr_text}>
            Speaktest включает встроенный конструктор экзаменов, который
            позволяет создавать пользовательские тесты за считанные минуты. Вы
            можете разбить экзамен на отдельные задания, индивидуально задав
            время подготовки и записи для каждого из них, а также выбрать
            необходимые блоки содержимого.
          </div>
          {!isMobile && (
            <img
              width={300}
              className={styles.wrapper_blockConstr_img}
              src="https://cdn-icons-png.flaticon.com/512/18036/18036664.png"
              alt="icon"
            />
          )}
        </div>

        <div className={styles.wrapper_advantages}>
          <div className={styles.wrapper_advantages_item}>
            <ClickSvg />
            Подходит для образовательных учреждений: колледжей, университетов,
            институтов.
          </div>

          <div className={styles.wrapper_advantages_item}>
            <ClickSvg />
            Позволяет проводить тестирование большого количества участников при
            минимальном участии модераторов.
          </div>

          <div className={styles.wrapper_advantages_item}>
            <ClickSvg />
            Предоставляет подробные результаты прохождения теста, включая
            аудиозаписи ответов и автоматическую расшифровку в текст.
          </div>
        </div>

        <div className={styles.wrapper_lang}>
          <h3 className={styles.wrapper_lang_head}>Поддерживаемые языки</h3>
          <div className={styles.wrapper_lang_container}>
            {flags.map((el) => (
              <div className={styles.wrapper_lang_container_item}>
                <img width={80} src={el.image_url} alt="Флаг Великобритании" />
                {el.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.wrapper_fother}>
        <img src="https://ddd.donstu.ru/local/templates/full/i/dstu95logo_white.svg" />
        <div className={styles.wrapper_fother_column}>
          <div>Поступающим</div>
          <div>Университет</div>
          <div>Наука и инновации</div>
        </div>
        <div className={styles.wrapper_fother_column}>
          <div>Обучающимся</div>
          <div>Факультеты и кафедры</div>
          <div>Услуги</div>
        </div>
        <div className={styles.wrapper_fother_column}>
          <div>Сотрудникам</div>
          <div>Довузовская подготовка</div>
          <div>Сотрудничество</div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
