import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Импортируйте ваши компоненты
const RootLayout = lazy(() => import("./pages/Layout/Layot")); // Общий макет
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const KnowledgePage = lazy(() => import("./pages/KnowledgePage/KnowledgePage"));
const UsersPage = lazy(() => import("./pages/UsersPage/UsersPage"));
const ExamsPage = lazy(() => import("./pages/ExamsPage/ExamsPage"));
const SystemPage = lazy(() => import("./pages/SystemPage/SystemPage"));
const ResultsPage = lazy(() => import("./pages/ResultsPage/ResultsPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "knowledge",
        element: <KnowledgePage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "exams",
        element: <ExamsPage />,
      },
      {
        path: "system",
        element: <SystemPage />,
      },
      {
        path: "results",
        element: <ResultsPage />,
      },
    ],
  },
]);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
