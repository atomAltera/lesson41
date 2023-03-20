import React, {useState} from "react";

import {Footer} from "../components/Footer";
import {MainMenu} from "../components/MeinMenu";
import {Screen, SmColumn} from "../components/layouts";
import {Plate} from "../components/Plate";
import {LoginFormData} from "../enitites";
import {LoginForm} from "../components/LoginForm";

import * as api from "../api";
import {Notification} from "../components/Notification";
import {useNavigate} from "react-router-dom";

export const LoginPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();
    const navigate = useNavigate();

    function handleSubmit(form: LoginFormData) {
        setLoading(true);
        setError(undefined);

        api.login(form)
            .then((res) => {
                if (res.ok) {
                    navigate("/profile")
                    return;
                }

                if (res.invalidCredentials) {
                    setError("Email and/or password is invalid");
                    return;
                }

                setError("Something went wrong");
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <>
            <Screen>
                <MainMenu/>

                <SmColumn>
                    <h1>Login</h1>

                    <Plate>
                        {error && (
                            <>
                                <Notification kind="error">
                                    {error}
                                </Notification>
                                <br/>
                            </>
                        )}

                        <LoginForm
                            loading={loading}
                            onSubmit={handleSubmit}
                        />
                    </Plate>
                </SmColumn>
            </Screen>
            <Footer/>
        </>
    );
};
