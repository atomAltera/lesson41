import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Footer} from "../components/Footer";
import {MainMenu} from "../components/MeinMenu";
import {Screen} from "../components/layouts";
import {User} from "../enitites";
import * as api from "../api";

interface LoadingState {
    loading: true;
    error: false;
    user: undefined;
}

interface ErrorState {
    loading: false;
    error: true;
    user: undefined;
}

interface OkState {
    loading: false;
    error: false;
    user: User;
}

type State = LoadingState | ErrorState | OkState;

function useCurrentUser(): State {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [user, setUser] = useState<User | undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setError(false);

        api.getCurrentUser()
            .then(r => {
                if (r.notAuthenticated) {
                    navigate("/login");
                    return;
                }

                setLoading(false);

                if (!r.ok) {
                    setError(true);
                    return;
                }

                setUser(r.user);
            })
    }, [])

    return {
        loading,
        error,
        user,
    } as State
}


export const ProfilePage: React.FC = () => {
    const {user, loading, error} = useCurrentUser();

    if (loading) {
        return (
            <>
                <Screen>
                    <MainMenu/>
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
                    <MainMenu/>
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
                <MainMenu/>
                <h1>Profile page</h1>

                <p>Current user: {user.displayName} ({user.email})</p>
            </Screen>
            <Footer/>
        </>
    );
}
