import { FC } from "react";
// import { useGetSystem } from "../../shared/hooks/useGetSystem";
// import { Loader } from "../../shared/ui/Loader/Loader";

import styles from "./SystemPage.module.scss";

const SystemPage: FC = () => {
  // const { data, error, isLoading } = useGetSystem();

  // if (isLoading) return <Loader />;
  // if (error) return <>Что-то пошло не так</>;

  // return <div>Размер всех файлов{data || "3.25 MB"}</div>;
  return <div className={styles.wrapper}>Размер всех файлов{"  3.25 MB"}</div>;
};

export default SystemPage;
