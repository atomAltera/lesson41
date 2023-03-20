import React from "react";
import {createBrowserRouter} from "react-router-dom";

import {SignupPage} from "./pages/signup";
import {LoginPage} from "./pages/login";
import {ResetPage} from "./pages/reset";
import {ProfilePage} from "./pages/profile";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ProfilePage/>,
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
    {
        path: "/profile",
        element: <ProfilePage/>
    }
]);
