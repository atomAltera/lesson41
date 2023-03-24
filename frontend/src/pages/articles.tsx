import React from "react";
import {Footer} from "../components/Footer";
import {MainMenu} from "../components/MeinMenu";
import {Screen} from "../components/layouts";
import {useArticles, useCurrentUser} from "../hooks";
import {NavLink} from "react-router-dom";

export const ArticlesPage: React.FC = () => {
    const {articles, loading, error} = useArticles();

    if (loading) {
        return (
            <>
                <Screen>
                    <MainMenu/>
                    <h1>My Articles</h1>
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
                    <h1>My Articles</h1>
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
                <h1>My Articles</h1>
                <p>Articles: {articles.length}</p>

                {articles.map(article => (
                    <section key={article.id}>
                        <h2><NavLink to={`/articles/${article.id}`}>{article.title}</NavLink></h2>
                        <p>{article.content}</p>
                    </section>
                ))}
            </Screen>
            <Footer/>
        </>
    );
}
