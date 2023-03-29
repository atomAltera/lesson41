import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Footer} from "../components/Footer";
import {MainMenu} from "../components/MeinMenu";
import {Screen} from "../components/layouts";
import {User} from "../enitites";
import * as api from "../api";
import {useCurrentUser} from "../hooks";


export const ProfilePage: React.FC = () => {
    const {user, loading, error} = useCurrentUser();

    if (loading) {
        return (
            <>
                <Screen>
                    <MainMenu user={user}/>
                    <h1>Profile page</h1>
                    <p>Loading...</p>
                </Screen>
                <Footer/>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Screen>
                    <MainMenu user={user}/>
                    <h1>Profile page</h1>
                    <p>Error</p>
                </Screen>
                <Footer/>
            </>
        );
    }

    return (
        <>
            <Screen>
                <MainMenu user={user}/>
                <h1>Profile page</h1>

                <p>Current user: {user.displayName} ({user.email})</p>
            </Screen>
            <Footer/>
        </>
    );
}
