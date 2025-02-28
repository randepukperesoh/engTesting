import { FC } from "react";
import { useGetSystem } from "../../shared/hooks/useGetSystem";
import { Loader } from "../../shared/ui/Loader/Loader";

import styles from "./SystemPage.module.scss";

const SystemPage: FC = () => {
  const { data, isLoading } = useGetSystem();

  return (
    <div className={styles.wrapper}>
      {isLoading && <Loader />}
      {!isLoading && <>Размер всех файлов {String(data) || "3.25"} MB</>}
    </div>
  );
};

export default SystemPage;
