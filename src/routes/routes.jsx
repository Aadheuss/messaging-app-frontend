import App from "../App";
import SignupPage from "../components/signupPage/SignupPage";
import ConnectionErrPage from "../components/connectionErrPage/ConnectionErrPage";
import NotFoundErrPage from "../components/notFoundErrPage/NotFoundErrPage";
import LoginPage from "../components/loginPage/LoginPage";
import HomePage from "../components/homePage/HomePage";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },

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
