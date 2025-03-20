import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./shared/ProtectedRoute/ProtectedRoute";
import { FC, lazy, Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { Loader } from "./shared/ui/Loader/Loader";

const RootLayout = lazy(() => import("./pages/Layout/Layot"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage/ErrorPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const KnowledgePage = lazy(() => import("./pages/KnowledgePage/KnowledgePage"));
const UsersPage = lazy(() => import("./pages/UsersPage/UsersPage"));
const ExamsPage = lazy(() => import("./pages/ExamsPage/ExamsPage"));
const SystemPage = lazy(() => import("./pages/SystemPage/SystemPage"));
const ResultsPage = lazy(() => import("./pages/ResultsPage/ResultsPage"));
const TestingPage = lazy(() => import("./pages/TestingPage/TestingPage"));
const ExamItemPage = lazy(() => import("./pages/ExamItemPage/ExamItemPage"));
const EditTaskPage = lazy(
  () => import("./enteties/Knowledge/TaskItem/ModalContent")
);
const RandListPage = lazy(() => import("./pages/RandListPage/RandListPage"));
const InfoPage = lazy(() => import("./pages/InfoPage/InfoPage"));

const router = createBrowserRouter([
  {
    path: "login",
    element: (
      <Suspense fallback={<Loader />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "",
    element: (
      <Suspense fallback={<Loader />}>
        <InfoPage />
      </Suspense>
    ),
  },
  {
    path: "",
    element: <ProtectedRoute />,
    errorElement: (
      <Suspense fallback={<Loader />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        element: (
          <Suspense fallback={<Loader />}>
            <RootLayout />
          </Suspense>
        ),
        children: [
          {
            path: "profile",
            element: (
              <Suspense fallback={<Loader />}>
                <HomePage />
              </Suspense>
            ),
          },
          {
            path: "knowledge",
            element: (
              <Suspense fallback={<Loader />}>
                <KnowledgePage />
              </Suspense>
            ),
          },
          {
            path: "knowledge/:id",
            element: (
              <Suspense fallback={<Loader />}>
                <ExamItemPage />
              </Suspense>
            ),
          },
          {
            path: "knowledge/task/:id",
            element: (
              <Suspense fallback={<Loader />}>
                <EditTaskPage />
              </Suspense>
            ),
          },
          {
            path: "knowledge/randList",
            element: (
              <Suspense fallback={<Loader />}>
                <RandListPage />
              </Suspense>
            ),
          },
          {
            path: "users",
            element: (
              <Suspense fallback={<Loader />}>
                <UsersPage />
              </Suspense>
            ),
          },
          {
            path: "exams",
            element: (
              <Suspense fallback={<Loader />}>
                <ExamsPage />
              </Suspense>
            ),
          },
          {
            path: "system",
            element: (
              <Suspense fallback={<Loader />}>
                <SystemPage />
              </Suspense>
            ),
          },
          {
            path: "results",
            element: (
              <Suspense fallback={<Loader />}>
                <ResultsPage />
              </Suspense>
            ),
          },
          {
            path: "/testing",
            element: (
              <Suspense fallback={<Loader />}>
                <TestingPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

const AppRoutes: FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
