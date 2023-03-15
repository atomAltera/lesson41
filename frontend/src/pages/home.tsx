import React from "react";
import { Footer } from "../components/Footer";
import { MainMenu } from "../components/MeinMenu";
import { Screen } from "../components/layouts";




export const HomePage: React.FC = () => {
    return (
        <>
            <Screen>
                <MainMenu />
                <h1>Home page</h1>
            </Screen>
            <Footer />
        </>
    );
}
