import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Footer} from "../components/Footer";
import {MainMenu} from "../components/MeinMenu";
import {Screen} from "../components/layouts";
import {User} from "../enitites";
import * as api from "../api";
import {useCurrentUser} from "../hooks";
import {PrimaryButton} from "../components/buttons";


export const NewArticlePage: React.FC = () => {
    const {user, loading, error} = useCurrentUser();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    if (loading) {
        return (
            <>
                <Screen>
                    <MainMenu/>
                    <h1>New article</h1>
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
                    <h1>New article</h1>
                    <p>Error</p>
                </Screen>
                <Footer/>
            </>
        );
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        api.createArticle({title, content})
            .then(() => {
                navigate("/articles")
            })
    }

    return (
        <>
            <Screen>
                <MainMenu/>
                <h1>New article</h1>

                <p>Current user: {user.displayName} ({user.email})</p>

                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} name="title"/>
                    </label>
                    <label>
                        Content:
                        <textarea name="content" value={content} onChange={e => setContent(e.target.value)}/>
                    </label>

                    <PrimaryButton type="submit">Submit</PrimaryButton>
                </form>
            </Screen>
            <Footer/>
        </>
    );
}
