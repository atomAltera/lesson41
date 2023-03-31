import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Footer} from "../components/Footer";
import {MainMenu} from "../components/MeinMenu";
import {Screen} from "../components/layouts";
import {User} from "../enitites";
import * as api from "../api";
import {useCurrentUser} from "../hooks";
import {PrimaryButton} from "../components/buttons";
import styled from "styled-components";
import { SmColumn } from "../components/layouts";
import { Plate } from "../components/Plate";
import { InputGroup } from "../components/form";
import { Input } from "../components/form";

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2em;
  align-items: center;
`;

export const NewArticlePage: React.FC = () => {
    const {user, loading, error} = useCurrentUser();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        api.createArticle({title, content})
            .then((res) => {
                if (res.article) {
                    navigate(`/articles/${res.article.id}`)
                    return;
                }

                navigate("/articles")
            })
    }

    const ok = !loading && !error;

    return (
        <>
            <Screen>
                <MainMenu user={user}/>
                <SmColumn>

                <h1>New article</h1>
                <Plate>

                {loading && (<div>Loading...</div>)}
                {error && (<div>Error...</div>)}

                {ok && (
                    <>
                        <p>Current user: {user.displayName} ({user.email})</p>

                        <form onSubmit={handleSubmit}>
                        <InputGroup>
                            <p>Title:</p>
                                <Input type="text"
                                 value={title}
                                 onChange={e => setTitle(e.target.value)} 
                                 name="title"
                                 />
                            <p>Content:</p>
                                <textarea name="content"
                                 value={content}
                                 onChange={e => setContent(e.target.value)}/>
                            
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
