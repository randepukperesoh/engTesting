import { FC } from "react";
import { Outlet } from "react-router-dom";

import styles from "./Layout.module.scss";
import { Navigation } from "../../shared/ui/Navigation/Navigation";

const Layout: FC = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Navigation />
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
