import App from "../App";
import SignupPage from "../components/signupPage/SignupPage";
import ConnectionErrPage from "../components/connectionErrPage/ConnectionErrPage";
import NotFoundErrPage from "../components/notFoundErrPage/NotFoundErrPage";
import LoginPage from "../components/loginPage/LoginPage";
import HomePage from "../components/homePage/HomePage";
import { isAuthenticated } from "../utils/authentication";
import { Navigate } from "react-router-dom";
import Inboxes, { InboxesLoader } from "../components/inboxes/Inboxes";
import Inbox, { InboxAction, InboxLoader } from "../components/inbox/Inbox";

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
        children: [
          {
            path: "/inboxes",
            element: <Inboxes />,
            loader: InboxesLoader,
            children: [
              {
                path: ":inboxid",
                element: <Inbox />,
                loader: InboxLoader,
                action: InboxAction,
              },
            ],
            errorElement: <ConnectionErrPage />,
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
