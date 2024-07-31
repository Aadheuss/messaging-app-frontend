import App from "../App";
import SignupPage from "../components/signupPage/SignupPage";
import ConnectionErrPage from "../components/connectionErrPage/ConnectionErrPage";
import NotFoundErrPage from "../components/notFoundErrPage/NotFoundErrPage";
import LoginPage from "../components/loginPage/LoginPage";
import HomePage from "../components/homePage/HomePage";
import { isAuthenticated } from "../utils/authentication";
import { Navigate } from "react-router-dom";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (await isAuthenticated()) ? (
          <HomePage />
        ) : (
          <Navigate to="/login" />
        ),
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
