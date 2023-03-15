import React from "react";
import {createBrowserRouter} from "react-router-dom";

import {HomePage} from "./pages/home";
import {SignupPage} from "./pages/signup";
import {LoginPage} from "./pages/login";
import {ResetPage} from "./pages/reset";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
    },
    {
        path: "/signup",
        element: <SignupPage/>,
    },
    {
        path: "/login",
        element: <LoginPage/>,
    },
    {
        path: "/reset",
        element: <ResetPage/>,
    },
]);
