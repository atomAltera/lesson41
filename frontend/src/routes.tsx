import { createBrowserRouter } from "react-router-dom";

import { HomePage } from "./pages/home";
import { SignupPage } from "./pages/signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  }
]);
