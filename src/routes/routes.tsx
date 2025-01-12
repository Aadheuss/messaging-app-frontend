import App from "../App";
import HomePage from "../pages/Homepage/HomePage";
import SignupPage from "../components/signupPage/SignupPage";
import ConnectionErrPage from "../components/connectionErrPage/ConnectionErrPage";
import NotFoundErrPage from "../components/notFoundErrPage/NotFoundErrPage";
import LoginPage from "../components/loginPage/LoginPage";
import Inboxes from "../components/inboxes/Inboxes";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "user/",
        element: <HomePage />,
        children: [
          {
            path: "inboxes",
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
        element: <LoginPage />,
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
