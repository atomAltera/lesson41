import React from "react";
import {Footer} from "../components/Footer";
import {MainMenu} from "../components/MeinMenu";
import {Screen} from "../components/layouts";
import {useArticles, useCurrentUser} from "../hooks";
import {NavLink} from "react-router-dom";

export const ArticlesPage: React.FC = () => {
    const {articles, loading: articlesLoading, error: articlesError} = useArticles();
    const {user, loading: userLoading, error: userError} = useCurrentUser();

    const loading = articlesLoading || userLoading;
    const error = articlesError || userError;

    return (
        <>
            <Screen>
                <MainMenu user={user}/>
                <h1>My Articles</h1>

                {loading && (<div>Loading...</div>)}
                {error && (<div>Error...</div>)}

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
