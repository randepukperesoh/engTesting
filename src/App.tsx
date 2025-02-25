import { FC, useEffect } from "react";
import AppRoutes from "./AppRoutes";
import "./shared/ui/colors/Variables.scss";
import "./App.css";
import { useUserStore } from "./shared/stores/useUserStore";

const App: FC = () => {
  const { isLogined } = useUserStore();
  useEffect(() => {}, [isLogined]);

  return <AppRoutes />;
};

export default App;
