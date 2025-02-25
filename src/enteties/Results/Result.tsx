import { FC } from "react";
import { Modal } from "../../shared/ui/Modal/Modal";
import { IReSultUser } from "../../pages/ResultsPage/ResultsPage";

import styles from "./Result.module.scss";

interface IResultsBlocks {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  step_id: number;
  is_rand: boolean;
  randcode: null | string;
  type: string;
  data: string;
  order_num: number;
  status: string;
}

const MOCK: IResultsBlocks[] = [
  {
    id: 1,
    created_at: "2025-02-16T21:19:51.898452Z",
    updated_at: "2025-02-16T21:19:51.898452Z",
    user_id: 2,
    step_id: 1,
    is_rand: false,
    randcode: null,
    type: "title",
    data: "Task 1. Imagine that you are preparing a project with your friend. You have\nfound some interesting material for the presentation and you want to read this\ntext to your friend. You have 1.5 minutes to read the text silently, then be\nready to read it out aloud. You will not have more than 1.5 minutes to read it.",
    order_num: 1,
    status: "true",
  },
  {
    id: 2,
    created_at: "2025-02-16T21:21:55.674635Z",
    updated_at: "2025-02-16T21:21:55.674635Z",
    user_id: 2,
    step_id: 1,
    is_rand: true,
    randcode: "1234567890",
    type: "text",
    data: "There is nothing fancy or expensive about happiness. On the contrary, happiness is\nsimple and slow. It means choosing peace and quiet over excitement. It is wearing\nyour old pyjamas and watching a movie the day before Christmas. It is sitting in\nyour window watching the weather while sipping your favourite tea on a rainy day.\nIt is looking into the bonfire surrounded by your friends and family while your\nbread is slowly baking.\nHappiness is always about appreciating the simple pleasures in life and thus it can\nbe achieved on a really low budget. You cannot buy the right atmosphere or\na sense of togetherness. It’s all about time, interest and engagement in the people\naround you. Thus, happiness is an atmosphere which is not improved by spending\nmore money on it, but rather, in some ways, the opposite. After all, the best things\nin life are absolutely free. ",
    order_num: 2,
    status: "true",
  },
  {
    id: 6,
    created_at: "2025-02-19T01:16:23.879559Z",
    updated_at: "2025-02-19T01:16:23.879559Z",
    user_id: 2,
    step_id: 3,
    is_rand: true,
    randcode: null,
    type: "text",
    data: "Join our journey to the mountains!",
    order_num: 2,
    status: "true",
  },
  {
    id: 8,
    created_at: "2025-02-19T01:18:50.244443Z",
    updated_at: "2025-02-19T01:18:50.244443Z",
    user_id: 2,
    step_id: 3,
    is_rand: true,
    randcode: null,
    type: "bold",
    data: "You are considering going to the mountains and now you’d like to get more information. In 1.5 minutes you are to ask four direct questions to find out about the following:",
    order_num: 4,
    status: "true",
  },
  {
    id: 10,
    created_at: "2025-02-19T01:19:33.349133Z",
    updated_at: "2025-02-19T01:19:33.349133Z",
    user_id: 2,
    step_id: 3,
    is_rand: true,
    randcode: null,
    type: "bold",
    data: "You have 20 seconds to ask each question. ",
    order_num: 6,
    status: "true",
  },
  {
    id: 7,
    created_at: "2025-02-19T01:17:29.647985Z",
    updated_at: "2025-02-19T01:17:29.647985Z",
    user_id: 2,
    step_id: 3,
    is_rand: true,
    randcode: null,
    type: "image",
    data: "https://dntu.exesfull.com/sovet_donstu_bot/images/AgACAgIAAxkBAALY7We1Wz3NTN_YV0petS3zE7Udp1CMAAJZ5zEbwUepSUtdiqos2VtUAQADAgADeQADNgQ.jpg",
    order_num: 3,
    status: "true",
  },
  {
    id: 3,
    created_at: "2025-02-19T01:15:48.936109Z",
    updated_at: "2025-02-19T01:15:48.936109Z",
    user_id: 2,
    step_id: 3,
    is_rand: true,
    randcode: null,
    type: "title",
    data: "Task 2. Study the advertisement.",
    order_num: 1,
    status: "true",
  },
  {
    id: 9,
    created_at: "2025-02-19T01:19:13.300308Z",
    updated_at: "2025-02-19T01:19:13.300308Z",
    user_id: 2,
    step_id: 3,
    is_rand: true,
    randcode: null,
    type: "text",
    data: "1) duration of the tour;<br>\n2) price for one;<br>\n3) student discounts;<br>\n4) special equipment needed. <br>",
    order_num: 5,
    status: "true",
  },
];

export const Result: FC<IReSultUser> = ({
  exam_date,
  first_name,
  last_name,
}) => {
  return (
    <Modal
      rendreProp={() => (
        <div className={styles.modal}>
          <div className={styles.modal_wrapper}>
            {MOCK.map((el) => {
              if (el.type === "title") return <h3>{el.data}</h3>;
              if (el.type === "text") return <div>{el.data}</div>;
              if (el.type === "image")
                return <img height={300} src={el.data} />;
              if (el.type === "bold") return <div>{el.data}</div>;
            })}
          </div>
        </div>
      )}
    >
      <div className={styles.content}>
        {last_name} {first_name} {exam_date}
      </div>
    </Modal>
  );
};
