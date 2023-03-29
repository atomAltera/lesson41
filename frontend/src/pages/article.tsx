import React from "react";
import {Footer} from "../components/Footer";
import {MainMenu} from "../components/MeinMenu";
import {Screen} from "../components/layouts";
import {useArticle, useArticles, useCurrentUser} from "../hooks";
import {useParams} from "react-router-dom";

export const ArticlePage: React.FC = () => {
    const params = useParams<{ articleId: string }>();

    const {article, loading: articleLoading, error: articleError, notFound} = useArticle(params.articleId || "0");
    const {user, loading: userLoading, error: userError} = useCurrentUser();

    const loading = articleLoading || userLoading;
    const error = articleError || userError;

    const ok = !loading && !error && !notFound;

    return (
        <>
            <Screen>
                <MainMenu user={user}/>

                {loading && (<div>Loading...</div>)}
                {error && (<div>Error...</div>)}
                {notFound && (<div>404, Not found</div>)}

                {ok && (
                    <>
                        <h1>{article.title}</h1>

                        <p>{article.content}</p>

                        <hr/>

                        <ul>
                            <li><span>Author: {article.authorDisplayName}</span></li>
                            <li><span>Created: {article.createdAt.toString()}</span></li>
                        </ul>
                    </>
                )}

            </Screen>
            <Footer/>
        </>
    );
}