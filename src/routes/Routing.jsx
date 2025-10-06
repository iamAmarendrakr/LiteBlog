import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ViewDetail from "../components/ViewDetail";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import UserDashbord from "../pages/UserDashbord";

export let myRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/userDashbord/:id",
        element: <UserDashbord />,
      },
      {
        path: "/view/:id",
        element: <ViewDetail />,
      },
    ],
  },
]);
