import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Footer} from "../components/Footer";
import {MainMenu} from "../components/MeinMenu";
import {Screen} from "../components/layouts";
import {User} from "../enitites";
import * as api from "../api";
import {useArticle, useCurrentUser} from "../hooks";
import {PrimaryButton} from "../components/buttons";
import styled from "styled-components";
import { SmColumn } from "../components/layouts";
import { Plate } from "../components/Plate";
import {InputGroup, Textarea} from "../components/form";
import { Input } from "../components/form";

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2em;
  align-items: center;
`;

export const EditArticlePage: React.FC = () => {
    const params = useParams<{ articleId: string }>();

    const {user, loading: userLoading, error: userError} = useCurrentUser(true);
    const {article, loading: articleLoading, error: articleError, notFound} = useArticle(params.articleId || "0");

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (!article) return;

        setTitle(article.title);
        setContent(article.content);
    }, [article])

    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        api.updateArticle(article.id, {title, content})
            .then((res) => {
                if (res.ok) {
                    navigate(`/articles/${article.id}`)
                    return;
                }

                if (res.notAuthenticated) {
                    navigate("/login")
                    return;
                }

                if (res.notFound) {
                    navigate("/articles")
                    return;
                }
            })
    }

    const loading = articleLoading || userLoading;
    const error = articleError || userError;

    const ok = !loading && !error && !notFound;

    return (
        <>
            <Screen>
                <MainMenu user={user}/>
                <SmColumn>

                <h1>Edit article</h1>
                <Plate>

                {loading && (<div>Loading...</div>)}
                {error && (<div>Error...</div>)}

                {ok && (
                    <>
                        <form onSubmit={handleSubmit}>
                        <InputGroup>
                            <label>Title:</label>
                            <Input
                                type="text"
                                name="title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                             />

                            <label>Content:</label>
                            <Textarea
                                name="content"
                                value={content}
                                onChange={e => setContent(e.target.value)}
                            />

                        </InputGroup>

                        <ButtonGroup>
                            <PrimaryButton type="submit">Submit</PrimaryButton>
                        </ButtonGroup>
                        </form>
                    </>
                )}
                </Plate>
                </SmColumn>
            </Screen>
            <Footer/>
        </>
    );
}
