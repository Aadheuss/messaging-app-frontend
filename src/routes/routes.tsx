import App from "../App";
import HomePage from "../pages/homePage/HomePage";
import SignupPage from "../components/signupPage/SignupPage";
import ConnectionErrPage from "../components/connectionErrPage/ConnectionErrPage";
import NotFoundErrPage from "../components/notFoundErrPage/NotFoundErrPage";
import LoginPage from "../components/loginPage/LoginPage";
import { isAuthenticated } from "../utils/authentication";
import { Navigate } from "react-router-dom";
import Inboxes from "../components/inboxes/Inboxes";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "user",
        element: <HomePage />,
        children: [
          {
            path: "/inboxes",
            element: <Inboxes />,
          },
        ],
      },

      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "login",
        element: (await isAuthenticated()) ? (
          <Navigate to="/" />
        ) : (
          <LoginPage />
        ),
      },
      {
        path: "error",
        element: <ConnectionErrPage />,
      },
      {
        path: "404",
        element: <NotFoundErrPage />,
      },
    ],
    errorElement: <NotFoundErrPage />,
  },
];

export default routes;
