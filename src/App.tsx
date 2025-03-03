import { FC } from "react";
import AppRoutes from "./AppRoutes";
import "./shared/ui/colors/Variables.scss";
import "./App.css";
import "./scroll.module.scss";
import { ToastContainer } from "react-toastify";

const App: FC = () => {
  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
};

export default App;
