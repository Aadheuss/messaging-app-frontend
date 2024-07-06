import App from "../App";
import SignupPage from "../components/signupPage/SignupPage";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "users/signup",
        element: <SignupPage />,
      },
    ],
  },
];

export default routes;
