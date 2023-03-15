import React from "react";

import {Footer} from "../components/Footer";
import {MainMenu} from "../components/MeinMenu";
import {Screen, SmColumn} from "../components/layouts";
import {Plate} from "../components/Plate";
import {ResetFormData} from "../enitites";
import {ResetForm} from "../components/ResetForm";

export const ResetPage: React.FC = () => {
    function handleSubmit(form: ResetFormData) {
        console.log(form);
    }

    return (
        <>
            <Screen>
                <MainMenu/>

                <SmColumn>
                    <h1>Password Rest</h1>

                    <Plate>
                        <ResetForm onSubmit={handleSubmit}/>
                    </Plate>
                </SmColumn>
            </Screen>
            <Footer/>
        </>
    );
};
