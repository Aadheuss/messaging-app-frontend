import App from "../App";
import SignupPage from "../components/signupPage/SignupPage";
import ConnectionErrPage from "../components/connectionErrPage/ConnectionErrPage";
import NotFoundErrPage from "../components/notFoundErrPage/NotFoundErrPage";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "users/signup",
        element: <SignupPage />,
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
