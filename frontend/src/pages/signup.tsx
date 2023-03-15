import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import {Footer} from "../components/Footer";
import {MainMenu} from "../components/MeinMenu";
import {Screen, SmColumn} from "../components/layouts";
import {Plate} from "../components/Plate";
import {SignupForm} from "../components/SignupForm";
import {SignupFormData} from "../enitites";

import * as api from "../api";
import {Notification} from "../components/Notification";

export const SignupPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();
    const navigate = useNavigate();

    function handleSubmit(form: SignupFormData) {
        setLoading(true);
        setError(undefined);

        api.signup(form)
            .then((res) => {
                if (res.ok) {
                    navigate("/profile")
                    return;
                }

                if (res.emailTaken) {
                    setError("Email is already taken");
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
                    <h1>Registration</h1>
                    <Plate>
                        {error && (
                            <>
                                <Notification kind="error">
                                    {error}
                                </Notification>
                                <br/>
                            </>
                        )}

                        <SignupForm
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
