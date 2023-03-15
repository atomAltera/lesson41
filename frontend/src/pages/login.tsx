import React from "react";

import {Footer} from "../components/Footer";
import {MainMenu} from "../components/MeinMenu";
import {Screen, SmColumn} from "../components/layouts";
import {Plate} from "../components/Plate";
import {LoginFormData} from "../enitites";
import {LoginForm} from "../components/LoginForm";

export const LoginPage: React.FC = () => {
    function handleSubmit(form: LoginFormData) {
        console.log(form);
    }

    return (
        <>
            <Screen>
                <MainMenu/>

                <SmColumn>
                    <h1>Login</h1>

                    <Plate>
                        <LoginForm onSubmit={handleSubmit}/>
                    </Plate>
                </SmColumn>
            </Screen>
            <Footer/>
        </>
    );
};
