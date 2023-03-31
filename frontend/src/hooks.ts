import {useEffect, useState} from "react";
import {Article, User} from "./enitites";
import {useNavigate} from "react-router-dom";
import * as api from "./api";


export function useCurrentUser(required?: boolean) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [user, setUser] = useState<User>();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setError(false);

        api.getMe()
            .then(r => {
                if (r.notAuthenticated) {
                    if (required) {
                        navigate("/login");
                        return;
                    }

                    setUser(undefined);
                    return;
                }

                if (!r.ok) {
                    setError(true);
                    return;
                }

                setUser(r.user);
            })
            .finally(() => setLoading(false))
    }, [])

    return {
        loading,
        error,
        user,
    }
}

export function useMyArticles() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [articles, setArticles] = useState<Article[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setError(false);

        api.getMyArticles()
            .then(r => {
                if (r.notAuthenticated) {
                    navigate("/login");
                    return;
                }

                setLoading(false);

                if (!r.ok) {
                    setError(true);
                    return;
                }

                setArticles(r.articles || []);
            })
    }, [])

    return {
        loading,
        error,
        articles,
    }
}

export function useArticle(articleId: string) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [notFound, setNotfound] = useState(false);
    const [article, setArticle] = useState<Article>({} as any);

    useEffect(() => {
        setLoading(true);
        setError(false);

        api.getArticle(articleId)
            .then(r => {
                setLoading(false);

                if (r.notFound) {
                    setNotfound(true);
                    return;
                }

                if (!r.ok) {
                    setError(true);
                    return;
                }

                setArticle(r.article!);
            })
    }, [])

    return {
        loading,
        error,
        notFound,
        article,
    }
}