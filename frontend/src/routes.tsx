import React from "react";
import {createBrowserRouter} from "react-router-dom";

import {HomePage} from "./pages/home";
import {SignupPage} from "./pages/signup";
import {LoginPage} from "./pages/login";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
    },
    {
        path: "/login",
        element: <LoginPage/>,
    },
    {
        path: "/signup",
        element: <SignupPage/>,
    }
]);
